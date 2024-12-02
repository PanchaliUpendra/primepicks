import React, { useContext, useState } from 'react';
import './Navbar.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Mycontext from '../../Mycontext';
import { signOut,onAuthStateChanged } from "firebase/auth";
import {auth} from '../../Firebase';
import Badge from '@mui/material/Badge';

function Navbar(){
    const [sidenav,setsidenav]=useState(false);
    const [profilenav,setprofilenav]=useState(false);
    const sharedvalue = useContext(Mycontext);

    const navigate =useNavigate();

    //handle future not logged in
    async function handlefuturesnotlogin(){
        try{
            alert('you have to login first');
            navigate('/login')
        }
        catch(e){
            console.error('you got an error while future accessing',e);
        }
    }

    // handleprofile
    function handleprofilebar(){
        setprofilenav(profilestat=>!profilestat);
    }

    // handleCheckboxChange
    const handleCheckboxChange = () => {
        setsidenav(sidenav=>!sidenav);
      }

    // handle signout
    async function handlesignout(){
        try{
            signOut(auth).then(() => {
               console.log('successfully signed out');

               //onAuthStateChanged
               onAuthStateChanged(auth, (user) => {
                    if (user) {
                        console.log('successfully signed in')
                    } else {
                          console.log('sharedvalue goes here',sharedvalue.isauthed)
                    }
                });

               navigate('/login');

              }).catch((error) => {
                console.error('you got an error  while sign out',error);
              });
        }catch(e){
            console.error('you got an error  while sign out');
            alert('you got an error')
        }
    }

    //badge customised color
    
    return(
        <>
            <div className='nav-con'>
                <h1 onClick={()=>navigate('/')}>PrimePicks</h1>
                <ul>
                    <NavLink to='/' activeClassName='active'><li>Home</li></NavLink>
                    <NavLink to='/products' activeClassName='active'><li>products</li></NavLink>
                    <NavLink to='/contact' activeClassName='active'><li>Contact</li></NavLink>
                    <NavLink to='/about' activeClassName='active'><li>About</li></NavLink>
                </ul>
                <div className='nav-icon-con'>
                {sharedvalue.isauthed.islogged?
                    <Badge badgeContent={sharedvalue.wishlist.length} color="error">
                    <FavoriteBorderIcon onClick={()=>navigate('/wishlist')}/>
                    </Badge>:<FavoriteBorderIcon onClick={handlefuturesnotlogin}/>}
                    {sharedvalue.isauthed.islogged?
                    <Badge badgeContent={sharedvalue.mycart.length} color="error">
                    <ShoppingCartIcon onClick={()=>navigate('/mycart')}/>
                    </Badge>:<ShoppingCartIcon onClick={handlefuturesnotlogin}/>}
                
                {sharedvalue.isauthed.islogged?<PersonOutlineIcon onClick={handleprofilebar}/>:<NavLink to='/login'><p>Login</p></NavLink>}
                {sharedvalue.isauthed.islogged &&
                    <div className={profilenav?'profile-navbar':'inactive-profile-nav'}>
                        <ul>
                            <li onClick={()=>{
                            handleprofilebar();
                            navigate('/profile')}}>Profile</li>
                            <li onClick={()=>{
                            handleprofilebar();
                            navigate('/myorders')}}>MyOrders</li>  
                            {sharedvalue.isauthed.islogged && sharedvalue.isauthed.isAdmin && <li onClick={()=>{
                            handleprofilebar();
                            navigate('/addproducts')}}>Add Products</li>}
                            {sharedvalue.isauthed.islogged && sharedvalue.isauthed.isAdmin && <li onClick={()=>{
                            handleprofilebar();
                            navigate('/usersqueries')}}>Users Query</li>}
                            {sharedvalue.isauthed.islogged && sharedvalue.isauthed.isAdmin && <li onClick={()=>{
                            handleprofilebar();
                            navigate('/delivery')}}>Delivery</li>}
                            <li onClick={handlesignout}>SignOut</li>
                        </ul>
                    </div>
                }
                </div>
                <div className='nav-icon-overall-con'>
                <div className="switch">
                    <input type="checkbox" checked={sidenav} onChange={handleCheckboxChange}/>
                    <div>
                        <span className="line-1"></span>
                        <span className="line-2"></span>
                        <span className="line-3"></span>
                    </div>
                    </div>
                </div>
                
                
                <div className={sidenav?'side-nav':'side-nav-inactive'}>
                <ul>
                    <li>Home</li>
                    <li>products</li>
                    <li>wishlist</li>
                    <li>cart</li>
                    <li>About</li>
                    <li>Contact</li>
                    {sharedvalue.isauthed.islogged?<li>Profile</li>:<NavLink to='/login' onClick={handleCheckboxChange}><li>Login</li></NavLink>}
                </ul>
            </div>

           
            </div>
           
        </>
    );
}

export default Navbar;