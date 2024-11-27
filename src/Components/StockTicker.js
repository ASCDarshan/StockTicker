import React, { useState, useEffect } from "react";
import axios from "axios";

const StockTicker = () => {
  const [stockData, setStockData] = useState({
    top_gainers: [],
    top_losers: [],
  });

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(
          "https://indian-stock-exchange-api2.p.rapidapi.com/trending",
          {
            headers: {
              "X-RapidAPI-Key":
                "0a9bf56bd2msh3c63756a9efc6e7p1accc0jsn6f796942207a",
              "X-RapidAPI-Host": "indian-stock-exchange-api2.p.rapidapi.com",
            },
          }
        );

        const gainers = response?.data?.trending_stocks?.top_gainers || [];
        const losers = response?.data?.trending_stocks?.top_losers || [];
        setStockData({
          top_gainers: gainers,
          top_losers: losers,
        });
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    const intervalId = setInterval(() => {
      fetchStockData();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h2>Top Gainers</h2>
      <div
        style={{ display: "flex", overflowX: "scroll", whiteSpace: "nowrap" }}
      >
        {stockData.top_gainers?.map((gainer) => (
          <div
            key={gainer.ticker_id}
            style={{
              margin: "0 10px",
              padding: "10px",
              border: "1px solid green",
              borderRadius: "5px",
              backgroundColor: "#e8f5e9",
            }}
          >
            <p>
              <strong>{gainer.company_name}</strong>
            </p>
            <p>Price: ₹{gainer.price}</p>
            <p>Change: +{gainer.percent_change}%</p>
          </div>
        ))}
      </div>

      <h2>Top Losers</h2>
      <div
        style={{ display: "flex", overflowX: "scroll", whiteSpace: "nowrap" }}
      >
        {stockData.top_losers?.map((loser) => (
          <div
            key={loser.ticker_id}
            style={{
              margin: "0 10px",
              padding: "10px",
              border: "1px solid red",
              borderRadius: "5px",
              backgroundColor: "#ffebee",
            }}
          >
            <p>
              <strong>{loser.company_name}</strong>
            </p>
            <p>Price: ₹{loser.price}</p>
            <p>Change: {loser.percent_change}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockTicker;
