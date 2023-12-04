import { Space } from "antd";
import AppFooter from "./Components/AppFooter";
import AppHeader from "./Components/AppHeader";
import PageContent from "./Components/PageContent";
import SideMenu from "./Components/SideMenu";
import Dashbaord from "./Pages/Dashbaord"; // Fixed typo in import
import Inventory from "./Pages/Inventory";
import Orders from "./Pages/Orders";
import { useLocation } from "react-router-dom";
import "./App.css";

function Final() {
  const location = useLocation();
  console.log("Current route:", location.pathname);

  return (
    <div className="App">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
        {location.pathname === "/dashboard" ? <Dashbaord /> : null}
        {location.pathname === "/inventory" ? <Inventory /> : null}
        {location.pathname === "/orders" ? <Orders /> : null}
      </div>
      <AppFooter />
    </div>
  );
}

export default Final;
