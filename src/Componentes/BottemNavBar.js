import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const BottemNavBar = () => {
  const [selector, setSelector] = useState(1);
  const cardData = useSelector((data) => data.cart.itemes);
  const [count, setCount] = useState(0);
  useEffect(() => {
    var t = 0;
    cardData.map((data) => {
      if (data.addSymbole === true) {
        t = t + 1;
      }
    });
    setCount(t);
  }, [cardData]);
  return (
    <>
      <div
        className={`md:hidden flex justify-around fixed bottom-0 left-0 z-50 w-full h-12 bg-white border-t border-gray-200`}
      >
        <Link to="/">
          <div>
            {selector === 1 ? (
              <>
                <img
                  src="https://img.favpng.com/24/6/8/logo-house-home-png-favpng-M9ipvhdS2MyrEPAv8wdPZ0b6x.jpg"
                  className="w-7 h-7 mt-1"
                ></img>
                <div className="w-7 h-[2px] border-1 bg-black"></div>
              </>
            ) : (
              <span
                onClick={() => setSelector(1)}
                class="material-symbols-outlined mt-3 cursor-pointer"
              >
                home
              </span>
            )}
          </div>
        </Link>
        <Link to="/search/">
          <div>
            {selector === 2 ? (
              <>
                <img
                  src="https://i.pinimg.com/736x/fa/0e/7b/fa0e7b992eff03c576727e95c746005c.jpg"
                  className="w-10 h-8"
                ></img>
                <div className="w-11 h-[2px] border-3 bg-black"></div>
              </>
            ) : (
              <span
                onClick={() => setSelector(2)}
                class="material-symbols-outlined mt-3 cursor-pointer"
              >
                search
              </span>
            )}
          </div>
        </Link>
        <Link to={"/FavourateCard/"}>
          <div>
            {selector === 3 ? (
              <>
                <img
                  src="https://c7.alamy.com/comp/2GP9DBM/shopping-cart-glyph-icon-with-plus-add-from-cart-e-commerce-sign-graph-symbol-for-your-web-site-design-logo-app-ui-vector-illustration-eps10-2GP9DBM.jpg"
                  className="w-10 h-10"
                ></img>
                <span className="absolute -top-2">{count}</span>
                <div className="w-10 h-[0.5px] border-1 bg-black"></div>
              </>
            ) : (
              <>
                <span
                  onClick={() => setSelector(3)}
                  class="material-symbols-outlined mt-3 cursor-pointer"
                >
                  shopping_cart
                </span>
                <span>{count}</span>
              </>
            )}
          </div>
        </Link>

        <div>
          <span class="material-symbols-outlined mt-3 cursor-pointer">
            person
          </span>
        </div>
        <div>
          {selector === 4 ? (
            <>
              <img
                src="https://pic.onlinewebfonts.com/thumbnails/icons_323345.svg"
                className="w-7 h-7 mt-1"
              ></img>
              <div className="w-8 h-[2.5px] border-3 bg-black"></div>
            </>
          ) : (
            <Link to="/map/">
              <img
                onClick={() => setSelector(4)}
                className="w-8 h-8 mt-1 cursor-pointer"
                src="https://www.pngitem.com/pimgs/m/136-1367093_map-pin-coloring-page-icon-hd-png-download.png"
              ></img>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
export default BottemNavBar;
