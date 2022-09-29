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
import jsonp from "fetch-jsonp";

function CandDetailSlider() {
  const [candidates, setCandidates] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 0, 0, 0,
  ]);
  async function apiCall() {
    jsonp(
      "https://election.nw18.com/electiondata/electionjson/assembly_election_2022/live/etv/key_candidates_cross.json",
      {
        jsonpCallbackFunction: "election_key_cand",
      }
    )
      .then((res) => res.json())
      .then(async (resp) => {
        let obj = [];
        Object.values(resp).map((data) => {
          obj = [...obj, ...Object.values(data)];
        });
        setCandidates(obj);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    apiCall();
    setTimeout(() => {
      new Glide(".brcountday-candidateslider", {
        autoplay: 2000,
        perView: 4,
        rewind: false,
        type: "carousel",
        slidesToScroll: 1,
        breakpoints: {
          650: {
            perView: 1.2,
          },
        },
      }).mount();
    }, 500);
  }, []);
  return (
    <div className="brcountday-candidateslider glide--ltr glide--carousel glide--swipeable">
      <div className="brcountday-candidateslider-in" data-glide-el="track">
        <ul
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "0 34px",
            marginTop: "18px",
            marginBottom: "10px",
          }}
        >
          {candidates && candidates !== undefined && candidates.length > 0
            ? candidates.map((data, index) => (
                <li key={index} className="glide__slide">
                  <a className="cndt-won">
                    <figure>
                      <img
                        src={
                          data && data.cand_image !== undefined
                            ? data.cand_image
                            : ""
                        }
                        alt="xyz"
                      />
                    </figure>
                    <div className="candidateslider-details">
                      <h3>
                        <b className="widgetcandi_name">
                          {data && data.cand_name !== undefined
                            ? data.cand_name
                            : ""}
                        </b>
                        <span>
                          {data && data.ABBR !== undefined ? data.ABBR : ""} |{" "}
                          {data && data.cons_name !== undefined
                            ? data.cons_name
                            : ""}
                          ,{" "}
                          {data && data.state_short_name !== undefined
                            ? data.state_short_name
                            : ""}
                        </span>
                      </h3>
                      <p>
                        <b>
                          {data && data.CANDI_STATUS !== undefined
                            ? data.CANDI_STATUS
                            : ""}
                        </b>
                      </p>
                    </div>
                  </a>
                </li>
              ))
            : null}
        </ul>
        <div className="brcountday-arrow" data-glide-el="controls">
          <button data-glide-dir="<"></button>
          <button data-glide-dir=">"></button>
        </div>
      </div>
    </div>
  );
}

export default CandDetailSlider;
