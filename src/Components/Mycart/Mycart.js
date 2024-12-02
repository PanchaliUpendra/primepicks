import React, { useCallback, useContext, useEffect, useState} from 'react';
import './Mycart.css';
import Mycontext from '../../Mycontext';
import emptycart from '../../Assets/emptycart.gif';
import { db } from '../../Firebase';
import { doc, writeBatch } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


function Mycart(){
    const sharedvalue = useContext(Mycontext);
    const navigate = useNavigate();
    const batch = writeBatch(db);

    const [cartitems,setCartItems]=useState([{}]);
    
    const [totalprice,settotalprice]=useState(0);

    const handleQuantityChange = useCallback((productId, newQuantity) => {
        setCartItems(prevItems =>(
          prevItems.map(item =>
            item.id === productId ? { ...item, qty: newQuantity } : item
          ))
        );
      }, []);

      function handletotalprice(product){
        settotalprice((price)=>price+Number(product.qty)*Number(product.price))
      }

      const handleIncrease = (product) => {
        settotalprice((price)=>price+Number(product.price))
        handleQuantityChange(product.id, product.qty + 1);

      };
    
      const handleDecrease = (product) => {
        if (product.qty  > 1) {
            settotalprice((price)=>price-Number(product.price))
            handleQuantityChange(product.id, product.qty  - 1);
        }
      };

      function handledeletecart(product){
        const temp_arr= cartitems.filter((item)=>item.id===product.id);
        for(let i=0;i<temp_arr.length;i++){
            settotalprice((price)=>price-Number(temp_arr[i].price));
        }

        setCartItems(prev=>(
            prev.filter((item)=>item.id!==product.id)
        ));
      }
      function checkequality(arr1,arr2){
        if(JSON.stringify(arr1)===JSON.stringify(arr2)){
            return true;
        }
        return false;
      }

    async function handlewritemycart(){
        try{
            if(checkequality(cartitems,sharedvalue.mycart)){
                alert('you didn\'t change any thing');
            }else{
                const sfDocRef = doc(db, "users", sharedvalue.isauthed.uid);
                batch.update(sfDocRef,{"mycart":cartitems});
                await batch.commit();
                alert('successfully changed the items');
            }
               
            
        }catch(e){
            console.error('you got an error while updating the wishlist',e);
        }
    }

    useEffect(()=>{
        setCartItems(sharedvalue.mycart);
    },[sharedvalue.mycart]);
    return(
        <>
            <div className='mycart-con'>
            <div className="about-path">
                    <p>Home / <span>Mycart</span></p>
            </div>
            {sharedvalue.mycart.length===0?
            <div className='wishlist-emptycart-img'>
                <img src={emptycart} alt="emptycart"/>
            </div>
            :
            <div className='mycart-whole-products'>
                <div className='mycart-product-table'>
                <table>
                    <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        <th>Remove Items</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        cartitems.map((item,idx)=>(
                            <tr onLoad={()=>handletotalprice(item)} key={idx}>
                                <td>
                                    <div className='mycart-image-product'>
                                        <img src={item.imgurl} alt="pics"/>
                                        <p>{item.name}</p>
                                    </div>
                                </td>
                                <td>${item.price}</td>
                                <td className='mycart-qty-input-div'>{item.qty}<input type='number' value={Number(item.qty)} onChange={(e)=>e.target.value>Number(item.qty)?handleIncrease(item):handleDecrease(item)}/></td>
                                <td>${Number(item.price)*Number(item.qty)}</td>
                                <td className='final-td-intr' onClick={()=>handledeletecart(item)}>Remove</td>
                            </tr>))
                    }

                    </tbody>
                </table>

                </div>
                <div className='mycart-savedata-con'>
                    <div className='mycart-savedata-con-div1'>
                        <input type='text' placeholder='Coupon Code'/>
                        <div>
                            Apply Coupon
                        </div>
                    </div>
                    <div className='mycart-savedata-con-div2' >
                        <button onClick={()=>handlewritemycart()}>Save Data</button>
                    </div>
                </div>
                <div className='mycart-step-bills'>
                <div className='mycart-first-step-bill'>
                    <div>
                        <p>Subtotal:</p>
                        <p>${totalprice}</p>
                    </div>
                    <hr/>
                    <div>
                        <p>Shipping:</p>
                        <p>Free</p>
                    </div>
                    <hr/>
                    <div>
                        <p>Total:</p>
                        <p>${totalprice}</p>
                    </div>
                    <section>
                    <button onClick={()=>navigate('/checkout')}>Procees to checkout</button>
                    </section>
                    
                </div>
                </div>
            </div>
            }
            </div>
        </>
    );
}

export default Mycart;