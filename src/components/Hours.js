import React from "react";

const Hours = () => {
    return (
        <section className="hours-section py-5 bg-primary text-white text-center">
            <div className="container">
                <h2>Hours</h2>
                <div id="hours-box" className="hours-box p-3">
                    <p>Su: 1AM - 12PM</p>
                    <p>M: Closed</p>
                    <p>Tu: 1AM - 12PM</p>
                    <p>W: 1AM - 12PM</p>
                    <p>Th: 1AM - 12PM</p>
                    <p>F: 1AM - 12PM</p>
                    <p>Sa: 1AM - 12PM</p>
                </div>
            </div>
        </section>
    );
};

export default Hours;
