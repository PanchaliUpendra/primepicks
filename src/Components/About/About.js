import React,{useEffect} from "react";
import './About.css';
import Aboutimg1 from '../../Assets/aboutimg1.PNG';
import Aboutf1 from '../../Assets/aboutf1.PNG';
import Aboutf2 from '../../Assets/aboutf2.PNG';
import Aboutf3 from '../../Assets/aboutf3.PNG';

import Aboutk1 from '../../Assets/aboutk1.PNG';
import Aboutk2 from '../../Assets/aboutk3.PNG';
import Aboutk3 from '../../Assets/aboutk2.PNG';
import Aboutk4 from '../../Assets/aboutk3.PNG';

import Aboutp1 from '../../Assets/aboutp1.PNG';
import Aboutp2 from '../../Assets/aboutp2.PNG';
import Aboutp3 from '../../Assets/aboutp3.PNG';



function About(){
    useEffect(()=>{
        window.scrollTo({top:0,behavior:"smooth"})
    },[]);
    return(
    <>
        <div className="about-con">
            <div className="about-path">
                <p>Home / <span>About</span></p>
            </div>
            {/* about first div */}
            <div className="about-first-div">
                <div className="about-first-first">
                    <h1>Our Story</h1>
                    <p>Launched in 2013, PrimePicks is South Asia’s premier online shopping marketplace with an active 
                        presence in Bangladesh. Supported by a wide range of tailored marketing, data, and service solutions, 
                        PrimePicks has 10,500 sellers and 300 brands, serving 3 million customers across the region.</p>
                    <p>
                    PrimePicks has more than 1 million products to offer, growing at a very fast pace. PrimePicks offers a diverse assortment in categories ranging from consumer goods to lifestyle products.
                    </p>
                </div>
                <div>
                <img src={Aboutimg1} alt="about-first" className="about-first-img"/>
                </div>
            </div>
            {/* about k amount */}
            <div className="about-k-amount">
                <div>
                    <img src={Aboutk1} alt="aboutk1"/>
                    <h1>10.5k </h1>
                    <p>Sellers active our site</p>
                </div>
                <div>
                    <img src={Aboutk2} alt="aboutk1"/>
                    <h1>33k</h1>
                    <p>Monthly Product Sale</p>
                </div>
                <div>
                    <img src={Aboutk3} alt="aboutk1"/>
                    <h1>45.5k</h1>
                    <p>Customer active in our site</p>
                </div>
                <div>
                    <img src={Aboutk4} alt="aboutk1"/>
                    <h1>25k</h1>
                    <p>Annual gross sale in our site</p>
                </div>
            </div>
            {/* about swiper images */}
            <div className="about-swiper-img">
                    <div>
                        <img src={Aboutp1} alt="aboutp"/>
                        <h1>Tom Cruise</h1>
                        <p>Founder & Chairman</p>
                    </div>
                    <div>
                        <img src={Aboutp2} alt="aboutp"/>
                        <h1>Emma Watson</h1>
                        <p>Managing Director</p>
                    </div>
                    <div>
                        <img src={Aboutp3} alt="aboutp"/>
                        <h1>Will Smith</h1>
                        <p>Product Designer</p>
                    </div>
            </div>
            {/* about free delivery */}
            <div className="about-free-delivery">
                <div>
                    <img src={Aboutf1} alt="aboutf" className="aboutf-img"/>
                    <h3>FREE AND FAST DELIVERY</h3>
                    <p>Free delivery for all orders over $140</p>
                </div>
                <div>
                    <img src={Aboutf2} alt="aboutf" className="aboutf-img"/>
                    <h3>24/7 CUSTOMER SERVICE</h3>
                    <p>Friendly 24/7 customer support</p>
                </div>
                <div>
                    <img src={Aboutf3} alt="aboutf" className="aboutf-img"/>
                    <h3>MONEY BACK GUARANTEE</h3>
                    <p>We reurn money within 30 days</p>
                </div>
            </div>
        </div>
    </>);
}

export default About;