import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import "./BarChart.scss";
import { element } from "prop-types";
import { useAppSelector } from "../../ultils/store";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
type Props = {
  dataset: Array<Object>;
  country: any;
  onReset: any;
};

const BarChartTest: React.FC<Props> = ({ dataset, country, onReset }) => {
  const [data, setData] = useState([]);
  const margin = { top: 10, right: 150, bottom: 30, left: 100 };
  const width = 1200 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom + data.length + 10;
  const [isCase, setIsCase] = useState(true);
  const [isDeath, setIsDeath] = useState(false);
  const [isAlphabetical, setIsAlphabetical] = useState(false);
  const [isAscending, setIsAscending] = useState(false);
  const [isDescending, setIsDescending] = useState(false);
  const [content, setTooltipContent] = useState("");
  const { setSelectedCountry, isLoading } = useAppSelector(
    (state: any) => state.lineChartState
  );
  useEffect(() => {
    if (country) {
      updateData(country);
      onReset("");
    }
    console.log(country);
    d3.select("#bar_chart").select("svg").remove();
    drawBarChart();
  }, [data, isCase, isDeath, isAscending, isDescending, country]);

  const updateData = (value: any) => {
    const addedItem = dataset.find((element: any) => element.country === value);
    console.log(addedItem);
    //@ts-ignore
    setData((prevState) => [...prevState, addedItem]);
  };

  const handleRemoveCountry = (country: any) => {
    setData(data.filter((element: any) => element.country !== country));
  };
  const drawBarChart = () => {
    const svg = d3
      .select("#bar_chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    let x = d3
      .scaleLinear()
      //@ts-ignore
      .domain([
        0,
        d3.max(data, (d) => {
          //@ts-ignore
          return isCase ? +d.cases : d.deaths;
        }),
      ])
      .range([4, width]);

    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    let y = d3
      .scaleBand()
      .range([0, height])
      //@ts-ignore
      .domain(data.map((d) => d.country))
      .padding(0.1);

    svg.append("g").attr("class", "y-axis").call(d3.axisLeft(y));

    const bars = svg.selectAll("rect").data(data);

    bars
      .enter()
      .append("rect")
      .attr("x", x(0))
      //@ts-ignore
      .attr("y", (d) => y(d.country))
      .attr("width", 0)
      .attr("height", y.bandwidth())
      .attr("fill", isCase ? "steelblue" : "red")
      .attr("transform", "translate(0, 0)")
      .transition()
      .duration(500)
      //@ts-ignore
      .attr("width", (d) => x(isCase ? +d.cases : d.deaths));

    bars.exit().transition().duration(500).attr("width", 0).remove();
    //@ts-ignore
    bars
      .transition()
      .duration(500)
      .attr("x", x(0))
      //@ts-ignore
      .attr("y", (d) => y(d.country))
      //@ts-ignore
      .attr("width", (d) => x(isCase ? +d.cases : d.deaths))
      .attr("height", y.bandwidth());

    svg
      .selectAll(".bar-label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "bar-label")
      .attr("x", (d: any) => x(isCase ? +d.cases : d.deaths) + 15)
      //@ts-ignore
      .attr("y", (d: any) => y(d.country) + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .text((d: any) => (isCase ? d.cases + " cases" : d.deaths + " deaths"))
      .style("font-size", "16px")
      .style("fill", "black");
  };
  const handleChange = (e: any) => {
    if (e.target.value === "case") {
      setIsCase(true);
      setIsDeath(false);
    }
    if (e.target.value === "death") {
      setIsCase(false);
      setIsDeath(true);
    }
  };
  const handleSorting = (e: any) => {
    if (e.target.value === "ascending") {
      setData(
        data.sort((a: any, b: any) =>
          isCase ? a.cases - b.cases : a.deaths - b.deaths
        )
      );
      setIsAscending(true);
      setIsDescending(false);
      setIsAlphabetical(false);
    }
    if (e.target.value === "descending") {
      setData(
        data.sort((a: any, b: any) =>
          isCase ? b.cases - a.cases : b.deaths - a.deaths
        )
      );
      setIsAscending(false);
      setIsDescending(true);
      setIsAlphabetical(false);
    }

    if (e.target.value === "alphabetical ") {
      setIsAscending(false);
      setIsDescending(false);
      setIsAlphabetical(true);

      const sortedNames = data.sort((a: any, b: any) =>
        a.country.localeCompare(b.country)
      );

      setData(sortedNames);
    }
  };
  return (
    <div>
      <div>
        <FormControl
          sx={{
            marginLeft: "80px",
            height: "40px",
            marginTop: "80px",
            width: "200px",
            marginBot: "20px",
          }}
        >
          <InputLabel>Type Of Data</InputLabel>
          <Select
            id="data-type-select"
            label="Age"
            onChange={(e) => handleChange(e)}
          >
            <MenuItem value={"case"}>Cases</MenuItem>
            <MenuItem value={"death"}>Deaths</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          sx={{
            marginLeft: "40px",
            height: "40px",
            marginTop: "80px",
            width: "200px",
          }}
        >
          <InputLabel>Sorting</InputLabel>
          <Select
            id="sort-select"
            // value={age}
            label="Age"
            onChange={(e) => handleSorting(e)}
          >
            <MenuItem value={"ascending"}>Ascending</MenuItem>
            <MenuItem value={"descending"}>Descending</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          sx={{
            marginLeft: "40px",
            height: "40px",
            marginTop: "80px",
            width: "200px",
          }}
        >
          <InputLabel>Select Country</InputLabel>
          <Select
            id="select-country"
            // value={age}
            label="Age"
            onChange={(e) => updateData(e.target.value)}
          >
            {dataset.map((element: any) => (
              <MenuItem value={element.country}>{element.country}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          sx={{
            marginLeft: "40px",
            height: "56px",
            marginTop: "80px",
            width: "200px",
          }}
          onClick={() => setData([])}
        >
          Delete All
        </Button>
        <div className="country-tags-container">
          {data.map((element: any) => (
            <span className="country-tag">
              <p>{element.country}</p>
              <button onClick={() => handleRemoveCountry(element.country)}>
                X
              </button>
            </span>
          ))}
        </div>
      </div>
      <div id="bar_chart"></div>
    </div>
  );
};

export default BarChartTest;
