import React,{useEffect, useState} from 'react';
import './Login.css';
import Registerimg from '../../Assets/registerimg.PNG';
import googlelogo from '../../Assets/googleimg.PNG';
import {useNavigate} from 'react-router-dom';

import { getAuth, createUserWithEmailAndPassword, signInWithPopup} from "firebase/auth";
import {app} from '../../Firebase';
import { doc, setDoc } from "firebase/firestore";
import { db } from '../../Firebase';

import { GoogleAuthProvider } from "firebase/auth";

function Register(){
    const navigate = useNavigate();
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [userdata,setuserdata] =useState({
        email:'',
        password:'',
        cofmpassword:'',
        name:'',
        phone:''
    })

    async function handleregister(e){
        e.preventDefault();
        try{
        if(userdata.email!=='' && userdata.password.length>=6 && userdata.password===userdata.cofmpassword && userdata.name!=='' && userdata.phone!==''){
            createUserWithEmailAndPassword(auth, userdata.email, userdata.password)
            .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log('here is the user',user)
            setDoc(doc(db, 'users', user.uid), {
                profile:{
                    email: user.email,
                    name:userdata.name,
                },
                wishlist:[],
                mycart:[],
                myorders:[],
                mycancel:[],
                history:[],
                phone:userdata.phone
              });
            navigate('/')
             })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('here is the code and error',errorCode,errorMessage);
                alert(errorCode);
                // ..
            });
        }else{
            alert('please fill the form correctly');
        }
    }catch(e){
        console.error('you got error while register',e);
        alert('you got error while register');
    }
        
    }

    async function handleregistergoogle(e){
        e.preventDefault();
        try{
            signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                setDoc(doc(db, 'users', user.uid), {
                    profile:{
                        email: user.email,
                        name:  user.displayName,
                    },
                    wishlist:[],
                    mycart:[],
                    myorders:[],
                    mycancel:[],
                    history:[]
                  });
                console.log('the execess token is ',token);
                navigate('/')
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log('the error code are',errorCode,errorMessage,email,credential);
                alert(errorCode);
            });
        }catch(e){
            console.error('you got error while registering with google',e);
            alert('you got error while registering with google');
        }
                
    }

    useEffect(()=>{
        window.scrollTo({top:0,behavior:"smooth"})
    },[]);
    return(
        <>
            <div className='login-con'>
                <div className='login-img-con'>
                    <img src={Registerimg} alt="register-logo" className='register-img-con'/>
                </div>
                <div className='login-form'>
                    <h1>Create an account</h1>
                    <h3>Enter your details below</h3>
                    <div>
                        <input placeholder='Name' type='text'  autoComplete="off" onChange={(e)=>setuserdata({
                            ...userdata,
                            name:e.target.value
                        })}/>
                    </div>
                    <div>
                        <input placeholder='Email' type='text' autoComplete="off" onChange={(e)=>setuserdata({
                            ...userdata,
                            email:e.target.value
                        })}/>
                    </div>
                    <div>
                        <input placeholder='Phone' type='number' autoComplete="off" onChange={(e)=>setuserdata({
                            ...userdata,
                            phone:e.target.value
                        })}/>
                    </div>
                    <div>
                        <input placeholder='Password' type='password' autoComplete="off" onChange={(e)=>setuserdata({
                            ...userdata,
                            password:e.target.value
                        })}/>
                    </div>
                    <div>
                        <input placeholder='Cofirm Password' type='password' autoComplete="off"  onChange={(e)=>setuserdata({
                            ...userdata,
                            cofmpassword:e.target.value
                        })}/>
                    </div>
                    <button onClick={(e)=>handleregister(e)}>
                    Create Account
                    </button>
                    <p>or</p>
                    <section onClick={(e)=>handleregistergoogle(e)}>
                        <img src={googlelogo} alt="google-logo" className='google-logo'/>
                        <p>Sign up with Google</p>
                    </section>
                    <p className='login-last-para'>You have already have an account? <span onClick={()=>navigate('/login')}>Login</span></p>
                </div>
            </div>
        </>
    );
}

export default Register;