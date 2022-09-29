/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
// Required Core Stylesheet
import "@glidejs/glide/dist/css/glide.core.css";
// Optional Theme Stylesheet
// import "@glidejs/glide/src/assets/sass/glide.theme";
import Glide from "@glidejs/glide";
import fetchUtility from "../includes/fetchUtility";
import { objectToArray } from "../includes/article.helper";
import { party_color_code } from "../includes/party_color_code";

function Slider() {
  const [candDetail, setCandDetail] = useState([]);

  async function apiCall() {
    let candUrl =
      "https://election.nw18.com/electiondata/electionjson/assembly_election_2022/live/etv/cons_list_with_status.json";
    let candData = await fetchUtility(candUrl, []);
    setCandDetail(Object.values(candData));
    // console.log("data....... ", Object.values(candData));
  }

  useEffect(() => {
    apiCall();
    setTimeout(() => {
      new Glide(".brcountday-contslider", {
        type: "carousel",
        autoplay: 2000,
        perView: 8,
        rewind: false,
        slidesToScroll: 1,
        breakpoints: {
          600: {
            perView: 1.5,
          },
        },
      }).mount();
    }, 500);
  }, []);
  return (
    <>
      {candDetail && candDetail !== undefined && candDetail.length > 0 ? (
        <div
          className="brcountday-contslider glide--ltr glide--carousel glide--swipeable"
          style={{ height: "140px", overflow: "hidden" }}
        >
          <div className="brcountday-contslider-in" data-glide-el="track">
            <ul>
              {candDetail && candDetail !== undefined && candDetail.length > 0
                ? candDetail.map((data, index) => (
                    <li key={index} className="glide__slide">
                      <a>
                        <span className="const-cname">
                          {data && data !== undefined ? data.cname : ""}
                          <p className="state_abbr">UP</p>
                        </span>
                        <span
                          className="party-status"
                          style={{
                            backgroundColor: party_color_code[data.ABBR],
                          }}
                        >
                          <b>{data && data !== undefined ? data.ABBR : ""}</b>
                          <em>WINS</em>
                        </span>
                        <span className="last-winner-party">
                          2017 :{" "}
                          {data && data !== undefined ? data.WINNER_2017 : ""}
                        </span>
                      </a>
                    </li>
                  ))
                : null}
            </ul>
          </div>
          <div className="brcountday-arrow" data-glide-el="controls">
            <button
              // className="glide__arrow glide__arrow--left"
              data-glide-dir="<"
            ></button>
            <button
              // className="glide__arrow glide__arrow--right"
              data-glide-dir=">"
            ></button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Slider;
