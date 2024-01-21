import ReactDOM from "react-dom/client";
import * as objtype from "./Componentes/Header";
import Error from "./Componentes/Error";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Suspense, lazy, useState } from "react";
import UserContext from "./Utils/Context/UserContext";
import CardState from "./Utils/Context/CardState";
import { Provider } from "react-redux";
import appStore from "./Utils/Redux/appStore";
import BottemNavBar from "./Componentes/BottemNavBar";
/**
 * Low level planing
 * NavBar
 *  -Logo
 *  -navitemes
 * Body
 *   -search bar
 *   -cardcontainer
 *      -card
 *        -image
 *        -name of res,star-rating,cuisine,delivary time
 * Footer
 *   -copyright
 *   -links
 *   -addresses
 *   -contact
 */
const Contactus = lazy(() => import("./Componentes/Contactus"));
const Body = lazy(() => import("./Componentes/Body"));
const SearchFood = lazy(() => import("./Componentes/SearchFood"));
const About = lazy(() => import("./Componentes/About"));
const Restaurent = lazy(() => import("./Componentes/menuItemes/Restaurent"));
const FavourateCard = lazy(() => import("./Componentes/FavourateCard"));
const MapCpt = lazy(() => import("./Componentes/mapCMP/MapCpt"));
const Bestoffers = lazy(() => import("./Componentes/Bestoffers"));
const Succes = lazy(() => import("./Componentes/PaymentCMP/Succes"));

const AppLayout = () => {
  const [cardNumber, setCardNumber] = useState(0);
  return (
    /** */
    <Provider store={appStore}>
      <CardState.Provider value={{ no: cardNumber, setCardNumber }}>
        <UserContext.Provider value={{ loggedIn: "pasha" }}>
          <div className="app">
            <objtype.Header></objtype.Header>
            <BottemNavBar></BottemNavBar>
            <Outlet />
          </div>
        </UserContext.Provider>
      </CardState.Provider>
    </Provider>
  );
};
const Approter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<h1>loading</h1>}>
            <Body />
          </Suspense>
        ),
      },
      {
        path: "/search",
        element: (
          <Suspense fallback={<h1>loading</h1>}>
            <SearchFood />
          </Suspense>
        ),
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<h1>loading</h1>}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<h1>loading</h1>}>
            <Contactus />
          </Suspense>
        ),
      },
      {
        path: "/restaurent/:resid",
        element: (
          <Suspense fallback={<h1>loading</h1>}>
            <Restaurent />
          </Suspense>
        ),
      },
      {
        path: "/FavourateCard",
        element: (
          <Suspense fallback={<h1>loading</h1>}>
            {" "}
            <FavourateCard />
          </Suspense>
        ),
      },
      {
        path: "/map/",
        element: (
          <Suspense fallback={<h1>loading</h1>}>
            <MapCpt />
          </Suspense>
        ),
      },
      {
        path: "/bestoffers/:id",
        element: (
          <Suspense fallback={<h1>loading</h1>}>
            <Bestoffers />
          </Suspense>
        ),
      },
      {
        path: "/order",
        element: (
          <Suspense fallback={<h1>loading</h1>}>
            {" "}
            <Succes />
          </Suspense>
        ),
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={Approter} />);
