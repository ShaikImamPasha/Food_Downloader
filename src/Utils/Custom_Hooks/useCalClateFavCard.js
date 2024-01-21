import { useSelector } from "react-redux";
function useCalClateFavCard() {
  const FavourateItemesCard = useSelector((states) => states.cart.itemes);
  var count = 0;
  FavourateItemesCard.map((data) => {
    if (data.addSymbole) {
      count++;
    }
  });
  return count === 0 ? true : false;
}
export { useCalClateFavCard };
