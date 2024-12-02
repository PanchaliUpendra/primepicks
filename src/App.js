import React, { useContext } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

import Login from './Components/Login/Login';
import Register from './Components/Login/Register';
import About from './Components/About/About';
import Contact from './Components/Contact/Contact';
import Errorpage from './Components/Errorpage/Errorpage';
import Homepage from './Components/Homepage/Homepage';
import Footer from './Components/Footer/Footer';
import Mycontext from './Mycontext';
import Addproducts from './Components/Addproducts/Addproducts';
import Profile from './Components/Profile/Profile';
import Products from './Components/Products/Products';
import Wishlist from './Components/Wishlist/Wishlist';
import Mycart from './Components/Mycart/Mycart';
import Viewproduct from './Components/Viewproduct/Viewproduct';
import Checkout from './Components/Checkout/Checkout';
import Myorders from './Components/Myorders/Myorders';
import Usersqueries from './Components/Userqueries/Usersqueries';
import Delivery from './Components/Delivery/Delivery';

function App() {
  
  const sharedvalue = useContext(Mycontext);

  return (
    <BrowserRouter>
      <div className="App">
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Homepage/>}/>
        {sharedvalue.isauthed.islogged ?<></>:<Route path='/login' element={<Login/>}/> }
        {sharedvalue.isauthed.islogged ?<></>:<Route path='/Register' element={<Register/>}/> }
        {sharedvalue.isauthed.islogged ?<Route path='/profile' element={<Profile/>}/>:<></> }
        {sharedvalue.isauthed.islogged ?<Route path='/wishlist' element={<Wishlist/>}/>:<></> }
        {sharedvalue.isauthed.islogged ?<Route path='/mycart' element={<Mycart/>}/>:<></> }
        {sharedvalue.isauthed.islogged ?<Route path='/checkout' element={<Checkout/>}/>:<></>}
        {sharedvalue.isauthed.islogged ?<Route path='/myorders' element={<Myorders/>}/>:<></>}
        {sharedvalue.isauthed.islogged &&  sharedvalue.isauthed.isAdmin &&  <Route path='/addproducts' element={<Addproducts/>}/>}
        {sharedvalue.isauthed.islogged &&  sharedvalue.isauthed.isAdmin &&  <Route path='/usersqueries' element={<Usersqueries/>}/>}
        {sharedvalue.isauthed.islogged &&  sharedvalue.isauthed.isAdmin &&  <Route path='/delivery' element={<Delivery/>}/>}
        <Route path='/products' element={<Products/>}/>
        <Route path='/products/:id' element={<Viewproduct/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/*' element={<Errorpage/>}/>
        
      </Routes>
      <Footer/>
    </div>
    </BrowserRouter>
  );
}

export default App;
