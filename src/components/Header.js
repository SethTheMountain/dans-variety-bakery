import React, { useEffect, useState } from "react";
import "../App.css";

const Header = () => {
    const [isSticky, setIsSticky] = useState(false);

    // Function to detect scroll and toggle sticky class
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header className={`header ${isSticky ? "sticky-header" : ""}`}>
            <div className="header-container">
                {/* Logo aligned left */}
                <img src="/images/sign2.png" alt="Dan's Variety Bakery Logo" className="logo" />

                {/* Title aligned left */}
                <h1 className="header-title">Dan's Variety Bakery</h1>
            </div>
        </header>
    );
};

export default Header;
