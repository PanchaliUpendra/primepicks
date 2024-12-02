import React from "react";
import './Footer.css';

function Footer(){
    return(
        <>
            <div className="footer-con">
                <div>
                <h1>PrimePicks</h1>
                <p>Subscribe</p>
                </div>
                <div>
                <h1>Support</h1>
                <p>111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh.</p>
                <p>PrimePicks@gmail.com</p>
                <p>+88015-88888-9999</p>
                </div>
                <div>
                <h1>Account</h1>
                <p>My Account</p>
                <p>Login / Register</p>
                <p>Cart</p>
                <p>Wishlist</p>
                <p>Shop</p>
                </div>
                <div>
                <h1>Quick Link</h1>
                <p>Privacy Policy</p>
                <p>Terms Of Use</p>
                <p>FAQ</p>
                <p>Contact</p>
                </div>
            </div>
        </>
    );
}

export default Footer;