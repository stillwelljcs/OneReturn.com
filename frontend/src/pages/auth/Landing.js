import React from "react";
import "./styles/landing.css";

const Landing = () => {
    return (
        <div className="construction-container" id="container">
            <main class="body">
                <h1>Introduction</h1>
                <div>We are OneReturn.</div>
                <div>Your one stop shop for all electronic receipt handling needs.</div>
            </main>
            <main class="body">
                <h1>Our services</h1>
                <div>OneReturn allows you to store, categorize, and export all your electronic receipts</div>
            </main>
            <main class="body">
                <h1>About us</h1>
                <div>We are working towards making creation, storage, and management of financial transactions easier for everyone to deal with.</div>
            </main>
            <main class="body">
                <h1>Pricing</h1>
                <p><b>Free</b></p>
                <div>Minimun storage and receipt generation<sup>$0/m*</sup></div>
                <p><b>Freelance</b></p>
                <div>Improved storage and receipt generation<sup>$15/m*</sup></div>
                <p><b>Small Buisiness</b></p>
                <div>Average storage and receipt generation<sup>$60/m*</sup></div>
                <p><b>Medium Buisiness</b></p>
                <div>Decent storage and receipt generation<sup>$150/m*</sup></div>
                <p><b>Enterprise</b></p>
                <div>Large storage and receipt generation<sup>$500/m*</sup></div>
                <p><i>*Price Subject to change</i></p>
            </main>
            <footer className="footer">
                <p>&copy; 2024 OneReturn. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Landing;
