/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const StarIcon = ({ coinId }) => {
  const [like, setLike] = useState(false);

  useEffect(() => {
    if (window.localStorage.coinList) {
      let favList = window.localStorage.coinList.split(",");
      if (favList.includes(coinId)) {
        setLike(true);
      } else {
        setLike(false);
      }
    }
  }, [coinId]);

  const idChecker = (id) => {
    let favList = null;
    if (window.localStorage.coinList) {
      favList = window.localStorage.coinList.split(",");
    }

    if (favList) {
      if (favList.includes(id)) {
        window.localStorage.coinList = favList.filter((coin) => coin !== id);
        setLike(false);
      } else {
        window.localStorage.coinList = [...favList, coinId];
        setLike(true);
      }
    } else {
      window.localStorage.coinList = coinId;
      setLike(true);
    }
  };

  return (
    <img
      onClick={() => idChecker(coinId)}
      src={like ? "./assets/star-full.svg" : "./assets/star-empty.svg"}
      alt="icon-star"
    />
  );
};

export default StarIcon;

// import { useEffect, useState } from "react";

// const StarIcon = ({ coinId }) => {
//   const [isLiked, setIsLiked] = useState(false);

//   useEffect(() => {
//     const favList = window.localStorage.getItem("coinList")?.split(",") ?? [];
//     setIsLiked(favList.includes(coinId));
//   }, [coinId]);

//   const handleToggleLike = () => {
//     const favList = new Set(
//       window.localStorage.getItem("coinList")?.split(",") ?? []
//     );
//     if (favList.has(coinId)) {
//       favList.delete(coinId);
//     } else {
//       favList.add(coinId);
//     }
//     window.localStorage.setItem("coinList", Array.from(favList).join(","));
//     setIsLiked(!isLiked);
//   };

//   return (
//     <img
//       onClick={handleToggleLike}
//       src={isLiked ? "./assets/star-full.svg" : "./assets/star-empty.svg"}
//       alt="Star Icon"
//     />
//   );
// };

// export default StarIcon;
