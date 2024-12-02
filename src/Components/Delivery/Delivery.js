import React, { useContext, useEffect, useState } from 'react';
import './Delivery.css';
import Mycontext from '../../Mycontext';
import emptycart from '../../Assets/emptycart.gif';
import { doc, runTransaction ,onSnapshot } from "firebase/firestore";
import { db } from '../../Firebase';
import { writeBatch} from "firebase/firestore"; 

function Delivery(){
    const sharedvalue = useContext(Mycontext);
    const sfDocRef = doc(db, "orders", "iR5iYFyLYB3T4ZeQMwA4");
    const batch = writeBatch(db);
    const [allorders,setallorders]=useState([]);

    async function handlecancel(id,iuid){
        try {
            const newPopulation = await runTransaction(db, async (transaction) => {
              const sfDoc = await transaction.get(sfDocRef);
              if (!sfDoc.exists()) {
                return "Document does not exist!";
              }
          
              const remvPop = sfDoc.data().orders.filter(item=>item.orderid===id);
              const newpop = sfDoc.data().orders.filter(item=>item.orderid!==id);
                transaction.update(sfDocRef, { orders:[...newpop,{
                    ...remvPop[0],
                    status:"success"
                }] });
                return "success";
              
            });
            const sfRefup = doc(db, "users",iuid);

            const oldpop=await runTransaction(db, async (transaction) => {
                const sfRef=await transaction.get(sfRefup);
                if (!sfRef.exists()) {
                    return "Document does not exist!";
                }
                const temdata=sfRef.data().myorders.filter(item=>item.orderid===id);
                const temparr=sfRef.data().myorders.filter(item=>item.orderid!==id);
                transaction.update(sfRefup,{myorders:[...temparr,{
                    ...temdata[0],
                    status:"success"
                }]})
            });
          
            console.log("Population increased to ", newPopulation);
            console.log('oldpopulation',oldpop)

        
          } catch (e) {
            // This will be a "population is too big" error.
            console.error(e);
          }
    }

    async function handleremove(id){
        try {
            const newPopulation = await runTransaction(db, async (transaction) => {
              const sfDoc = await transaction.get(sfDocRef);
              if (!sfDoc.exists()) {
                return "Document does not exist!";
              }
              const newpop = sfDoc.data().orders.filter(item=>item.orderid!==id);
                transaction.update(sfDocRef, { orders:newpop });
                return "success";
              
            });
          
            console.log("Population increased to ", newPopulation);
            const sfRef = doc(db, "users",allorders.orders.uid);
            const temp_arr=sharedvalue.myorders.filter(item=>item.orderid!==id);
           

            batch.update(sfRef,{"myorders":temp_arr});
            await batch.commit();
          } catch (e) {
            // This will be a "population is too big" error.
            console.error(e);
          }
    }

    useEffect(()=>{
        const devpro = onSnapshot(doc(db, "orders", "iR5iYFyLYB3T4ZeQMwA4"), (doc) => {
            const resData = doc.data();
            console.log('here is the fetched data: ',resData.orders);
            setallorders(resData.orders);
        });
        return ()=>devpro();
    },[]);
    return(
        <>
            <div className='myorders-con'>
                <div className="about-path">
                        <p>Home / <span>Delivery</span></p>
                </div>
                {
                    allorders.length===0?
                    <div className='wishlist-emptycart-img'>
                        <img src={emptycart} alt="emptycart"/>
                    </div>
                    :
                    <div className='myorders-inner-con'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Products</th>
                                    <th>Status</th>
                                    <th>Modifications</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                            {
                                allorders.length>0 && 
                                allorders.filter((citem)=>citem.status!=='cancel').map((item,idx)=>(
                                    <tr key={idx} className={item.status==="pending"?"myorders-rows-pending":item.status==="success"?"myorders-rows-success":"myorders-rows-cancel"}>
                                        <td>
                                            {item.items.map((prod,idx)=>(
                                                <div key={idx} className='myorders-table-each-row'>
                                                <img src={prod.imgurl} alt="product"/>
                                                <h1>{prod.name}</h1>
                                                <p>{prod.qty}*{prod.price}</p>
                                                </div>
                                            ))}
                                            <p className='myorders-table-row-totalprice'>
                                            Total Price: {item.totalprice}
                                            </p>
                                        </td>
                                        <td>{item.status}</td>
                                        {item.status==="pending"?<td onClick={()=>handlecancel(item.orderid,item.uid)}>Delivered</td>:<td onClick={()=>handleremove(item.orderid)}>Remove</td>}
                                    </tr>
                                ))
                            }
                            </tbody>
                           
                        </table>
                    </div>
                }
                

            </div>
        </>
    );
}

export default Delivery;