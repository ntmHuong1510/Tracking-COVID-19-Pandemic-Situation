import React, { memo, useEffect, useState } from "react";
import * as d3 from "d3";
import { getCountryData } from "../../reduxState/lineChartSlice";
import { useAppDispatch, useAppSelector } from "../../ultils/store";
import "./LineChart.scss";
import { formatDate } from "../../ultils/convertTimeFormat";
import compareObjects from "../../ultils/compareObjects";
type Props = {
  width: number;
  height: number;
};

const marginText = 0;
const LineChartCountries: React.FC<Props> = ({ width, height }) => {
  const { selectedCountry, isLoading } = useAppSelector(
    (state: any) => state.lineChartState
  );
  const [data, setData] = useState([]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (selectedCountry) {
      getURLData(selectedCountry).then((data: any) => {
        d3.select("#time_series").select("svg").remove();
        drawChart(data);
      });
    }
  }, [selectedCountry]);

  const getURLData = async (countryCode: string) => {
    let tempData: any[] = [];
    //@ts-ignore
    await dispatch(getCountryData({ countryCode }))
      .unwrap()
      .then((response: any) => {
        Object.keys(response.cases).forEach((key) => {
          const formattedDate = formatDate(key);
          tempData.push({
            date: d3.timeParse("%Y-%m-%d")(formattedDate),
            cases: response.cases[key],
            deaths: response.deaths[key],
          });
        });
      });
    // @ts-ignore
    setData(tempData);
    return tempData;
  };

  const drawChart = (data: any) => {
    // establish margins
    const margin = { top: 20, right: 120, bottom: 50, left: 50 };

    // create the chart area
    d3.select("#time_series").style("position", "relative");
    const svg = d3
      .select("#time_series")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    svg.exit();

    // Add X axis --> it is a date format
    var x = d3
      .scaleTime()
      // @ts-ignore
      .domain(d3.extent(data, (d: any) => d.date))
      .range([0, width]);

    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%b %Y")));

    // Add Y axis
    var y = d3
      .scaleLinear()
      //@ts-ignore
      .domain([
        0,
        d3.max(data, function (d: any): any {
          return d.cases;
        }),
      ])
      .range([height, 0]);
    svg.append("g").call(d3.axisLeft(y).tickFormat(d3.format(".2s")));

    // set line coordinates
    const lineCase = d3
      .line()
      .x(function (d: any) {
        return x(d.date);
      })
      .y(function (d: any) {
        return y(d.cases);
      });

    const lineDeath = d3
      .line()
      .x(function (d: any) {
        return x(d.date);
      })
      .y(function (d: any) {
        return y(d.deaths);
      });

    svg
      .append("g")
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("x", function (d: any) {
        return x(d.date);
      })
      .attr("y", function (d: any) {
        return y(d.cases);
      })
      .attr("fill", "steelblue")
      .text(function (d: any) {
        if (compareObjects(data[data.length - 1], d)) {
          return "Confirmed Cases";
        }
        return "";
      });

    svg
      .append("g")
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("x", function (d: any) {
        return x(d.date) + marginText;
      })
      .attr("y", function (d: any) {
        return y(d.deaths);
      })
      .attr("fill", "red")
      .text(function (d: any) {
        if (compareObjects(data[data.length - 1], d)) {
          return "Deaths";
        }
        return "";
      });

    // Add the line
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", lineCase);

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 1.5)
      .attr("d", lineDeath);

    const tooltip = d3.select("#tooltip").attr("class", "tooltip");

    svg
      .selectAll(".dot1")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d: any) => x(d.date))
      .attr("cy", (d: any) => y(d.deaths))
      .attr("r", 1.5)
      .attr("fill", "red")
      .on("mouseover", (event, d: any) => {
        tooltip.html(`<p>${d.date}: ${d.deaths} deaths </p>`);
        tooltip.style("visibility", "visible");
      })
      .on("mousemove", (event) => {
        tooltip
          .style("top", event.pageY - 10 + "px")
          .style("left", event.pageX + 10 + "px");
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      });

    svg
      .selectAll(".dot2")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d: any) => x(d.date))
      .attr("cy", (d: any) => y(d.cases))
      .attr("r", 2)
      .attr("fill", "steelblue")
      .on("mouseover", (event, d: any) => {
        tooltip.html(`<p>${d.date}: ${d.cases} cases</p>`);
        tooltip.style("visibility", "visible");
      })
      .on("mousemove", (event) => {
        tooltip
          .style("top", event.pageY - 10 + "px")
          .style("left", event.pageX + 10 + "px");
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      });
  };

  return (
    <>
      <div>
        {/* <h4> Total cases and deaths in each country</h4> */}
        {!isLoading && (
          <div id="time_series">
            <div id="tooltip">
              <p></p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LineChartCountries;
