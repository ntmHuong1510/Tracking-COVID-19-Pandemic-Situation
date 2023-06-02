import React from "react";
import "./HeatMapLabel.scss";
const HeatMapLabel = () => {
  return (
    <section className="heat-level-container">
      <p>COVID Cases Per Million People</p>
      <ul>
        <li>
          {" "}
          <div
            className="color-level-box"
            style={{ backgroundColor: "#ff0000" }}
          />
          <span>{">"} 300000</span>
        </li>
        <li>
          <div
            className="color-level-box"
            style={{ backgroundColor: "#710909" }}
          />
          <span>200000 - 300000</span>
        </li>
        <li>
          <div
            className="color-level-box"
            style={{ backgroundColor: "#a14107" }}
          />
          <span>150000 - 200000</span>
        </li>
        <li>
          <div
            className="color-level-box"
            style={{ backgroundColor: "#ff6e12" }}
          />
          <span>100000 - 150000</span>
        </li>
        <li>
          <div
            className="color-level-box"
            style={{ backgroundColor: "#fef769" }}
          />
          <span>50000 - 100000</span>
        </li>
        <li>
          <div
            className="color-level-box"
            style={{ backgroundColor: "#f7e9b5" }}
          />
          <span> 50000 {"<"}</span>
        </li>
        <li>
          <div
            className="color-level-box"
            style={{ backgroundColor: "#AAAAAA" }}
          />
          <span> No Data</span>
        </li>
      </ul>
    </section>
  );
};

export default HeatMapLabel;
