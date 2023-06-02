import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import { memo, useState } from "react";
import "./WorldMap.scss";
import ToolTipContainer from "../ToolTipContainer/ToolTipContainer";
import HeatMapLabel from "../HeatMapLabel/HeatMapLabel";
import BarChart from "../Graph/BarChart";
import Common from "../common/common";

type Props = {
  data: Array<Object>;
};
const WorldMap: React.FC<Props> = ({ data }) => {
  const [country, setCountry] = useState("");
  const onCountry = (name: string) => {
    return setCountry(name);
  };
  const [content, setTooltipContent] = useState("");
  const fillColor = (covidCasePerMillion: number): string => {
    if (covidCasePerMillion && covidCasePerMillion > 300000) return "#710909";
    if (300000 >= covidCasePerMillion && covidCasePerMillion > 200000)
      return "#a14107";
    if (200000 >= covidCasePerMillion && covidCasePerMillion > 150000)
      return "#ff0000";
    if (150000 >= covidCasePerMillion && covidCasePerMillion > 100000)
      return "#ff6e12";
    if (100000 >= covidCasePerMillion && covidCasePerMillion > 50000)
      return "#fef769";
    if (50000 >= covidCasePerMillion) return "#f7e9b5";

    return "#AAAAAA";
  };
  return (
    <>
      <Tooltip float anchorId="world-map" content={content} />

      <div className="map-container" id="world-map">
        <HeatMapLabel />
        <ComposableMap>
          <ZoomableGroup>
            {/* <Geographies geography="/data/world-110m.json"> */}
            <Geographies geography="/data/world-110m.json">
              {({ geographies }) =>
                geographies.map((geo) => {
                  const covidCase = data.find(
                    (element: any) => element.countryInfo.iso3 === geo.id
                  );
                  console.log(covidCase);
                  // @ts-ignore
                  return (
                    <>
                      <Geography
                        fill="#2a354d"
                        key={geo.rsmKey}
                        geography={geo}
                        onMouseEnter={() =>
                          // @ts-ignore
                          // prettier-ignore
                          {setTooltipContent(<ToolTipContainer cases={covidCase.cases} country={covidCase.country} todayCases={covidCase.todayCases} deaths={covidCase.deaths} flag={covidCase.countryInfo.flag} casesPerOneMillion={covidCase.casesPerOneMillion} deathsPerOneMillion={covidCase.deathsPerOneMillion} oneCasePerPeople={covidCase.oneCasePerPeople} oneDeathPerPeople={covidCase.oneDeathPerPeople} oneTestPerPeople={covidCase.oneTestPerPeople} population={covidCase.population} recovered={covidCase.recovered} recoveredPerOneMillion={covidCase.recoveredPerOneMillion}/>);
                        }
                        }
                        // @ts-ignore
                        // prettier-ignore
                        onClick={() => {onCountry(covidCase.country)}}
                        onMouseLeave={() => {
                          setTooltipContent("");
                        }}
                        style={{
                          default: {
                            fill: `${fillColor(
                              // @ts-ignore
                              covidCase?.casesPerOneMillion
                            )}`,
                            stroke: "black",
                          },
                          hover: {
                            fill: "#f7e9b5",
                            stroke: "black",
                          },
                        }}
                      />
                    </>
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
      <div>
        <Common countri={country} />
        {data.length > 0 && (
          <BarChart dataset={data} country={country} onReset={setCountry} />
        )}
      </div>
    </>
  );
};

export default memo(WorldMap);
