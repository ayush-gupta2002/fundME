import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import CampaignPage from "./pages/CampaignPage";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Order from "./pages/Order";
import Payment from "./pages/Payment";
import Categories from "./pages/Categories";
import AllCampaigns from "./pages/AllCampaigns";
import PublicProfile from "./pages/PublicProfile";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Flash from "./components/Flash";

export const FlashContext = React.createContext();

function App() {
  const user = useSelector((state) => state.user.currentUser);
  const [renderedRoutes, setRenderedRoutes] = useState(null);
  const [flash, setFlash] = useState("");

  const routes = [
    { path: "/", element: <Home></Home> },
    {
      path: "/campaigns/:category",
      element: <CategoryPage></CategoryPage>,
    },
    { path: "/campaign/:id", element: <CampaignPage></CampaignPage> },
    { path: "/login", element: <Login></Login> },
    { path: "/register", element: <Register></Register> },
    { path: "/cart", element: <Cart></Cart> },
    { path: "/checkout/payment", element: <Payment></Payment> },
    { path: "/user/:id", element: <Profile></Profile> },
    { path: "/order/:id", element: <Order></Order> },
    { path: "/categories", element: <Categories></Categories> },
    { path: "/campaigns", element: <AllCampaigns></AllCampaigns> },
    { path: "/users/:id", element: <PublicProfile></PublicProfile> },
  ];

  useEffect(() => {
    setRenderedRoutes(
      routes.map((route) => {
        let content;
        if (route.path === "/register") {
          if (!user) {
            content = <Register></Register>;
          } else {
            content = <Home></Home>;
          }
        } else if (route.path === "/login") {
          if (!user) {
            content = <Login></Login>;
          } else {
            content = <Home></Home>;
          }
        } else {
          if (user) {
            content = route.element;
          } else {
            content = <Login></Login>;
          }
        }

        return <Route path={route.path} element={content}></Route>;
      })
    );
  }, [user]);
  return (
    <Router>
      <FlashContext.Provider value={{ flash: flash, setFlash: setFlash }}>
        <Flash></Flash>
        <Routes>{renderedRoutes}</Routes>
      </FlashContext.Provider>
    </Router>
  );
}

export default App;
