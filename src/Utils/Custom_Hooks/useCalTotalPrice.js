import { useSelector } from "react-redux";
function useCalTotalPrice() {
  const FavourateItemesCard = useSelector((states) => states.cart.itemes);
  var price = FavourateItemesCard.reduce(
    (i, data) =>
      (data.addSymbole &&
        ((data.price || data.defaultPrice) * data.count) / 100) + i,
    0
  );
  return { price };
}
export { useCalTotalPrice };
