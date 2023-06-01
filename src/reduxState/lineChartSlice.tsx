import {
  createSlice,
  createAsyncThunk,
  SerializedError,
} from "@reduxjs/toolkit";
import axios from "axios";

interface lineChartType {
  payload: {};
  seletedCountries: string;
  selectedCountry: {};
  isLoading: boolean;
  isLoadingCompare: boolean;
  isError: SerializedError;
  payloadCompare: [];
}

const initialState: lineChartType = {
  payload: [],
  payloadCompare: [],
  seletedCountries: "",
  selectedCountry: {},
  isLoadingCompare: false,
  isLoading: false,
  isError: "" as SerializedError,
};

interface Payload {
  countryCode: string;
}
export const getCountryData = createAsyncThunk(
  "api/getCountryData",
  async (payload: Payload, thunkAPI) => {
    const response = await axios.get(
      `https://disease.sh/v3/covid-19/historical/${payload.countryCode}?lastdays=all`
    );
    return response.data.timeline;
  }
);

export const getCountriesData: any = createAsyncThunk(
  "api/getCountriesData",
  async (thunkAPI) => {
    const response = await axios.get(`data/historical_data.json`);
    return response.data;
  }
);

const lineChartSlice = createSlice({
  name: "lineChartSlice",
  initialState,
  reducers: {
    setSelectedCountry: (state, action) => {
      state.selectedCountry = action.payload;
    },
    setSelectedCountries: (state, action) => {
      state.seletedCountries = action.payload;
    },
  },
  extraReducers: (build) => {
    build.addCase(getCountryData.pending, (state, action) => {
      state.isLoading = true;
    });

    build.addCase(getCountryData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.payload = action.payload;
    });

    build.addCase(getCountryData.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    });

    build.addCase(getCountriesData.pending, (state, action) => {
      state.isLoadingCompare = true;
    });

    build.addCase(getCountriesData.fulfilled, (state, action) => {
      state.isLoadingCompare = false;
      state.payloadCompare = action.payload;
    });

    build.addCase(getCountriesData.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    });
  },
});

export const { setSelectedCountry, setSelectedCountries } =
  lineChartSlice.actions;
export default lineChartSlice.reducer;
