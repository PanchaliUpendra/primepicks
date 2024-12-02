import React, { useContext, useEffect, useState } from 'react';
import './Viewproduct.css';
import { useNavigate, useParams } from 'react-router-dom';
import Mycontext from '../../Mycontext';
import rightarrow from '../../Assets/rightarrow.png';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import stars from '../../Assets/stars.png';
import { db } from '../../Firebase';
import { doc} from 'firebase/firestore';

import { writeBatch} from "firebase/firestore";
import freedelivery from '../../Assets/freedelivery.PNG';
import returndelivery from '../../Assets/returndelivery.PNG';




function Viewproduct(){
    const {id}=useParams()
    const sharedvalue = useContext(Mycontext)
    const navigate = useNavigate();
    const batch = writeBatch(db);

    const [eachitem,seteachitem] = useState([]);
    const [quantity,setquantity]=useState(1);

    

   

    


    async function handlewritewishlist(id){
        try{

            if(sharedvalue.wishlist.includes(id)){
                const batchrf = doc(db, "users", sharedvalue.isauthed.uid);
                batch.update(batchrf,{"wishlist":sharedvalue.wishlist.filter(item=>item!==id)});
                await batch.commit();

            }else{
                const sfDocRef = doc(db, "users", sharedvalue.isauthed.uid);
                batch.update(sfDocRef,{"wishlist":[...sharedvalue.wishlist,id]});
                await batch.commit();
            }
        }catch(e){
            console.error('you got an error while updating the wishlist',e);
        }
    }

    async function handlewritemycart(item,qlty){
        try{

            if(sharedvalue.mycart.includes({
                ...item,qty:qlty
            })){
                console.log('you already added to the cart bangaram')

            }else{
                const sfDocRef = doc(db, "users", sharedvalue.isauthed.uid);
                batch.update(sfDocRef,{"mycart":[...sharedvalue.mycart,{
                    ...item,
                    qty:qlty
                }]});
                await batch.commit();
            }
        }catch(e){
            console.error('you got an error while updating the wishlist',e);
        }
    }

    useEffect(()=>{
        window.scrollTo({top:0,behavior:'smooth'});
    })
    
    return(
        <>
            <div className='viewproduct-con'>
                
                <div>
                {sharedvalue.products.filter((item)=>item.id===id).map((item,idx)=>(
                    <div  onLoad={()=>seteachitem(item.category)}>
                    <div className="about-path">
                    <p>Home / Products / <span>{item.name}</span></p>
                    </div>
                        {/* <div className='flash-items-each-card' key={idx} onLoad={()=>seteachitem(item.category)}>
                            <div className='flash-item-images'>
                            <div className='product-add-wishlist' >
                            </div>
                            <img src={item.imgurl} alt='products'/>
                            <div className='product-add-to-cart-btn' >
                                <h1>
                                    Add To Cart
                                </h1>
                            </div>
                            </div>
                            <div>
                            <h1>{item.name}</h1>
                            <p>₹{item.price}</p>
                            <h3>{item.stars}</h3>
                            </div>
                        </div> */}
                        <div className='viewproduct-each-one-con'>
                            <div className='viewproduct-each-one-con-img-div'>
                                <img src={item.imgurl} alt="item-pic"  className='viewproduct-veiw-img'/>
                            </div>
                            <div>
                                <div className='viewproduct-each-product-header-name'>
                                    <h1>{item.name}</h1>
                                    <div className='viewproduct-each-one-con-img-div-line2'>
                                        <p>{item.stars}</p>
                                        <img src={stars} alt="stars"/>
                                        <p>({item.name.length*8} reviews)</p>
                                        <p>| In stock</p>
                                    </div>
                                    <h2>${item.price}.00</h2>
                                    <p>{item.des}</p>
                                </div>
                                <hr/>
                                <div>
                                    <p>size: <span>{item.size}</span></p>
                                    <div className='viewproduct-each-product-header-name-part2'>
                                        <div>
                                            <p onClick={()=>setquantity(prev=>prev<=1?1:prev-1)}>-</p>
                                            <input type='number' value={quantity} onChange={(e)=>e.target.value>quantity?setquantity(prev=>prev+1):setquantity(prev=>prev<=1?1:prev-1)}/>
                                            <p onClick={()=>setquantity(prev=>prev+1)}>+</p>
                                        </div>
                                        <div onClick={()=>handlewritemycart(item,quantity)}>Add To Cart</div>
                                        <div className='product-add-wishlist' onClick={()=>handlewritewishlist(item.id)}>
                                            {sharedvalue.wishlist.includes(item.id)?(<FavoriteIcon sx={{ color: 'red' }}/>):<FavoriteBorderIcon/>}
                                        </div>
                                    </div>
                                </div>
                                <div className='viewproduct-freedelivery-return'>
                                    <div>
                                        <img src={freedelivery} alt="free delivery"/>
                                        <div>
                                            <p>Free Delivery</p>
                                            <p>Enter your postal code for Delivery Availability</p>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div>
                                         <img src={returndelivery} alt="free delivery"/>
                                        <div>
                                            <p>Return Delivery</p>
                                            <p>Free 30 Days Delivery Returns. Details</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        </div>
                    ))
                    }
                </div>
                <div className='homepage-flash-items'>
                    <div className='homepage-flash-shopo-now'>
                        <div className='homepage-feat-head'>
                            <div></div>
                            <h1>Related Items</h1>
                        </div>
                        <button onClick={()=>navigate('/products')}>View All<img src={rightarrow} alt='rightarrow' className='rightarrow-header'/></button>
                    </div>
                    <div className='homepage-feat-head-kali'></div>
                    <div className='flash-items-all-cards'>
                    {sharedvalue.products.filter(item => item.category===eachitem).map((item,idx)=>(
                        <div className='flash-items-each-card' key={idx} >
                            <div className='flash-item-images'>
                            <div className='product-add-wishlist' onClick={()=>handlewritewishlist(item.id)}>
                                {sharedvalue.wishlist.includes(item.id)?(<FavoriteIcon sx={{ color: 'red' }}/>):<FavoriteBorderIcon/>}
                            </div>
                            <img src={item.imgurl} alt='products' onClick={()=>navigate(`/products/${item.id}`)}/>
                            <div className='product-add-to-cart-btn' onClick={()=>handlewritemycart(item,1)}>
                                <h1>
                                    Add To Cart
                                </h1>
                            </div>
                            </div>
                            <div>
                            <h1>{item.name}</h1>
                            <p>₹{item.price}</p>
                            <h3>{item.stars}<img src={stars} alt='stfarts' className='stars-icon-img'/></h3>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>

            </div>
        </>
    );
}

export default Viewproduct;