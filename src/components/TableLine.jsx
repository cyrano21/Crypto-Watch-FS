import PercentChange from "./PercentChange";
import StarIcon from "./StarIcon";
import { useState } from "react";
import CoinShart from "./CoinShart";

const TableLine = ({ coin, index }) => {
  const [showChart, setShowChart] = useState(false);
  // Amélioration de la fonction de formatage du prix pour une meilleure lisibilité et logique claire
  const formatPrice = (num) => {
    // Si le nombre est inférieur à 1000, formatez-le avec deux à sept décimales
    if (!num || num >= 1000) return num; // Gérer les cas où num est undefined ou supérieur à 1000

    return new Intl.NumberFormat("fr-FR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 7,
    }).format(num);
  };

  const mktCapFormater = (num) => {
    let newNum = String(num).split("").slice(0, -6);
    return Number(newNum.join(""));
  };

  // Assurer la robustesse en vérifiant l'existence de la propriété de l'objet
  const coinName = coin?.name ?? "Unknown Coin"; // Fournir une valeur par défaut si le nom n'est pas disponible
  const coinSymbol = coin?.symbol?.toUpperCase() ?? ""; // Gérer les cas où le symbole n'est pas disponible

  return (
    <div className="table-line">
      <div className="infos-container">
        <StarIcon coinId={coin.id} />

        <p>{index + 1}</p>
        <div className="img">
          {/* Fournir un texte alternatif descriptif pour l'image */}
          <img src={coin?.image} height="20" alt={`${coinName} Logo`} />
        </div>
        <div className="infos">
          <div
            className="chart-img"
            onMouseEnter={() => setShowChart(true)}
            onMouseLeave={() => {
              setShowChart(false);
            }}
          >
            {/* Assurez-vous que cette ressource est disponible et correctement chargée */}
            <img src="./assets/chart-icon.svg" alt="Chart Icon" />
            <div className="chart-container" id={coin.name}>
              {showChart && <CoinShart coinId={coin.id} coinName={coin.name} />}
            </div>
          </div>
          <h4>{coinName}</h4>
          <span>- {coinSymbol}</span>
          {/* Construire le lien de manière robuste et gérer les caractères spéciaux */}
          <a
            href={`https://www.coingecko.com/fr/pi%C3%A8ces/${coin.id.toLowerCase()}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="./assets/info-icon.svg" alt="More Info Icon" />
          </a>
        </div>
      </div>
      {/* Appliquer le formatage du prix */}
      <p>{formatPrice(coin?.current_price)} $</p>
      <p className="mktcp">
        {mktCapFormater(coin.market_cap).toLocaleString()} M$
      </p>
      <p className="volume">{coin.total_volume.toLocaleString()} $</p>
      <PercentChange percent={coin.price_change_percentage_1h_in_currency} />
      <PercentChange percent={coin.market_cap_change_percentage_24h} />
      <PercentChange percent={coin.price_change_percentage_7d_in_currency} />
      <PercentChange percent={coin.price_change_percentage_30d_in_currency} />
      <PercentChange percent={coin.price_change_percentage_200d_in_currency} />
      <PercentChange percent={coin.price_change_percentage_1y_in_currency} />
      {coin.ath_change_percentage > -3 ? (
        <p>ATH !</p>
      ) : (
        <PercentChange percent={coin.ath_change_percentage} />
      )}
    </div>
  );
};

export default TableLine;
