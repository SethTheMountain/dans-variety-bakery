import React from "react";

const Contact = () => {
    return (
        <section id="contact" className="contact-section py-5">
            <div className="container text-center">
                <h2>Contact/Hours</h2>
                <p className="lead">
                    Call in your order at <br />
                    <a href="tel:7654534591" className="phone-number">
                        (765) 453-4591
                    </a>
                </p>
                <div className="map-container">
                    <h3>Come see us:</h3>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12141.721123490273!2d-86.13993073148265!3d40.46574496785301!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x881485b42a7ed1a1%3A0x3b08deba4f070ee4!2sDan&#39;s%20Variety%20Bakery!5e0!3m2!1sen!2sus!4v1737492609227!5m2!1sen!2sus"
                        width="100%"
                        height="300"
                        style={{ border: 0 }}
                        allowFullScreen="{true}"
                        loading="lazy"
                        allow="fullscreen"
                        title="Dan's Variety Bakery Location"
                    ></iframe>
                </div>
            </div>
        </section>
    );
};

export default Contact;
