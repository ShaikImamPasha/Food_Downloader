import { useSelector } from "react-redux";
const useCountNoOfItemes = () => {
  const itemCards = useSelector((state) => state.cart.itemes);
  var count = 0;
  itemCards.map((data) => {
    if (data.addSymbole === true) {
      count++;
    }
  });
  return count;
};
export { useCountNoOfItemes };
