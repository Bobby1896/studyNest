import { Outlet } from "react-router";
import Header from "../components/dashboard/Header";
import Sidebar from "../components/dashboard/Sidebar";
import "../styles/dashboardLayout.scss";
import { useState } from "react";

const Dashboard = () => {
  const [hideSideBar, setHideSideBar] = useState(false);

  const hideTheSidebar = () => {
    setHideSideBar(true);
  }

  const showTheSidebar = () => {
    setHideSideBar(false);
  }


  return (
    <div className="dashboard-layout">
      <Sidebar hide={hideSideBar} hideBar={hideTheSidebar}  />
      <div>
        <Header showTheSidebar={showTheSidebar} />
        <main>
        <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
