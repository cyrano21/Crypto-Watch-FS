import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import PercentChange from "./PercentChange";
import TableFilters from "./TableFilters";

const HeaderInfos = () => {
  const [headerData, setHeaderData] = useState({});

  // Fonction pour mettre en pause l'exécution pendant un certain temps
  const pause = (duration) => {
    return new Promise((resolve) => setTimeout(resolve, duration));
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/global"
      );
      setHeaderData(response.data.data);
    } catch (error) {
      console.error("Erreur de récupération des données:", error);
      if (error.response && error.response.status === 429) {
        // Si l'erreur est 429, attendez 60 secondes avant de réessayer
        console.log("Trop de requêtes - Attente avant de réessayer...");
        await pause(10000);
        fetchData(); // Réessayer la requête
      }
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="header-container">
      <ul className="title">
        <li>
          <h1>
            <img src="./assets/logo.png" alt="logo" /> Watch Tower
          </h1>
        </li>
        <li>
          Crypto-monnaies :
          {headerData.active_cryptocurrencies
            ? headerData.active_cryptocurrencies.toLocaleString()
            : "Chargement..."}
        </li>
        <li>
          Marché : {headerData.markets ? headerData.markets : "Chargement..."}
        </li>
      </ul>
      <ul className="infos-mkt">
        <li className="global-mkt">
          Global Market Cap :
          <PercentChange
            percent={headerData.market_cap_change_percentage_24h_usd}
          />
        </li>
        <li>
          BTC dominance :
          {headerData.market_cap_percentage?.btc
            ? `${headerData.market_cap_percentage.btc.toFixed(1)}%`
            : "Chargement..."}
        </li>
        <li>
          ETH dominance :
          {headerData.market_cap_percentage?.eth
            ? `${headerData.market_cap_percentage.eth.toFixed(1)}%`
            : "Chargement..."}
        </li>
      </ul>
      <TableFilters />
    </div>
  );
};

export default HeaderInfos;
