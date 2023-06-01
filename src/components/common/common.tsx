import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  setSelectedCountries,
  setSelectedCountry,
} from "../../reduxState/lineChartSlice";
import { useAppDispatch } from "../../ultils/store";

interface Country {
  name: string;
  "country-code": string;
}
export default function Common(countri: any) {
  const [countries, setCountries] = useState([]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    getAllCountries();
    const code: Country = countries.find((country: Country) => {
      return country.name == countri.countri;
    }) || {
      name: "",
      "country-code": "000",
    };
    dispatch(setSelectedCountry(code["country-code"]));
  }, [countri]);

  const getAllCountries = async () => {
    await axios
      .get("data/countries.json")
      .then((response) => setCountries(response.data));
  };
  return <></>;
}
