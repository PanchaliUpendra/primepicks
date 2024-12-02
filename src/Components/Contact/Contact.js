import React,{useContext, useEffect, useState} from "react";
import './Contact.css';
import Mycontext from '../../Mycontext';
import contactimg1 from '../../Assets/contactimg1.PNG';
import contactimg2 from '../../Assets/contactimg2.PNG';
import { doc, runTransaction } from "firebase/firestore";
import {db} from '../../Firebase';


function Contact(){
    const sharedvalue = useContext(Mycontext);
    const [usercontact,setusercontact]=useState({
        name:'',
        phone:'',
        email:'',
        message:'',
        uid:sharedvalue.isauthed.uid,
        submitname:sharedvalue.usr.profile.name
    })

    async function handlesubmitdata(){
        try{
            if(usercontact.name!=='' && usercontact.phone!=='' && usercontact.email && usercontact.message!==''){
                const sfDocRef = doc(db,"contactus","F5aO2W2FsP5JcAbMyeHt");
                const newPopulation = await runTransaction(db, async (transaction) => {
                const sfDoc = await transaction.get(sfDocRef);
                if (!sfDoc.exists()) {
                  return "Document does not exist!";
                }
            
                const newPop = sfDoc.data().contact;


                if (newPop.length>=0) {
                  transaction.update(sfDocRef, { contact:[...newPop,usercontact] });
                  alert('ok successfully completed');
                  setusercontact({
                    name:'',
                    phone:'',
                    email:'',
                    message:'',
                    uid:sharedvalue.isauthed.uid,
                    submitname:sharedvalue.usr.profile.name
                })
                  return newPop;
                } else {
                  return Promise.reject("Sorry! you got error big");
                }
              });
              console.log('here new data  is ',newPopulation);
            }else{
                alert('please fill the form correctly');
            }
            
        }catch(e){
            console.error('you got error while submiting',e);
            alert('you got error while submitting');
        }
    }
    
    useEffect(()=>{
        window.scrollTo({top:0,behavior:"smooth"})
    },[]);
    return(
        <>
        <div className="contact-con">
            <div className="about-path">
                <p>Home / <span>Contact</span></p>
            </div>
            <div className="contact-info">
                <div className="contact-info-call">
                    <div className="contact-info-call-one">
                        <div className="contact-info-call-header">
                        <img src={contactimg1} alt="contactimg1" className="contact-info-call-img"/>
                        <p>Call To Us</p>
                        </div>
                        <p>We are available 24/7, 7 days a week.</p>
                        <p>Phone: +8801611112222</p>
                    </div>
                    <hr/>
                    <div className="contact-info-call-one">
                        <div className="contact-info-call-header">
                        <img src={contactimg2} alt="contactimg2" className="contact-info-call-img"/>
                        <p>Write To US</p>
                        </div>
                        <p>Fill out our form and we will contact you within 24 hours.</p>
                        <p>Emails: customer@exclusive.com</p>
                        <p>Emails: support@exclusive.com</p>
                    </div>
                </div>
                <div className="contact-info-form">
                    <div className="contact-info-form-first">
                        <input type="text" placeholder="Your Name*" onChange={(e)=>setusercontact(prev=>({
                            ...prev,
                            name:e.target.value
                        }))}/>
                        <input type="email" placeholder="Your Email*" onChange={(e)=>setusercontact(prev=>({
                            ...prev,
                            email:e.target.value
                        }))}/>
                        <input type="number" placeholder="Your Number*" onChange={(e)=>setusercontact(prev=>({
                            ...prev,
                            phone:e.target.value
                        }))}/>
                    </div>
                    <textarea placeholder="Your Massage" onChange={(e)=>setusercontact(prev=>({
                            ...prev,
                            message:e.target.value
                        }))}/>
                    <div className="message-submit-btn">
                        <button onClick={handlesubmitdata}>Send Massage</button>
                    </div>
                </div>

            </div>
        </div>
        </>
    );
}

export default  Contact;