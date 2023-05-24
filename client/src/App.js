import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import CampaignPage from "./pages/CampaignPage";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Payment from "./pages/Payment";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  const [renderedRoutes, setRenderedRoutes] = useState(null);

  const routes = [
    { path: "/", element: <Home></Home> },
    {
      path: "/campaigns/:category",
      element: <CategoryPage></CategoryPage>,
    },
    { path: "/campaign/:id", element: <CampaignPage></CampaignPage> },
    { path: "/login", element: <Home></Home> },
    { path: "/register", element: <Register></Register> },
    { path: "/cart", element: <Cart></Cart> },
    { path: "/checkout/payment", element: <Payment></Payment> },
  ];

  useEffect(() => {
    setRenderedRoutes(
      routes.map((route) => {
        let content;
        if (route.path == "/register") {
          content = <Register></Register>;
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
      <Routes>{renderedRoutes}</Routes>
    </Router>
  );
}

export default App;
