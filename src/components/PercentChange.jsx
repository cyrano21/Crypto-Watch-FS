/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styles from "../styles/_settings.module.scss";

const PercentChange = ({ percent }) => {
  const [color, setColor] = useState();

  useEffect(() => {
    if (percent) {
      if (percent >= 0) {
        setColor(styles.green1);
      } else {
        setColor(styles.red1);
      }
    } else {
      setColor(styles.while1);
    }
  }, [percent]);

  return (
    <p className="percent-change-container" style={{ color }}>
      {percent ? percent.toFixed(1) + "%" : "-"}
    </p>
  );
};

export default PercentChange;

// import { useEffect, useState } from "react";
// import styles from "../styles/_settings.module.scss";

// const PercentChange = ({ percent }) => {
//   const [color, setColor] = useState();

//   useEffect(() => {
//     if (percent >= 0) {
//       setColor(styles.green1);
//     } else {
//       setColor(styles.red1);
//     }
//   }, [percent]);

//   return (
//     <p style={{ color: color ?? styles.white1 }}>
//       {percent ? `${percent.toFixed(2)}%` : "-"}
//     </p>
//   );
// };

// export default PercentChange;
