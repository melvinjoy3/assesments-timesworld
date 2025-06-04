import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import { FixedSizeGrid as Grid } from "react-window";

const ITEMS_PER_PAGE = 12;
const ROW_HEIGHT = 100;
const COLUMN_WIDTH = 600;

const Home = () => {
  const [countries, setCountries] = useState<any[]>([]);
  const [displayedCountries, setDisplayedCountries] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCountries();
  }, []);

  const getCountries = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://restcountries.com/v2/all?fields=name,region,flag"
      );
      const data = await response.json();
      setCountries(data);
      setDisplayedCountries(data.slice(0, ITEMS_PER_PAGE));
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
    setLoading(false);
  };

  const loadMore = () => {
    const nextPage = currentPage + 1;
    const startIndex = 0;
    const endIndex = nextPage * ITEMS_PER_PAGE;
    setDisplayedCountries(countries.slice(startIndex, endIndex));
    setCurrentPage(nextPage);
  };

  const Cell = ({ columnIndex, rowIndex, style }: any) => {
    const index = rowIndex * 2 + columnIndex;
    if (index >= displayedCountries.length) return null;
    const item = displayedCountries[index];

    return (
      <div style={style} className="p-2">
        <div className="flex items-center border-2 border-secondary rounded-md p-4 bg-white h-full w-[528px] h-[130px]">
          <img
            src={item.flag}
            alt={item.name}
            className="w-16 h-10 object-cover mr-4 border-2 border-secondary"
          />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
            <p className="text-sm text-gray-500">{item.region}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Welcome Banner */}
      <div className="flex items-center justify-center w-full my-8 px-4">
        <div className="flex-grow h-[2px] bg-gray-700 mr-4 max-w-[300px]" />
        <h1 className="text-2xl font-bold text-gray-800 tracking-widest">
          WELCOME
        </h1>
        <div className="flex-grow h-[2px] bg-gray-700 ml-4 max-w-[300px]" />
      </div>

      {/* Virtualized Grid */}
      <div className="px-4 md:px-20">
        <Grid
          columnCount={2}
          columnWidth={COLUMN_WIDTH}
          height={600}
          rowCount={Math.ceil(displayedCountries.length / 2)}
          rowHeight={ROW_HEIGHT}
          width={1200}
        >
          {Cell}
        </Grid>
      </div>

      {/* Load More Button */}
      {displayedCountries.length < countries.length && (
        <div className="flex justify-center my-8">
          <button
            onClick={loadMore}
            disabled={loading}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
