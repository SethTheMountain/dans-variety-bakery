import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Carousel from "./components/Carousel";
import Contact from './components/Contact';
import Footer from './components/Footer';
import Tabs from "./components/Tabs";
import "./App.css";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");

    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={
                        <>
                            <Carousel />
                            <Contact />
                            <Tabs />
                            <Footer />
                        </>
                    } />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
