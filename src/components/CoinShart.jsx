/* eslint-disable react/prop-types */
import axios from "axios";

import { useEffect, useState, useCallback } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import colors from "../styles/_settings.module.scss";

const CoinShart = ({ coinId, coinName }) => {
  const [duration, setDuration] = useState(30);
  const [coinData, setCoinData] = useState([]);

  const headerData = [
    [1, "1 jour"],
    [3, "3 jours"],
    [7, "7 jours"],
    [30, "1 mois"],
    [91, "3 mois"],
    [181, "6 mois"],
    [365, "1 an"],
    [3000, "Max"],
  ];

  const fetchChart = useCallback(async () => {
    let dataArray = [];
    try {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${duration}${
          duration > 32 ? "&interval=daily" : ""
        }`
      );

      if (res.data && res.data.prices) {
        for (let i = 0; i < res.data.prices.length; i++) {
          let price = res.data.prices[i][1];

          dataArray.push({
            date: new Date(res.data.prices[i][0]).toLocaleDateString(),
            price: price < "50" ? price : parseInt(price),
          });
        }
        setCoinData(dataArray);
      } else {
        // Gère la situation où la réponse n'est pas ce que nous attendions
        console.error("Réponse inattendue:", res.data);
      }
    } catch (error) {
      console.error("Erreur de récupération des données fetchChart:", error);
      if (error.response && error.response.status === 429) {
        // Si l'erreur est 429, attendez 60 secondes avant de réessayer
        console.log("Trop de requêtes - Attente avant de réessayer...");
      } else {
        // Autres erreurs
        console.error("Erreur lors de l'appel API:", error);
      }
    }
  }, [coinId, duration]);

  useEffect(() => {
    fetchChart();
  }, [fetchChart]);

  return (
    <div className="coin-chart">
      <p>{coinName}</p>
      <div className="btn-container">
        {headerData.map((el) => {
          return (
            <div
              key={el[0]}
              htmlFor={"btn" + el[0]}
              onClick={() => setDuration(el[0])}
              className={el[0] === duration ? "active-btn" : ""}
            >
              {el[1]}
            </div>
          );
        })}
      </div>
      <AreaChart
        width={680}
        height={250}
        data={coinData}
        margin={{ top: 10, right: 0, left: 100, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="7%" stopColor={colors.color1} stopOpacity={0.8} />
            <stop offset="93%" stopColor={colors.white1} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" />
        <YAxis domain={["auto", "auto"]} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="price"
          stackId={colors.color1}
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </div>
  );
};

export default CoinShart;
