import React, { useEffect, useState } from 'react';
import Mycontext from './Mycontext';
import {onAuthStateChanged } from "firebase/auth";
import { auth } from './Firebase';
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from './Firebase';

const Myprovider = ({children})=>{

    const [isauthed,setauthed]=useState({
        islogged:false,
        uid:null,
        person:null,
        isAdmin:false
    });
    const [mobile,setmobile]=useState('')

    const [usr,setusr]=useState({
      profile:{
        name:'',
        email:'',
        phone:'91',
        Address:'xxx xxx'
      }
    });

    const [products,setproducts]=useState([{
      availability: true,
      category: "mobiles",
      des: "The Apple iPhone 14 promises to deliver cutting-edge technology with its advanced features and enhancements, offering users a top-tier mobile experience. With improved performance, camera capabilities, and innovative design, it's set to be a sought-after device for tech enthusiasts.",
      flashitems: true,
      id: "4b45cd53-7832-48d3-9eb8-7ff2daef38ef",
      imgurl: "https://firebasestorage.googleapis.com/v0/b/department-store-9d74e.appspot.com/o/appleiphone14.PNG?alt=media&token=69bc0c29-1375-4004-bf07-4191582f38c6",
      name: "Iphone14",
      price: "59999",
      size: "all",
      stars: "5"
    }]);

    const [wishlist,setwishlist] = useState([]);
    const [mycart,setmycart]=useState([]);
    const [myorders,setmyorders]=useState([]);


    const sharedvalue={
      isauthed:isauthed,
      usr:usr,
      products:products,
      wishlist:wishlist,
      mycart:mycart,
      myorders:myorders,
      mobile:mobile
    }

    // handling the usear admin 
   
    useEffect(()=>{
      let tempuid=null;
      onAuthStateChanged(auth, (user) => { //onauth state change starts from here
        if (user) {
          const uid = user.uid;
          tempuid=uid;
          setauthed(prevstate =>({
            ...prevstate,
            person:user,
            uid:uid,
            islogged:true
          }));

          const usrdocref = doc(db, 'users', uid);
        const userfetchdata = async() =>{
          try{
             await onSnapshot(usrdocref, (doc) => {
            
              const usrdata=doc.data();
              setusr(usrdata);
              setwishlist(usrdata.wishlist);
              setmycart(usrdata.mycart);
              setmyorders(usrdata.myorders);
              setmobile(usrdata.mobile);

          });
          }catch(e){
            console.error('you got error while fetching the user data',e);
          }
        }
  
        userfetchdata();
          

        } else {
            setauthed({
                person:null,
                uid:null,
                islogged:false
              })
        }
      }); // onauth state chnage end here

      const docRef = doc(db, 'isAdmin', 'mv7cYzQicUtst9sG1as0');

      const fetchData = async () => {
        try {
          const docSnap = await getDoc(docRef);
  
          if (docSnap.exists()) {
            const data=docSnap.data();
            for(let i=0;i<data.adminId.length;i++){
              if(data.adminId[i]===tempuid){
                setauthed(prevstate =>({
                  ...prevstate,
                  isAdmin:true
                }));
              }
            }
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching document:', error);
        }
      };
      fetchData();

      // fetching the users DATA  from storage

      const docpro = doc(db, 'products', 'Q04OE1daygv34W9nGEpa');

      const fetchproducts = async () => {
        try {
          const docSnap = await getDoc(docpro);
  
          if (docSnap.exists()) {
            const dataproduct=docSnap.data();
            console.log('here are the products',dataproduct.product)
            setproducts(dataproduct.product);
          } else {
            console.log('No products available!');
          }
        } catch (error) {
          console.error('Error fetching document:', error);
        }
      };
      fetchproducts();

      

      
    },[])
    
      

    return <Mycontext.Provider value={sharedvalue}>
        {children}
    </Mycontext.Provider>
}
export default Myprovider;