import React from "react";
import Feed from "../../component/feed/Feed";
import Rightbar from "../../component/rightsidebar/Rightbar";
import Sidebar from "../../component/sidebar/Sidebar";
import Topbar from "../../component/topbar/Topbar";
import "./home.css";

const Home = () => {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
      <Sidebar />
      <Feed />
      <Rightbar />
      </div>
    </>
  );
};

export default Home;
