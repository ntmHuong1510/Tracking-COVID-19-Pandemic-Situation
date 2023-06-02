import "./Home.scss";
import "react-tooltip/dist/react-tooltip.css";
import { useEffect, useState } from "react";
import axios from "axios";

import { useAppDispatch } from "../../ultils/store";
import { getCountriesData } from "../../reduxState/lineChartSlice";

import { Box, Container, Typography } from "@mui/material";
import LineChartCountries from "../../components/Graph/LineChartCountries";
import WorldMap from "../../components/WorldMap/WorldMap";

const Home = () => {
  const [covidCases, setCovidCases] = useState<Array<Object> | []>([]);
  const dispatch = useAppDispatch();
  const getAllCovidCases = async () => {
    axios
      .get("https://disease.sh/v3/covid-19/countries")
      .then(function (response: any) {
        setCovidCases(response.data);
        console.log(response.data);
        return response.data;
      })
      .catch(function (error: any) {
        console.error(error);
      });
  };

  useEffect(() => {
    getAllCovidCases();
    dispatch(getCountriesData());
  }, []);
  return (
    <Container>
      <Typography variant="h1" align="center">
        World Covid Map
      </Typography>
      <Typography minWidth={1000}>
        {covidCases.length > 0 && <WorldMap data={covidCases} />}
      </Typography>
      <Typography>
        <Typography align="center" variant="h5">
          Total cases and deaths in each country
        </Typography>
        <Box width={1100} height={500}>
          <Typography>
            <LineChartCountries width={1000} height={500} />
          </Typography>
        </Box>
      </Typography>
      <Typography></Typography>
    </Container>
  );
};

export default Home;
