/* eslint-disable react/prop-types */
import { useState } from "react";
import TableLine from "./TableLine";
import ToTop from "./ToTop";
import { useSelector } from "react-redux";
import { isStableCoin } from "./Utils";

const Table = ({ coinsData }) => {
  console.log("coinsData===>", coinsData);
  const [rangeNumber, setRangeNumber] = useState(100);
  const [orderBy, setOrderBy] = useState("");
  const [error, setError] = useState(null);
  const showStable = useSelector((state) => state.stableReducer.showStable);
  const showFavList = useSelector((state) => state.listReducer.showList);

  const tableHeader = [
    "Prix",
    "MarketCap",
    "Volume",
    "1h",
    "1j",
    "1s",
    "1m",
    "6m",
    "1a",
    "ATH",
  ];

  const sortData = (a, b) => {
    switch (orderBy) {
      case "Prix":
        return b.current_price - a.current_price;
      case "Volume":
        return b.total_volume - a.total_volume;
      case "MarketCap":
        return b.market_cap - a.market_cap;
      case "1h":
        return (
          b.price_change_percentage_1h_in_currency -
          a.price_change_percentage_1h_in_currency
        );
      case "1j":
        return (
          b.market_cap_change_percentage_24h -
          a.market_cap_change_percentage_24h
        );
      case "1s":
        return (
          b.price_change_percentage_7d_in_currency -
          a.price_change_percentage_7d_in_currency
        );
      case "1m":
        return (
          b.price_change_percentage_30d_in_currency -
          a.price_change_percentage_30d_in_currency
        );
      case "6m":
        return (
          b.price_change_percentage_200d_in_currency -
          a.price_change_percentage_200d_in_currency
        );
      case "1a":
        return (
          b.price_change_percentage_1y_in_currency -
          a.price_change_percentage_1y_in_currency
        );
      case "ATH":
        return b.ath_change_percentage - a.ath_change_percentage;
      case "Prixreverse":
        return a.current_price - b.current_price;
      case "Volumereverse":
        return a.total_volume - b.total_volume;
      case "MarketCapreverse":
        return a.market_cap - b.market_cap;
      case "1hreverse":
        return (
          a.price_change_percentage_1h_in_currency -
          b.price_change_percentage_1h_in_currency
        );
      case "1jreverse":
        return (
          a.market_cap_change_percentage_24h -
          b.market_cap_change_percentage_24h
        );
      case "1sreverse":
        return (
          a.price_change_percentage_7d_in_currency -
          b.price_change_percentage_7d_in_currency
        );
      case "1mreverse":
        return (
          a.price_change_percentage_30d_in_currency -
          b.price_change_percentage_30d_in_currency
        );
      case "6mreverse":
        return (
          a.price_change_percentage_200d_in_currency -
          b.price_change_percentage_200d_in_currency
        );
      case "1areverse":
        return (
          a.price_change_percentage_1y_in_currency -
          b.price_change_percentage_1y_in_currency
        );
      case "ATHreverse":
        return a.ath_change_percentage - b.ath_change_percentage;
      default:
        return 0;
    }
  };

  if (!Array.isArray(coinsData)) {
    setError("Les données reçues ne sont pas dans le format attendu.");
  }

  return (
    <div className="table-container">
      {/* Afficher un message d'erreur si nécessaire */}
      {error && <div className="error">{error}</div>}

      {!error && (
        <>
          <ul className="table-header">
            <div className="range-container">
              <span>
                Top{" "}
                <input
                  type="text"
                  value={rangeNumber}
                  onChange={(e) => setRangeNumber(e.target.value)}
                />
              </span>
              <input
                type="range"
                min="1"
                max="250"
                value={rangeNumber}
                onChange={(e) => setRangeNumber(e.target.value)}
              />
              <ToTop />
            </div>
            {tableHeader.map((el) => (
              <li key={el}>
                <input
                  type="radio"
                  name="header-el"
                  id={el}
                  defaultChecked={el === orderBy || el === orderBy + "reverse"}
                  onClick={() => {
                    if (orderBy === el) {
                      setOrderBy(el + "reverse");
                    } else {
                      setOrderBy(el);
                    }
                  }}
                />
                <label htmlFor={el}>{el}</label>
              </li>
            ))}
          </ul>
          {coinsData
            .slice(0, rangeNumber)
            .filter((coin) => {
              if (showStable) {
                return coin;
              } else {
                if (isStableCoin(coin.symbol)) {
                  return coin;
                }
              }
            })
            .filter((coin) => {
              if (showFavList) {
                let list = window.localStorage.coinList.split(",");
                if (list.includes(coin.id)) {
                  return coin;
                }
              } else {
                return coin;
              }
            })
            .sort(sortData)
            .map((coin, index) => (
              <TableLine coin={coin} index={index} key={coin.id || index} />
            ))}
        </>
      )}
    </div>
  );
};

export default Table;
