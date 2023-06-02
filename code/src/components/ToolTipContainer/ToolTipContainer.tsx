import React from "react";
import "./ToolTipContainer.scss";
type Props = {
  cases: String;
  recover: String;
  todayCases: String;
  flag: String;
  country: String;
  deaths: String;
  casesPerOneMillion: string;
  deathsPerOneMillion: string;
  oneCasePerPeople: string;
  oneDeathPerPeople: string;
  oneTestPerPeople: string;
  population: string;
  recovered: string;
  recoveredPerOneMillion: string;
  onCountry: (name: string) => any;
};
const ToolTipContainer: React.FC<Props> = ({
  cases,
  country,
  deaths,
  flag,
  casesPerOneMillion,
  deathsPerOneMillion,
  oneCasePerPeople,
  oneDeathPerPeople,
  oneTestPerPeople,
  population,
  recovered,
  recoveredPerOneMillion,
}) => {
  return (
    <div className="tooltip-container">
      <section className="tooltip-title">
        <img src={`${flag}`} alt={`${country}`} />
        <h4>{country}</h4>
      </section>

      <p>Cases: {cases}</p>
      <p>Deaths: {deaths}</p>
      <p>Cases Per Million: {casesPerOneMillion}</p>
      <p>Deaths Per Million: {deathsPerOneMillion}</p>
      <p>Case Per People: {oneCasePerPeople}</p>
      <p>Death Per People: {oneDeathPerPeople}</p>
      <p>Test Per People: {oneTestPerPeople}</p>
      <p>Population: {population}</p>
      <p>Recovered: {recovered}</p>
      <p>Recovered Per Million: {recoveredPerOneMillion}</p>
    </div>
  );
};

export default ToolTipContainer;
