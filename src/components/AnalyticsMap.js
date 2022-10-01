/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
// Required Core Stylesheet
import "@glidejs/glide/dist/css/glide.core.css";
// Optional Theme Stylesheet
// import "@glidejs/glide/src/assets/sass/glide.theme";
import Glide from "@glidejs/glide";
import fetchUtility from "../includes/fetchUtility";
import { objectToArray } from "../includes/article.helper";
import { party_color_code } from "../includes/party_color_code";
import jsonp from "fetch-jsonp";

function AnalyticsMap() {
  const [mapData, setMapData] = useState([]);
  const [states, setStates] = useState([]);
  const [activeStateCode, setActiveStateCode] = useState("UP");
  const [svgMapDataUrl, setSvgMapDataUrl] = useState(
    "https://election.nw18.com/electiondata/electionjson/assembly_election_2022/:state:/svg_map.json"
  );
  const [years, setYears] = useState([]);
  const [winnerMapData, setWinnerMapData] = useState([]);
  const [tableData, setTableData] = useState([]);

  //   seat party summary for table
  async function getSeatParty(
    currentState = {
      slug: "uttar-pradesh",
      code: "UP",
    }
  ) {
    let url =
      "https://election.nw18.com/electiondata/electionjson/assembly_election_2022_optimization/live/etv/dynamic/seat_party_summary.json";
    let getData = await fetchUtility(url, []);
    setTableData(Object.values(getData[currentState.slug].alliance));
  }

  //   get winner map data for color filling
  async function getWinnerMapData(
    currentState = {
      slug: "uttar-pradesh",
      code: "UP",
    }
  ) {
    let url = `https://election.nw18.com/electiondata/electionjson/assembly_election_2022/live/etv/${currentState.slug}/cons_list_with_status.json`;
    jsonp(url, {
      jsonpCallbackFunction: `election_const_rhs_${currentState.slug.replace(
        "-",
        "_"
      )}`,
    })
      .then((res) => res.json())
      .then((resp) => {
        setWinnerMapData(Object.values(resp));
      })
      .catch((err) => console.log(err));
  }

  //   default api call
  async function apiCall() {
    let url =
      "https://election.nw18.com/electiondata/electionjson/framework/assembly-elections-2022/site_switcher/election_home_live_eng.json";
    let getDate = await fetchUtility(url, []);
    let yearsData = [getDate.data.year.live];
    getDate.data.year.past.map((data) => {
      yearsData = [...yearsData, data];
    });
    setYears(yearsData);
    setStates(getDate.data.state);
    setSvgMapDataUrl(getDate.data.svg_map);
    getMapData(getDate.data.state[0], getDate.data.svg_map);
    // console.log(yearsData);
  }

  //   to change svg according map
  async function getMapData(
    currentState = {
      slug: "uttar-pradesh",
      code: "UP",
    },
    svgMapUrl = "https://election.nw18.com/electiondata/electionjson/assembly_election_2022/:state:/svg_map.json"
  ) {
    let result = svgMapUrl.replace(":state:", currentState.slug);
    setActiveStateCode(currentState.code);
    let getMap = await fetchUtility(result, []);
    setMapData(Object.values(getMap));
    getWinnerMapData(currentState);
    getSeatParty(currentState);
  }
  useEffect(() => {
    apiCall();
  }, []);
  let switch_key = "";
  let publicRuntimeConfig = {
    mainUrlParam: "",
  };
  return (
    <div className="RHS-Widgets homeWidgetMap as2021-map">
      <div className="elec-glblhd-highlight mb10">
        <i className="dots-div blink "></i>
        Analytics Center
      </div>
      <div className="assembly_election_rhs" id="LhsMapResult">
        <div className="assembly_election_rhs_top">
          <div className="map_select">
            <select id="yearChange" onChange={(e) => showSelectYearMap(e)}>
              {years && years !== undefined && years.length > 0
                ? years.map((data, index) => (
                    <option key={index} defaultValue>
                      {data}
                    </option>
                  ))
                : null}
            </select>
          </div>
          <ul className="rhs_rabing" id="map_ul_list">
            {states && states !== undefined && states.length > 0
              ? states.map((data, index) => (
                  <li
                    key={index}
                    className={`tab-links ${
                      activeStateCode === data.code ? "active" : ""
                    }`}
                    onClick={(event) => getMapData(data, svgMapDataUrl)}
                    data-rel={
                      data && data.code !== undefined ? data.code : "Behat"
                    }
                  >
                    <a>
                      {data && data.code !== undefined ? data.code : "Behat"}
                    </a>
                  </li>
                ))
              : null}
          </ul>
        </div>

        {states && states !== undefined && states.length > 0
          ? states.map((stateName, index) => (
              <div
                key={index}
                className={`${
                  stateName && stateName.code ? stateName.code : "UP"
                }-MAP tab-content ${
                  activeStateCode === stateName.code ? "" : "hide"
                }`}
              >
                <div
                  className="assembly_rhs_map"
                  data-map-id={`${
                    stateName && stateName.code ? stateName.code : "UP"
                  }_2022`}
                >
                  <a
                    href={`/${switch_key}/uttar-pradesh/election-result-analytics-centre/${publicRuntimeConfig.mainUrlParam}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.2"
                      baseProfile="tiny"
                      width="100%"
                      height="280px"
                      viewBox={
                        stateName && stateName.desktop_viewport
                          ? stateName.desktop_viewport
                          : "0 0 800 720"
                      }
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="white"
                      strokeWidth="1"
                      fill="#5b5b5b"
                    >
                      <g>
                        {mapData && mapData !== undefined && mapData.length > 0
                          ? mapData.map((data, index) => (
                              <path
                                key={index}
                                d={data && data.d ? data.d : ""}
                                id={`my_${
                                  data && data.cons_id
                                    ? data.cons_id.toUpperCase()
                                    : ""
                                }`}
                                title={
                                  data && data.cons_name ? data.cons_name : ""
                                }
                                style={{
                                  fill:
                                    winnerMapData &&
                                    winnerMapData.length > 0 &&
                                    winnerMapData[index] !== undefined &&
                                    winnerMapData[index].ABBR
                                      ? party_color_code[
                                          winnerMapData[index].ABBR
                                        ]
                                      : "",
                                }}
                              >
                                <title>
                                  {data && data.cons_name ? data.cons_name : ""}
                                </title>
                              </path>
                            ))
                          : null}
                      </g>
                    </svg>
                    <table
                      className={`mapTable svgtable-${
                        stateName && stateName.slug
                          ? stateName.slug
                          : "uttar-pradesh"
                      }`}
                    >
                      <tbody>
                        <tr>
                          {tableData &&
                          tableData !== undefined &&
                          tableData.length > 0
                            ? tableData.map((data, index) => (
                                <td
                                  style={{
                                    backgroundColor:
                                      data && data.display_name
                                        ? party_color_code[
                                            data && data.display_name
                                          ]
                                        : "",
                                  }}
                                  key={index}
                                >
                                  {data && data.display_name
                                    ? data.display_name
                                    : ""}
                                </td>
                              ))
                            : null}
                        </tr>
                        <tr>
                          {tableData &&
                          tableData !== undefined &&
                          tableData.length > 0
                            ? tableData.map((data, index) => (
                                <td
                                  style={{
                                    backgroundColor:
                                      data && data.display_name
                                        ? party_color_code[
                                            data && data.display_name
                                          ]
                                        : "",
                                  }}
                                  key={index}
                                >
                                  {data && data.wonlead ? data.wonlead : ""}
                                </td>
                              ))
                            : null}
                        </tr>
                      </tbody>
                    </table>
                  </a>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default AnalyticsMap;
