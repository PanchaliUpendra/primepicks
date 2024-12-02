import React, { useContext } from 'react';
import './Myorders.css';
import Mycontext from '../../Mycontext';
import emptycart from '../../Assets/emptycart.gif';
import { doc, runTransaction } from "firebase/firestore";
import { db } from '../../Firebase';
import { writeBatch} from "firebase/firestore"; 

function Myorders(){
    const sharedvalue = useContext(Mycontext);
    const sfDocRef = doc(db, "orders", "iR5iYFyLYB3T4ZeQMwA4");
    const batch = writeBatch(db);

    async function handlecancel(id){
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
                    status:"cancel"
                }] });
                return "success";
              
            });
          
            console.log("Population increased to ", newPopulation);
            const sfRef = doc(db, "users",sharedvalue.isauthed.uid);

            const temp_data=sharedvalue.myorders.filter(item=>item.orderid===id);
            const temp_arr=sharedvalue.myorders.filter(item=>item.orderid!==id);
            temp_arr.push({
                ...temp_data[0],
                status:"cancel"
            })

            batch.update(sfRef,{"myorders":temp_arr});
            await batch.commit();
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
            const sfRef = doc(db, "users",sharedvalue.isauthed.uid);
            const temp_arr=sharedvalue.myorders.filter(item=>item.orderid!==id);
           

            batch.update(sfRef,{"myorders":temp_arr});
            await batch.commit();
          } catch (e) {
            // This will be a "population is too big" error.
            console.error(e);
          }
    }
    return(
        <>
            <div className='myorders-con'>
                <div className="about-path">
                        <p>Home / <span>My Orders</span></p>
                </div>
                {
                    sharedvalue.myorders.length===0?
                    <div className='wishlist-emptycart-img'>
                        <img src={emptycart} alt="emptycart"/>
                    </div>
                    :
                    <div className='myorders-inner-con'>
                        <table>
                            <tr>
                                <th>Products</th>
                                <th>Status</th>
                                <th>Modifications</th>
                            </tr>
                            {
                                sharedvalue.myorders.filter((citem)=>citem.status!=='success').map((item,idx)=>(
                                    <tr className={item.status==="pending"?"myorders-rows-pending":item.status==="success"?"myorders-rows-success":"myorders-rows-cancel"} key={idx}>
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
                                            {item.status==='success' && <p className='myorders-para-feedback'>Feedback?</p>}
                                        </td>
                                        <td>{item.status}</td>
                                        {item.status==="pending"?<td onClick={()=>handlecancel(item.orderid)}>Cancel</td>:<td onClick={()=>handleremove(item.orderid)}>Remove</td>}
                                    </tr>
                                ))
                            }
                        </table>
                    </div>
                }
                

            </div>
        </>
    );
}

export default Myorders;