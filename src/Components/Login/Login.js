import React, { useEffect, useState } from 'react';
import './Login.css';
import Registerimg from '../../Assets/registerimg.PNG';
import googlelogo from '../../Assets/googleimg.PNG';
import {useNavigate} from 'react-router-dom';
import { signInWithEmailAndPassword ,GoogleAuthProvider,signInWithPopup} from "firebase/auth";
import {auth} from '../../Firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../Firebase';

function Login(){
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();

    const [userinfo,setuserinfo]=useState({
        email:'',
        password:''
    });


    async function handleEmailLogin(){
        try{
            if(userinfo.email!=='' && userinfo.password!==''){
                await signInWithEmailAndPassword(auth, userinfo.email, userinfo.password)
            .then((userCredential) => {
              const user = userCredential.user;
              console.log('particular user',user);
              navigate('/');
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log('errorcode,errormsg',errorCode,errorMessage);
              alert(errorCode);
            });
            }else{
                alert('please fill the form');
            }
            
        }catch(e){
            console.error('you got an error',e);
        }
    }

    async function handleGooglelogin(){
        try{
            await navigate('/');
            const { user } = await signInWithPopup(auth, provider);
            const userDocRef = doc(db, 'users', user.uid);
            const docSnapshot = await getDoc(userDocRef);

            if (docSnapshot.exists()){
                console.log('happy shopping');
            }else{
                await setDoc(doc(db, 'users', user.uid), {
                    profile:{
                        email: user.email,
                        name:user.displayName,
                    },
                    wishlist:[],
                    mycart:[],
                    myorders:[],
                    mycancel:[],
                    history:[]
                  });
                navigate('/');
            }   
        }catch(e){
            console.error('error vachindhi ra babu',e);
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
                    <h1>Log in to PrimePicks</h1>
                    <h3>Enter your details below</h3>
                    
                    <div>
                        <input placeholder='Email' type='text' autoComplete="off" onChange={(e)=>setuserinfo({
                            ...userinfo,
                            email:e.target.value
                        })}/>
                    </div>
                    <div>
                        <input placeholder='Password' type='password' autoComplete="off" onChange={(e)=>setuserinfo({
                            ...userinfo,
                            password:e.target.value
                        })}/>
                    </div>
                   
                    <button onClick={handleEmailLogin}>
                        Log in
                    </button>
                    <p>or</p>
                    <section onClick={handleGooglelogin}>
                        <img src={googlelogo} alt="google-logo" className='google-logo'/>
                        <p>Sign in with Google</p>
                    </section>
                    <p className='login-last-para'>You didn't have an account? <span onClick={()=>navigate('/register')}>Register</span></p>
                </div>
            </div>
        </>
    );
}

export default Login;