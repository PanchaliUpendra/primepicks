import React, { useContext, useState } from 'react';
import './Checkout.css';
import emptycart from '../../Assets/emptycart.gif';
import Mycontext from '../../Mycontext';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4} from 'uuid';
import { db } from '../../Firebase';
import { doc, writeBatch } from 'firebase/firestore';
import { runTransaction } from "firebase/firestore";



function Checkout(){
    const sharedvalue = useContext(Mycontext);
    const navigate= useNavigate();
    const [totalprice,settotalprice] = useState(0);
    const [radiooption,setradiooption]=useState('option1');
    const [paymentgate,setpaymentgate]=useState('gateway1');
    const [carddet,setcarddet] = useState({
        name:'',
        number:'',
        validm:'',
        validd:'',
        cvv:''
    })
    
    const batch = writeBatch(db);


    const [addressdetail,setaddressdetail]=useState({
        adname:'',
        adstreet:'',
        adapart:'',
        adtown:'',
        adphone:'',
        ademail:''
    })

    function handletotalprice(product){
        settotalprice(prev=>prev+(Number(product.price)*Number(product.qty)));
    }

    async function handleorderstore(storeorder){
        try {
            const sfDocRef = doc(db,"orders",'iR5iYFyLYB3T4ZeQMwA4');
            const temppop = await runTransaction(db, async (transaction) => {
              const sfDoc = await transaction.get(sfDocRef);
              if (!sfDoc.exists()) {
                return "Document does not exist!";
              }
          
              const newPopulation = sfDoc.data().orders;
              transaction.update(sfDocRef, { orders:[...newPopulation,storeorder] });
              return "success";
            });
            console.log("successfully added to orders",temppop);
          } catch (e) {
            console.error("main orders failed: ", e);
          }
    }
    async function handlestorestate(){
        try{
            console.log('you entered in handlestatestore');
            return {
                orderid:uuidv4(),
                items:sharedvalue.mycart,
                totalprice:paymentgate==='gateway1'?radiooption==='option1'?totalprice+5:totalprice :0,
                address:addressdetail,
                uid:sharedvalue.isauthed.uid,
                status:"pending"
            }
        }catch(e){
            console.error("you got an error inn handlstorestate",e);
        }
        
    }

    async function handleplaceorder(){
        try{
        if(addressdetail.adname!=='' && addressdetail.adstreet!=='' && addressdetail.adtown!=='' && addressdetail.adphone!=='' && addressdetail.ademail!==''){
            let temp = prompt('enter number between 25 and 99');
            if(temp>=25 && temp<=99){
                const temp_data = await handlestorestate();
                //
                if(temp_data!==''){
                    const sfDocRef = doc(db, "users", sharedvalue.isauthed.uid);
                batch.update(sfDocRef,{
                    "mycart":[],
                    "myorders":[...sharedvalue.myorders,temp_data]
                });
                await batch.commit();
                await handleorderstore(temp_data);
                setaddressdetail({
                    adname:'',
                    adstreet:'',
                    adapart:'',
                    adtown:'',
                    adphone:'',
                    ademail:''
                })
                alert("your order successfull");
                navigate('/');
                }
                

                
            }else{
                alert('sorry try again');
            }


        }else{
            alert('you have to fill the form correctly')
        }
    }
    catch(e){
        console.error('you got an order',e);
    }
    }

    async function cardpayfun(){
        try{
            if(carddet.name!=='' && carddet.number!=='' && carddet.cvv!=='' && carddet.validd!=='' && carddet.validm!==''){
                await handleplaceorder()
            }else{
                alert('please fill the card details perfectly');
            }
        }catch(e){
            alert('you got an error while doing the proceed to pay')
        }
    }

    return(
        <>
            <div className='checkout-con'>
                <div className="about-path">
                    <p>Home / Products / view Cart / <span>CheckOut</span></p>
                </div>
                {sharedvalue.mycart.length===0?
                <div className='wishlist-emptycart-img'>
                    <img src={emptycart} alt="emptycart"/>
                </div>
                :
                <div className='checkout-inner-con'>
                    <div className='checkout-address-form'>
                        <h1>Billing Details</h1>
                        <div className='checkout-address-form-first-div'>
                            <div>
                                <label>First Name*</label>
                                <input type='text' value={addressdetail.adname} onChange={(e)=>setaddressdetail(prev=>({
                                    ...prev,
                                    adname:e.target.value
                                }))}/>
                            </div>
                            <div>
                                 <label>Street Address*</label>
                                <input type='text' value={addressdetail.adstreet} onChange={(e)=>setaddressdetail(prev=>({
                                    ...prev,
                                    adstreet:e.target.value
                                }))}/>
                            </div>
                            <div>
                                <label>Apartment, floor, etc. (optional)</label>
                                <input type='text' value={addressdetail.adapart} onChange={(e)=>setaddressdetail(prev=>({
                                    ...prev,
                                    adapart:e.target.value
                                }))}/>
                            </div>
                            <div>
                                <label>Town/City*</label>
                                <input type='text' value={addressdetail.adtown} onChange={(e)=>setaddressdetail(prev=>({
                                    ...prev,
                                    adtown:e.target.value
                                }))}/>
                            </div>
                            <div>
                                <label>Phone Number*</label>
                                <input type='number' value={addressdetail.adphone} onChange={(e)=>setaddressdetail(prev=>({
                                    ...prev,
                                    adphone:e.target.value
                                }))}/>
                            </div>
                            <div>
                                <label>Email Address*</label>
                                <input type='email' value={addressdetail.ademail} onChange={(e)=>setaddressdetail(prev=>({
                                    ...prev,
                                    ademail:e.target.value
                                }))}/>
                            </div>
                        </div>
                    </div>
                    <div className='checkout-bill-con'>
                        {sharedvalue.mycart.map((item,idx)=>(
                            <div className='checkout-bill-con-each-one' key={idx} onLoad={()=>handletotalprice(item)}>
                                <div>
                                <img src={item.imgurl} alt='pics'/>
                                <p>{item.qty}×{item.name}</p>
                                </div>
                                <p>${Number(item.price)*Number(item.qty)}</p>
                            </div>
                        ))}
                        <div className='checkout-bill-con-each-two'>
                            <p>subtotal:</p>
                            <p>${totalprice}</p>
                        </div>
                        <hr/>
                        <div className='checkout-bill-con-each-two'>
                            <div className='checkout-bill-con-each-two-divs-one'>
                            <p>Shipping:</p>
                            <label>
                            <input type='radio' value='option1' checked={radiooption==='option1'} onChange={()=>setradiooption('option1')}/>
                            Ship To Home(fee:$5)
                            </label>
                            <label>
                            <input type='radio' value='option2' checked={radiooption==='option2'} onChange={()=>setradiooption('option2')}/>
                            Store PickUp(Free)
                            </label>
                            </div>
                        </div>
                        <hr/>
                        <div className='checkout-bill-con-each-two'>
                            <p>Total:</p>
                            <p>${radiooption==='option1'?Number(totalprice)+5:Number(totalprice)}</p>
                        </div>
                        <div>
                        <div className='checkout-bill-con-each-two-divs-one'>
                            <p>Payment Method:</p>
                            <label>
                            <input type='radio' value='gateway1' checked={paymentgate==='gateway1'} onChange={()=>setpaymentgate('gateway1')}/>
                            Cash On Delivery
                            </label>
                            <label>
                            <input type='radio' value='gateway2' checked={paymentgate==='gateway2'} onChange={()=>setpaymentgate('gateway2')}/>
                            Pay With Card
                            </label>
                            {paymentgate==='gateway2' && 
                            <div className='checkout-card-details'>
                                <h1>Card Details:</h1>
                                <div>
                                    <label>Card Number:</label>
                                    <input placeholder='Card Number'type='number' onChange={(e)=>setcarddet(prev=>({
                                        ...prev,
                                        number:e.target.value
                                    }))}/>
                                </div>
                                <div>
                                    <label>Name:</label>
                                    <input placeholder='Name' type='text' onChange={(e)=>setcarddet(prev=>({
                                        ...prev,
                                        name:e.target.value
                                    }))}/>
                                </div>
                                <div>
                                    <div>
                                    <label>valid To</label>
                                    <div>
                                    <input type='number' placeholder="month" onChange={(e)=>setcarddet(prev=>({
                                        ...prev,
                                        validm:e.target.value
                                    }))}/>/<input type='number' placeholder='day' onChange={(e)=>setcarddet(prev=>({
                                        ...prev,
                                        validd:e.target.value
                                    }))}/>
                                    </div>
                                    </div>
                                    <div>
                                    <label>cvv</label>
                                    <input type='number' placeholder='CVV' onChange={(e)=>setcarddet(prev=>({
                                        ...prev,
                                        cvv:e.target.value
                                    }))}/>
                                    </div>
                                </div>
                                <button onClick={()=>cardpayfun()}>proceed to pay</button>
                            </div>}
                            </div>
                        </div>
                        {paymentgate==='gateway1' && <button onClick={()=>handleplaceorder()}>Place Order</button>}
                    </div>

                </div>
                }
                
            </div>
        </>
    );
}

export default Checkout;