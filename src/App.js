import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from './components/Header';
import Carousel from "./components/Carousel";
import Contact from './components/Contact';
import Footer from './components/Footer';
import Tabs from "./components/Tabs";
import AdminAuth from "./components/AdminAuth";
import AdminDashboard from "./components/AdminDashboard";
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
                    
                    {/* Admin Routes */}
                    <Route path="/admin" element={<AdminAuth onLogin={() => setIsLoggedIn(true)} />} />
                    <Route path="/admin/create" element={isLoggedIn ? <AdminDashboard /> : <Navigate to="/admin" />} />

                    {/* Catch-All Redirect */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
