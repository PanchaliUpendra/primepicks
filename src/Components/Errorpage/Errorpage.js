import React,{useEffect} from "react";
import './Errorpage.css';

function  Errorpage(){
    useEffect(()=>{
        window.scrollTo({top:0,behavior:"smooth"})
    },[]);
    return(
        <>
            <div className="errorpage-con">
                <div className="about-path">
                    <p>Home / <span>Error</span></p>
                </div>
                <div className="errorpage-content">
                    <h1>404 Not Found</h1>
                    <p>Your visited page not found. You may go home page.</p>
                    <button>Back to home page</button>
                </div>

            </div>
        </>
    );
}

export default Errorpage;