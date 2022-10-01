/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.css";
// import GlobalContext from "context";
// import SiteAd from "widgets/Common/Responsive/SiteAd";
import fetchUtility from "../includes/fetchUtility";
// import ReactHtmlParser from "react-html-parser";
// import getConfig from "next/config";
import { objectToArray } from "../includes/article.helper";
import { party_color_code } from "../includes/party_color_code";
import Slider from "./Slider";
import CandDetailSlider from "./CandDetailSlider";
import AnalyticsMap from "./AnalyticsMap";

const ElectionHomeWidget = (props) => {
  //   const { publicRuntimeConfig } = getConfig();
  let publicRuntimeConfig = {
    siteEnv: "beta",
    mainUrlParam: "?new_framework=publickeytrue",
  };
  const [allianceData, setAllianceData] = useState();
  const [stateNames, setStateNames] = useState();
  const [tallyType, setTallyType] = useState("alliance");
  const [displayName, setDisplayName] = useState("display_name");
  const [candDetail, setCandDetail] = useState([]);
  // console.log("publicRuntimeConfig", publicRuntimeConfig.siteEnv);
  //   let { switch_key, news_type, pageCommonProps, bigStoryData } =
  //     useContext(GlobalContext);

  // declaring static news type
  let news_type = "en";
  let { counting_day_widgets_data = {} } = props;
  //   let {
  //     countingDaySwitcherData: {
  //       site_switcher_widget_assembly_election: { counting_poll },
  //     },
  //     sponsorDataForWidgets,
  //   } = pageCommonProps;

  let sponsorDataForWidgetsAnalytic = "";
  //   if (
  //     sponsorDataForWidgets != undefined &&
  //     Object.keys(sponsorDataForWidgets).length !== 0
  //   ) {
  //     sponsorDataForWidgetsAnalytic = Object.values(
  //       sponsorDataForWidgets["analytics-center"]
  //     );
  //   }

  //   let widgetStatus = counting_poll?.status?.counting_live_flag;

  // declaring static status for testing
  let widgetStatus = "1";

  //   if (publicRuntimeConfig.siteEnv == "stg") {
  //     widgetStatus = counting_poll?.status?.counting_stg_flag;
  //   } else if (publicRuntimeConfig.siteEnv == "beta") {
  //     widgetStatus = counting_poll?.status?.counting_beta_flag;
  //   }

  //   let countingDayAdFlag = counting_poll.maintally_home_page_sponsor_switcher;
  //   let countingDayMicrositeFlag = counting_poll.counting_tally_microsite_flag;

  // declaring static status for testing
  let countingDayMicrositeFlag = "1";

  //   let bigStoryUrl = bigStoryData[0]?.custom_url;
  //   let bigStoryTitle = bigStoryData[0]?.article_headline_ranking;
  //   let bigStoryTxt = bigStoryData[0]?.custom_field || "Live Blog";
  let sponserAd =
      "NW18_MAR_Desktop/NW18_MAR_ELECTION/NW18_MAR_ELECTION_AL/NW18_MAR_ELECT_AL_ROS_ATF_LOGO",
    partyTallyLang = "ਪਾਰਟੀ ਟੈਲੀ",
    allianceTallyLang = "ਗੱਠਜੋੜ ਦੀ ਟੈਲੀ";
  if (news_type == "hi") {
    sponserAd =
      "NW18_HIND_Desktop/NW18_HIND_Election/NW18_HIND_Election_HOME/NW18_HIND_ELECT_HOM_ATF_LOGO";
    partyTallyLang = "पार्टी टैली";
    allianceTallyLang = "गठबंधन टैली";
  } else if (news_type == "en") {
    sponserAd =
      "NW18_ENG_Desktop/NW18_ENG_Election/NW18_ENG_Election_HOME/NW18_ENG_ELECT_HOM_ATF_LOGO";
    partyTallyLang = "Party Tally";
    allianceTallyLang = "Alliance Tally";
  }

  async function apiCall() {
    let url =
      "https://election.nw18.com/electiondata/electionjson/assembly_election_2022_optimization/live/etv/dynamic/seat_party_summary.json";

    let data = await fetchUtility(url, []);
    setTallyType("alliance");
    setDisplayName("display_name");
    setAllianceData(objectToArray(data));
    setStateNames(Object.keys(data));
    let candUrl =
      "https://election.nw18.com/electiondata/electionjson/assembly_election_2022/live/etv/cons_list_with_status.json";
    let candData = await fetchUtility(candUrl, []);
    setCandDetail(Object.values(candData));
    // console.log("data....... ", Object.values(candData));
  }

  let sliderConfiguration = {
    type: "slider",
    autoplay: 2000,
    perView: 8,
    rewind: false,
    slidesToScroll: 1,
    breakpoints: {
      600: {
        perView: 1.5,
      },
    },
  };

  // const slider = new Glide('.brcountday-contslider', sliderConfiguration);

  useEffect(() => {
    console.log("render is running inside useEffect");
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://images.news18.com/static_news18/js/revamp/glide.min.js";
    document.head.appendChild(script)
    apiCall();
    //
    // var acrossScript = document.createElement('script');
    // acrossScript.src = "https://images.news18.com/ibnkhabar/uploads/assets/event/common/js/assembly-election-2022-main-desktop.js";
    // acrossScript.defer =  true;
    // document.body.appendChild(acrossScript);
    // setInterval(() => {
    //   //   loadTvfn(news_type);
    //   apiCall();
    // }, 5000);
  }, []);

  return (
    <>
      {console.log("render is running")}
      <link
        rel="stylesheet"
        type="text/css"
        href="https://images.news18.com/static_news18/pix/ibnhome/news18/election-2022/electionshome-2022.css"
      />
      {widgetStatus == "1" && countingDayMicrositeFlag == "1" && (
        <>
          <div className="brcountdaywrap">
            <div className="brcountday-container">
              {/* sponser ads */}
              {/* {countingDayAdFlag == "1" ? (
                <SiteAd
                  width={1244}
                  height={60}
                  removeAdSpan={true}
                  slotId={"desktop_election_sponser_ads"}
                  adUnit={sponserAd}
                  sizes={[[1244, 60]]}
                />
              ) : null} */}
              <Slider />
              {/* <div class="name">
                <div class="glide__arrows" data-glide-el="controls">
                  <button
                    class="glide__arrow glide__arrow--left"
                    data-glide-dir="<"
                  >
                    Prev
                  </button>
                </div>
                <div class="glide__track" data-glide-el="track">
                  <ul class="glide__slides">
                    {candDetail &&
                    candDetail !== undefined &&
                    candDetail.length > 0
                      ? candDetail.map((data, index) => (
                          <li
                            key={index}
                            className="glide__slide--clone"
                            // className="glide__slide"
                            style={{
                              width: "130px",
                              background: "#f97d09",
                              height: "83px",
                              borderRadius: "6px",
                            }}
                            // className="skelAnimation"
                          >
                            <a>
                              <span className="const-cname">
                                {data && data !== undefined ? data.cname : ""}
                                <p className="state_abbr">UP</p>
                              </span>
                              <span
                                className="party_status"
                                style={{
                                  backgroundColor: party_color_code[data.ABBR],
                                }}
                              >
                                <b>
                                  {data && data !== undefined ? data.ABBR : ""}
                                </b>
                                <em>WINS</em>
                              </span>
                              <span className="last-winner-party">
                                2017 :{" "}
                                {data && data !== undefined
                                  ? data.WINNER_2017
                                  : ""}
                              </span>
                            </a>
                          </li>
                        ))
                      : null}
                  </ul>
                </div>
                <div class="glide__arrows" data-glide-el="controls">
                  <button
                    class="glide__arrow glide__arrow--right"
                    data-glide-dir=">"
                  >
                    Next
                  </button>
                </div>
              </div> */}
              {/* <!---Result tally component start--> */}
              <div className="widgetTallywrapper">
                <div className="panelLeft">
                  {/* <!-- livetv widget start --> */}
                  <div className="cd-watchlive">
                    <div className="cd-watchlive-hd">
                      <i className="dots-div blink nw-dots blink2"></i>
                      <a
                        href={counting_day_widgets_data?.live_tv?.url || ""}
                        className="liveTvTxtWrap"
                        target="_blank"
                        title="live tv"
                      >
                        Watch
                        <div className="boldTxt">
                          Live Now
                          <span>on</span>
                        </div>
                      </a>
                      <div className="nhlivetv">
                        <a
                          href="javascript:void(0);"
                          className="widget_livetv map_select"
                        >
                          {news_type == "hi"
                            ? "NEWS18 इंडिया"
                            : news_type == "pa"
                            ? "NEWS18 पंजाब"
                            : "CNN NEWS18"}
                        </a>
                        <div className="widget_livetv_inner">
                          {news_type == "hi" ? (
                            <>
                              <a
                                href="https://hindi.news18.com/livetv/news18-uttar-pradesh-uttarakhand/"
                                target="_blank"
                              >
                                NEWS18 उत्तर प्रदेश, उत्तराखंड
                              </a>
                              <a
                                href="https://punjab.news18.com/live-tv/"
                                target="_blank"
                              >
                                {"NEWS18 पंजाब, हरियाणा"}
                              </a>
                              <a
                                href="https://hindi.news18.com/livetv/news18-bihar-jharkhand/"
                                target="_blank"
                              >
                                NEWS18 बिहार, झारखंड
                              </a>
                              <a
                                href="https://hindi.news18.com/livetv/news18-madhya-pradesh-chhattisgarh/"
                                target="_blank"
                              >
                                NEWS18 मध्य प्रदेश, छत्तीसगढ़
                              </a>
                              <a
                                href="https://hindi.news18.com/livetv/news18-rajasthan/"
                                target="_blank"
                              >
                                NEWS18 राजस्थान
                              </a>
                              <a
                                href="https://www.news18.com/livetv/"
                                target="_blank"
                              >
                                {"CNN NEWS18"}
                              </a>
                            </>
                          ) : (
                            <>
                              {news_type == "pb" ? (
                                <>
                                  <a
                                    href="https://hindi.news18.com/livetv/"
                                    target="_blank"
                                  >
                                    NEWS18 INDIA
                                  </a>
                                  <a
                                    href="https://www.news18.com/livetv/"
                                    target="_blank"
                                  >
                                    CNN NEWS18
                                  </a>
                                </>
                              ) : (
                                <>
                                  <a
                                    href="https://hindi.news18.com/livetv/"
                                    target="_blank"
                                  >
                                    NEWS18 INDIA
                                  </a>
                                  <a
                                    href="https://punjab.news18.com/live-tv/"
                                    target="_blank"
                                  >
                                    NEWS18 PUNJAB, HARYANA, HIMACHAL
                                  </a>
                                </>
                              )}

                              <a
                                href="https://hindi.news18.com/livetv/news18-uttar-pradesh-uttarakhand/"
                                target="_blank"
                              >
                                NEWS18 UTTAR PRADESH, UTTARAKHAND
                              </a>
                              <a
                                href="https://hindi.news18.com/livetv/news18-bihar-jharkhand/"
                                target="_blank"
                              >
                                NEW18 BIHAR, JHARKHAND
                              </a>
                              <a
                                href="https://hindi.news18.com/livetv/news18-madhya-pradesh-chhattisgarh/"
                                target="_blank"
                              >
                                NEWS18 MADHYA PRADESH, CHHATTISGARH
                              </a>
                              <a
                                href="https://hindi.news18.com/livetv/news18-rajasthan/"
                                target="_blank"
                              >
                                News18 RAJASTHAN
                              </a>
                            </>
                          )}
                          <a
                            href="https://bengali.news18.com/live-tv/"
                            target="_blank"
                          >
                            NEWS18 BENGALI
                          </a>
                          <a
                            href="https://lokmat.news18.com/live-tv/"
                            target="_blank"
                          >
                            NEWS18 LOKMAT
                          </a>
                          <a
                            href="https://gujarati.news18.com/live-tv/"
                            target="_blank"
                          >
                            NEWS18 GUJARATI
                          </a>
                          <a
                            href="https://kannada.news18.com/live-tv/"
                            target="_blank"
                          >
                            NEWS18 KANNADA
                          </a>
                          <a
                            href="https://tamil.news18.com/live-tv/"
                            target="_blank"
                          >
                            NEWS18 TAMIL
                          </a>
                          <a
                            href="https://malayalam.news18.com/live-tv/"
                            target="_blank"
                          >
                            NEWS18 MALAYALAM
                          </a>
                          <a
                            href="https://urdu.news18.com/live-tv/"
                            target="_blank"
                          >
                            NEWS18 URDU
                          </a>
                          <a
                            href="https://assam.news18.com/live-tv/"
                            target="_blank"
                          >
                            NEWS18 ASSAM
                          </a>
                          <a
                            href="https://odia.news18.com/live-tv/"
                            target="_blank"
                          >
                            NEWS18 ODIA
                          </a>
                        </div>
                      </div>
                    </div>
                    <figure>
                      {news_type == "en" ? (
                        <div
                          id="playerContainer"
                          className="livetvelection"
                          style={{
                            background: "black",
                            height: "250px",
                            width: "100%",
                          }}
                        >
                          <img
                            src="https://images.news18.com/static_news18/pix/ibnhome/news18/election-2022/Live_TV_BG_English.jpg"
                            width="100%"
                          />
                        </div>
                      ) : (
                        <div
                          id="vidgyor_parent"
                          className="livetvelection"
                          style={{
                            background: "black",
                            height: "220px",
                            width: "100%",
                          }}
                        >
                          <img
                            id="tvposterhome"
                            src={
                              news_type == "hi"
                                ? "https://images.news18.com/static_news18/pix/ibnhome/news18/election-2022/Live_TV_BG_Hindi.jpg"
                                : "https://images.news18.com/static_news18/pix/ibnhome/news18/election-2022/Live_TV_BG_Punjabi.jpg"
                            }
                            alt="News18 India Livetv"
                            title="News18 India Livetv"
                            width="100%"
                          />
                          <div id="vidgyor_container">
                            <div id="closeButtonContainer"></div>
                          </div>
                        </div>
                      )}
                    </figure>
                  </div>
                  {/* <!-- amp widget start --> */}
                  <AnalyticsMap />
                  {/* <!-- amp widget end--> */}

                  <a
                    href={`${
                      counting_day_widgets_data?.analytic_center?.url || ""
                    }${publicRuntimeConfig.mainUrlParam}`}
                    className="analyticeBtn"
                  >
                    <div className="analytice_left">
                      <img
                        src="https://images.news18.com/static_news18/pix/ibnhome/news18/election-2022/stel_anlcnticon.svg"
                        alt={
                          counting_day_widgets_data?.analytic_center?.image
                            ?.alt || ""
                        }
                        title={
                          counting_day_widgets_data?.analytic_center?.image
                            ?.alt || ""
                        }
                      />
                      <div className="txt">
                        <div className="heading-1">
                          {/* {ReactHtmlParser(
                            counting_day_widgets_data?.analytic_center
                              ?.display_heading_1_label || ""
                          )} */}
                          Analytics Center
                        </div>
                        {/* {ReactHtmlParser(
                          counting_day_widgets_data?.analytic_center
                            ?.display_heading_2_label || ""
                        )} */}
                        Analytics Center
                      </div>
                    </div>
                    {news_type != "pa" &&
                      sponsorDataForWidgetsAnalytic != "" &&
                      sponsorDataForWidgetsAnalytic != undefined &&
                      sponsorDataForWidgetsAnalytic[0] != undefined &&
                      sponsorDataForWidgetsAnalytic[0][0].uploaded_img_on_off ==
                        "1" && (
                        <div className="add_rhs">
                          <span>
                            {sponsorDataForWidgetsAnalytic[0][0].sponser_name}
                          </span>
                          <div className="add_rhs_row">
                            <a
                              href={
                                sponsorDataForWidgetsAnalytic[0][0]
                                  .click_tracker_sponser
                              }
                            >
                              <img
                                src={
                                  sponsorDataForWidgetsAnalytic[0][0]
                                    .desktop_img
                                }
                                alt={
                                  sponsorDataForWidgetsAnalytic[0][0]
                                    .sponser_name
                                }
                                title={
                                  sponsorDataForWidgetsAnalytic[0][0]
                                    .sponser_name
                                }
                              />
                            </a>
                            {sponsorDataForWidgetsAnalytic[0][0]
                              .impression_tracker_sponser !== "" ? (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    sponsorDataForWidgetsAnalytic[0][0]
                                      .impression_tracker_sponser,
                                }}
                              ></div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      )}
                  </a>
                </div>
                <div className="panelRight">
                  <div className="ls_searchbox">
                    <form className="ls_searchform" id="autocomplete-container">
                      <div className="ls_searchinner">
                        <input
                          type="text"
                          placeholder={
                            counting_day_widgets_data?.search_constituency
                              ?.diplay_search_place_holder || ""
                          }
                          className="header-search-input assembly-search"
                        />
                        <img
                          src="https://images.news18.com/static_news18/pix/ibnhome/news18/state-2021-election/home-widget-search.png"
                          alt="Search Icon"
                        />
                      </div>
                      <ul id="ass-autocomplete-results"></ul>
                    </form>
                  </div>
                  <div
                    className="allianceTableouter"
                    id="ResultTallyWidget liveresult2021"
                  >
                    <ul className="homewidgetTab">
                      <li
                        className={`tab-links elemaintab ${
                          tallyType == "alliance" ? "active" : ""
                        }`}
                        data-rel="AllianceTally"
                        id="aalliance"
                      >
                        <a
                          onClick={() => {
                            setTallyType("alliance");
                            setDisplayName("display_name");
                          }}
                          href="javascript:void(0)"
                        >
                          {allianceTallyLang}
                        </a>
                      </li>
                      <li
                        className={`tab-links elemaintab ${
                          tallyType == "party" ? "active" : ""
                        }`}
                        data-rel="PartyTally"
                        id="pparty"
                      >
                        <a
                          onClick={() => {
                            setTallyType("party");
                            setDisplayName("name");
                          }}
                          href="javascript:void(0)"
                        >
                          {partyTallyLang}
                        </a>
                      </li>
                    </ul>
                    <div className="allianceTableinner alliace-tally-homepage">
                      <div className="AllianceTally tab-content tab-content-f">
                        <div className="allianceTableSec">
                          <div
                            style={{
                              border: "1px solid #d5d5d5",
                              boxShadow: "8px 8px 0px #e3e3e3",
                            }}
                          >
                            <div style={{ padding: "10px 15px" }}>
                              <div
                                className="skeletontableRow"
                                style={{ marginBottom: "6px" }}
                              >
                                {allianceData && allianceData !== undefined
                                  ? allianceData.map((d, ind) => {
                                      return (
                                        <>
                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "space-between",
                                              textTransform: "uppercase",
                                              alignItems: "center",
                                              lineHeight: "20px",
                                              marginBottom: "2px",
                                            }}
                                          >
                                            <h2
                                              style={{
                                                color: "red",
                                                fontSize: "15px",
                                                fontFamily:
                                                  "Fira Sans Condensed, sans-serif",
                                                fontWeight: "700",
                                              }}
                                            >
                                              {stateNames &&
                                              stateNames !== undefined
                                                ? stateNames[ind]
                                                : ""}
                                            </h2>
                                            <div className="skelAnimation">
                                              {d?.total_seats?.won}/
                                              {d?.total_seats?.seats} SEATS
                                            </div>
                                          </div>
                                          <div
                                            style={{
                                              position: "relative",
                                              paddingRight: "30px",
                                              marginBottom: "8px",
                                            }}
                                          >
                                            <table
                                              cellPadding="0"
                                              cellSpacing="0"
                                              style={{
                                                width: "100%",
                                                background: "#e7e7e7",
                                                borderCollapse: "collapse",
                                                borderSpacing: "0",
                                              }}
                                            >
                                              <tbody>
                                                <tr>
                                                  <th
                                                    style={{
                                                      fontFamily: "Fira sans",
                                                      height: "27px",
                                                      width: "100px",
                                                      padding: "5px",
                                                      border:
                                                        "1px solid #f6f6f6",
                                                      textAlign: "center",
                                                      textTransform:
                                                        "uppercase",
                                                      color: "#464646",
                                                      fontWeight: "bold",
                                                      fontSize: "12px",
                                                      background: "#e7e7e7",
                                                    }}
                                                  >
                                                    {news_type == "hi"
                                                      ? "गठबंधन"
                                                      : "Alliance"}
                                                  </th>
                                                  {d &&
                                                  d.alliance &&
                                                  d !== undefined
                                                    ? d[tallyType].map((ad) => (
                                                        <th
                                                          style={{
                                                            background:
                                                              party_color_code &&
                                                              ad[displayName]
                                                                ? party_color_code[
                                                                    ad[
                                                                      displayName
                                                                    ]
                                                                  ]
                                                                : "black",
                                                            position:
                                                              "relative",
                                                            border:
                                                              "1px solid #f6f6f6",
                                                            //   width: "22%",
                                                          }}
                                                        >
                                                          <div
                                                            style={{
                                                              color: "#fff",
                                                              fontWeight: "500",
                                                            }}
                                                          >
                                                            {ad &&
                                                            ad[displayName] !==
                                                              undefined
                                                              ? ad[displayName]
                                                              : ""}
                                                          </div>
                                                        </th>
                                                      ))
                                                    : ""}
                                                </tr>
                                                <tr>
                                                  <td
                                                    style={{
                                                      fontFamily: "Fira sans",
                                                      height: "50px",
                                                      width: "100px!important",
                                                      padding: "5px",
                                                      border:
                                                        "1px solid #f6f6f6",
                                                      textAlign: "center",
                                                      textTransform:
                                                        "uppercase",
                                                      color: "#464646",
                                                      fontWeight: "bold",
                                                      fontSize: "12px",
                                                      background: "#e7e7e7",
                                                      verticalAlign: "middle",
                                                    }}
                                                  >
                                                    {news_type == "hi"
                                                      ? "जीत + बढ़त"
                                                      : "Wins + Leads"}
                                                  </td>
                                                  {d &&
                                                  d.alliance &&
                                                  d !== undefined
                                                    ? d[tallyType].map((ad) => (
                                                        <td
                                                          style={{
                                                            // background:
                                                            //   "#348900",
                                                            background:
                                                              party_color_code &&
                                                              ad[displayName]
                                                                ? party_color_code[
                                                                    ad[
                                                                      displayName
                                                                    ]
                                                                  ]
                                                                : "black",
                                                            position:
                                                              "relative",
                                                            overflow: "hidden",
                                                            textAlign: "center",
                                                            fontSize: 28,
                                                            color: "#fff",
                                                            fontWeight: "300",
                                                            verticalAlign:
                                                              "middle",
                                                            border:
                                                              "1px solid #fff",
                                                          }}
                                                        >
                                                          {ad && ad.won
                                                            ? ad.won
                                                            : ""}
                                                        </td>
                                                      ))
                                                    : ""}
                                                </tr>
                                                <tr>
                                                  <td
                                                    style={{
                                                      fontFamily: "Fira sans",
                                                      height: "21px",
                                                      padding: "5px",
                                                      border:
                                                        "1px solid #f6f6f6",
                                                      textAlign: "center",
                                                      textTransform:
                                                        "uppercase",
                                                      color: "#464646",
                                                      fontWeight: "bold",
                                                      fontSize: "12px",
                                                      background: "#e7e7e7",
                                                      verticalAlign: "middle",
                                                    }}
                                                  >
                                                    +/- 2017
                                                  </td>
                                                  {d &&
                                                  d.alliance &&
                                                  d !== undefined
                                                    ? d[tallyType].map((ad) => (
                                                        <td
                                                          className="skelAnimation"
                                                          style={{
                                                            border:
                                                              "1px solid #f6f6f6",
                                                            color: "black",
                                                            textAlign: "center",
                                                            verticalAlign:
                                                              "middle",
                                                          }}
                                                        >
                                                          {ad && ad.changes
                                                            ? ad.changes
                                                            : ""}
                                                        </td>
                                                      ))
                                                    : ""}
                                                </tr>
                                                <tr
                                                  style={{
                                                    borderBottom:
                                                      "2px solid #d0d0d0",
                                                  }}
                                                ></tr>
                                              </tbody>
                                            </table>
                                            <div
                                              className="tablePlus"
                                              style={{
                                                background: "#e7e7e7",
                                                width: "30px",
                                                position: "absolute",
                                                right: "0",
                                                top: "0",
                                                borderBottom:
                                                  "3px solid #d0d0d0",
                                                bottom: "0px",
                                              }}
                                            ></div>
                                          </div>
                                        </>
                                      );
                                    })
                                  : ""}
                              </div>

                              <p
                                style={{
                                  color: "#929292",
                                  fontSize: "12px",
                                  fontStyle: "italic",
                                  marginTop: "5px",
                                }}
                              ></p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="PartyTally tab-content tab-content-f hide">
                        {news_type == "hi" ? "पार्टी टैली" : "Party Tally"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!---Result tally end--> */}
              {/* <!-- candidates component starts--> */}
              <CandDetailSlider />
              {/* <!-- candidates slider component end --> */}
            </div>
          </div>
          <style jsx>{`
            .widget_livetv {
              width: 150px;
              height: 28px;
              background: #e1261c 0% 0% no-repeat padding-box;
              border-radius: 4px;
              display: flex;
              align-items: center;
              padding: 0 10px;
              letter-spacing: -0.28px;
              color: #ffffff;
              font-size: 14px;
              font-weight: bold;
            }

            .cd-watchlive .cd-watchlive-hd {
              justify-content: space-between;
            }

            .nhlivetv > div {
              position: absolute;
              background: #e1261c 0% 0% no-repeat padding-box;
              width: 150px;
              left: 0;
              top: 24px;
              display: none;
            }

            .nhlivetv > div a {
              display: block;
            }

            .nhlivetv > div a {
              color: #fff;
              font-size: 13px;
              margin: 8px 7px;
              display: block;
              border-radius: 10px;
            }

            .nhlivetv {
              position: relative;
            }
          `}</style>
        </>
      )}
    </>
  );
};
export default ElectionHomeWidget;
