import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import Users from "./pages/UserList";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useInRouterContext,
} from "react-router-dom";
import User from "./pages/User";
import NewUser from "./pages/NewUser";
import CampaignList from "./pages/CampaignList";
import Campaign from "./pages/Campaign";
import NewCampaign from "./pages/NewCampaign";
import Login from "./pages/Login";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  const [renderedRoutes, setRenderedRoutes] = useState(null);

  const routes = [
    { path: "/", element: <Home></Home> },
    { path: "/users", element: <Users></Users> },
    { path: "/user/:id", element: <User></User> },
    { path: "/newuser", element: <NewUser></NewUser> },
    { path: "/campaigns", element: <CampaignList></CampaignList> },
    { path: "/campaign/:id", element: <Campaign></Campaign> },
    { path: "/newcampaign", element: <NewCampaign></NewCampaign> },
    {
      path: "/login",
      element: <Home></Home>,
    },
  ];

  useEffect(() => {
    setRenderedRoutes(
      routes.map((route) => {
        let content;
        if (user) {
          content = route.element;
        } else {
          content = <Login></Login>;
        }

        return <Route path={route.path} element={content}></Route>;
      })
    );
  }, [user]);
  return (
    <Router>
      <Routes>{renderedRoutes}</Routes>
    </Router>
  );
}

export default App;
