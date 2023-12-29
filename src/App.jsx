import { useEffect, useState } from "react";
import GlobalChart from "./components/GlobalChart";
import HeaderInfos from "./components/HeaderInfos";
import Table from "./components/Table";
import ToTop from "./components/ToTop";
import axios from "axios";

const App = () => {
  const [coinsData, setCoinsData] = useState([]);
  const [error, setError] = useState(null);

  const fetchMarket = async () => {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 250,
            page: 1,
            sparkline: false,
            price_change_percentage: "1h,24h,7d,14d,30d,200d,1y",
          },
        }
      );
      setCoinsData(response.data);
    } catch (error) {
      console.error("Erreur de récupération des données:", error);
      setError("Impossible de récupérer les données du marché.");
    }
  };

  useEffect(() => {
    fetchMarket();
  }, []);

  return (
    <div className="app-container">
      {error && <p>{error}</p>}
      <header>
        <HeaderInfos />
        <GlobalChart coinsData={coinsData} />
      </header>
      <Table coinsData={coinsData} />
      <ToTop />
    </div>
  );
};

export default App;
