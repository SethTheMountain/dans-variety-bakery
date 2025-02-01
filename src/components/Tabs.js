import React, { useState } from "react";
import "../App.css";
import Menu from "./Menu";
import Hours from "./Hours";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("menu");

  return (
    <div className="tabs-container">
      {/* Tab Navigation - Should Only Appear Once */}
      <div className="tabs-nav">
        <button className={`tab-button ${activeTab === "menu" ? "active" : ""}`} onClick={() => setActiveTab("menu")}>
          Our Menu
        </button>
        <button className={`tab-button ${activeTab === "hours" ? "active" : ""}`} onClick={() => setActiveTab("hours")}>
          Hours
        </button>
      </div>

      {/* Tab Content - Ensures Only One Component Renders at a Time */}
      <div className="tab-content">
        {activeTab === "menu" && <Menu />}
        {activeTab === "hours" && (
          <div className="hours-section">
            <Hours />
          </div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
