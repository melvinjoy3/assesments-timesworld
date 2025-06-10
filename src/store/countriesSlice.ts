import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCountries } from "../API/Response";

interface Country {
  name: string;
  region: string;
  flag: string;
}

interface CountriesState {
  items: Country[];
  displayedItems: Country[];
  currentPage: number;
  loading: boolean;
  error: string | null;
}

const initialState: CountriesState = {
  items: [],
  displayedItems: [],
  currentPage: 1,
  loading: false,
  error: null,
};

export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async () => {
    const response = await getCountries();
    return response;
  }
);

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    loadMore: (state) => {
      const ITEMS_PER_PAGE = 12;
      const nextPage = state.currentPage + 1;
      const startIndex = (nextPage - 1) * ITEMS_PER_PAGE;
      const endIndex = nextPage * ITEMS_PER_PAGE;

      state.displayedItems = [
        ...state.displayedItems,
        ...state.items.slice(startIndex, endIndex),
      ];
      state.currentPage = nextPage;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.displayedItems = action.payload.slice(0, 12);
        state.currentPage = 1;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load countries";
      });
  },
});

export const { loadMore } = countriesSlice.actions;
export default countriesSlice.reducer;
