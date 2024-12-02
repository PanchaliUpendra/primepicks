import React, { useRef, useState } from 'react';
import './Homepage.css';

import Aboutf1 from '../../Assets/aboutf1.PNG';
import Aboutf2 from '../../Assets/aboutf2.PNG';
import Aboutf3 from '../../Assets/aboutf3.PNG';

import featurei1 from '../../Assets/featurei1.PNG';
import featurei2 from '../../Assets/featurei2.PNG';
import featurei3 from '../../Assets/featurei3.PNG';
import featurei4 from '../../Assets/featurei4.PNG';

import cate1 from '../../Assets/catei1.PNG';
import cate2 from '../../Assets/catei2.PNG';
import cate3 from '../../Assets/catei3.PNG';
import cate4 from '../../Assets/catei4.PNG';
import cate5 from '../../Assets/catei5.PNG';

import stars from '../../Assets/stars.png';
import { useContext } from 'react';

import Mycontext from '../../Mycontext';

import iphoneicon from '../../Assets/iphoneicon.png';
import rightarrow from '../../Assets/rightarrow.png';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';


import { useNavigate } from 'react-router-dom';

import { db } from '../../Firebase';
import { doc} from 'firebase/firestore';

import { writeBatch} from "firebase/firestore";






function Homepage(){
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const ref4 = useRef(null);

    const [refactive,setrefactive]=useState('ref1');

    const handleScrollIntoView = (ref,rstr) => {
        ref.current.scrollIntoView({left:0, behavior: 'smooth' });
        setrefactive(rstr);
       
      };

    const sharedvalue = useContext(Mycontext);
    const navigate = useNavigate();
    const batch = writeBatch(db);

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

    async function handlewritemycart(item){
        try{

            if(sharedvalue.mycart.includes({
                ...item,qty:1
            })){
                console.log('you already added to the cart bangaram')

            }else{
                const sfDocRef = doc(db, "users", sharedvalue.isauthed.uid);
                batch.update(sfDocRef,{"mycart":[...sharedvalue.mycart,{
                    ...item,
                    qty:1
                }]});
                await batch.commit();
            }
        }catch(e){
            console.error('you got an error while updating the wishlist',e);
        }
    }


    return(
        <>
            <div className='homepage-con'>
                <div className='homepage-cur-con'>
                       
                        <div className='homepage-cursole-div hom-cur-d1' ref={ref1} >
                            <div className='homepage-cursole-div1-c1'>
                                <img src={iphoneicon} alt='iphone-icon' className='iphone-icon-img'/>
                                <p>iPhone 14 Series</p>
                            </div>
                            <h1>Up to 10% off Voucher</h1>
                            <div className='shop-now-arrow' onClick={()=>navigate('/products')}>
                                <p>Shop Now</p>
                                <img src={rightarrow} alt='rightarrow' className='rightarrow-header'/>
                            </div>
                        </div>
                        <div className='homepage-cursole-div hom-cur-d2' ref={ref2} >
                        <div className='homepage-cursole-div1-c1'>
                                {/* <img src={iphoneicon} alt='iphone-icon' className='iphone-icon-img'/> */}
                                <p>Female Collection</p>
                            </div>
                            <h1>Up to 10% off Voucher</h1>
                            <div className='shop-now-arrow' onClick={()=>navigate('/products')}>
                                <p>Shop Now</p>
                                <img src={rightarrow} alt='rightarrow' className='rightarrow-header'/>
                            </div>
                        </div>
                       <div className='homepage-cursole-div hom-cur-d3' ref={ref3}  >
                       <div className='homepage-cursole-div1-c1'>
                                <img src={iphoneicon} alt='iphone-icon' className='iphone-icon-img'/>
                                <p>Laptops</p>
                            </div>
                            <h1>Up to 10% off Voucher</h1>
                            <div className='shop-now-arrow' onClick={()=>navigate('/products')}>
                                <p>Shop Now</p>
                                <img src={rightarrow} alt='rightarrow' className='rightarrow-header'/>
                            </div>
                       </div>
                        <div className='homepage-cursole-div hom-cur-d5' ref={ref4} > 
                            <div className='homepage-cursole-div1-c1'>
                                {/* <img src={iphoneicon} alt='iphone-icon' className='iphone-icon-img'/> */}
                                <p>Male Collection</p>
                            </div>
                            <h1>Up to 10% off Voucher</h1>
                            <div className='shop-now-arrow' onClick={()=>navigate('/products')}>
                                <p>Shop Now</p>
                                <img src={rightarrow} alt='rightarrow' className='rightarrow-header'/>
                            </div>
                            </div>
                </div>
                <div className='homepage-cur-scon'>
                    <ul> 
                        <li onClick={()=>handleScrollIntoView(ref1,'ref1')} className={refactive==='ref1'?'cur-active':'cur-inactive'}></li>
                        <li onClick={()=>handleScrollIntoView(ref2,'ref2')} className={refactive==='ref2'?'cur-active':'cur-inactive'}></li>
                        <li onClick={()=>handleScrollIntoView(ref3,'ref3')} className={refactive==='ref3'?'cur-active':'cur-inactive'}></li>
                        <li onClick={()=>handleScrollIntoView(ref4,'ref4')} className={refactive==='ref4'?'cur-active':'cur-inactive'}></li>
                    </ul>
                </div>
                {/* flash items goes here */}
                <div className='homepage-flash-items'>
                    <div className='homepage-flash-shopo-now'>
                        <div className='homepage-feat-head'>
                            <div></div>
                            <h1>Today’s</h1>
                        </div>
                        <button onClick={()=>navigate('/products')}>View All<img src={rightarrow} alt='rightarrow' className='rightarrow-header'/></button>
                    </div>
                    
                    <h1 className='browse-by-cate-header'>Flash Sales</h1>
                    <div className='flash-items-all-cards'>
                    {sharedvalue.products.filter(item => item.flashitems===true).map((item,idx)=>(
                        <div className='flash-items-each-card' key={idx} >
                            <div className='flash-item-images'>
                            <div className='product-add-wishlist' onClick={()=>handlewritewishlist(item.id)}>
                                {sharedvalue.wishlist.includes(item.id)?(<FavoriteIcon sx={{ color: 'red' }}/>):<FavoriteBorderIcon/>}
                            </div>
                            <img src={item.imgurl} alt='products' onClick={()=>navigate(`/products/${item.id}`)}/>
                            <div className='product-add-to-cart-btn' onClick={()=>handlewritemycart(item)}>
                                <h1>
                                    Add To Cart
                                </h1>
                            </div>
                            </div>
                            <div>
                            <h1>{item.name}</h1>
                            <p style={{color:'#DB4444'}}>${item.price}</p>
                            <h3>{item.stars}<img src={stars} alt='stfarts' className='stars-icon-img'/></h3>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>

                {/* Browse By Category */}
                <div className='browse-by-cate'>
                    <hr/>
                    <div className='homepage-feat-head'>
                        <div></div>
                        <h1>categories</h1>
                    </div>
                    <h1 className='browse-by-cate-header'>Browse By Category</h1>
                    <div className='browse-by-cate-div-part'>
                        <div>
                            <img src={cate1} alt="cate1" className='browse-by-cate-img'/>
                            <p>phones</p>
                        </div>
                        <div>
                            <img src={cate2} alt="cate1" className='browse-by-cate-img'/>
                            <p>computers</p>
                        </div>
                        <div>
                            <img src={cate3} alt="cate1" className='browse-by-cate-img'/>
                            <p>smartwatch</p>
                        </div>
                        <div>
                            <img src={cate4} alt="cate1" className='browse-by-cate-img'/>
                            <p>head phones</p>
                        </div>
                        <div>
                            <img src={cate5} alt="cate1" className='browse-by-cate-img'/>
                            <p>gaming</p>
                        </div>
                    </div>
                    <hr/>
                </div>
                {/* flash items goes here */}
                <div className='homepage-flash-items'>
                    <div className='homepage-flash-shopo-now'>
                        <div className='homepage-feat-head'>
                            <div></div>
                            <h1>This Month</h1>
                        </div>
                        <button onClick={()=>navigate('/products')}>View All<img src={rightarrow} alt='rightarrow' className='rightarrow-header'/></button>
                    </div>
                    <h1 className='browse-by-cate-header'>Best Selling Products</h1>
                    <div className='flash-items-all-cards'>
                    {sharedvalue.products.filter((item,idx)=> item.flashitems!==true && idx<10).map((item,idx)=>(
                        <div className='flash-items-each-card' key={idx} >
                            <div className='flash-item-images'>
                            <div className='product-add-wishlist' onClick={()=>handlewritewishlist(item.id)}>
                                {sharedvalue.wishlist.includes(item.id)?<FavoriteIcon sx={{ color: 'red' }}/>:<FavoriteBorderIcon/>}
                            </div>
                            <img src={item.imgurl} alt='products' onClick={()=>navigate(`/products/${item.id}`)}/>
                            <div className='product-add-to-cart-btn' onClick={()=>handlewritemycart(item)}>
                                <h1>
                                    Add To Cart
                                </h1>
                            </div>
                            </div>
                            <div>
                            <h1>{item.name}</h1>
                            <p>${item.price}</p>
                            <h3>{item.stars}<img src={stars} alt='stfarts' className='stars-icon-img'/></h3>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>


                {/* enhance music experience */}
                <div className='enhance-music-homepage'>
                    <p>categories</p>
                    <h1>Enhance Your</h1>
                    <h1>music experience</h1>
                </div>

                {/* flash items goes here */}
                <div className='homepage-flash-items'>
                    <div className='homepage-feat-head'>
                        <div></div>
                        <h1>Our Products</h1>
                    </div>
                    <h1 className='browse-by-cate-header'>Explore Our Products</h1>
                    <div className='flash-items-all-cards'>
                    {sharedvalue.products.filter((item,idx)=> item.flashitems!==true && idx>=10 && idx<=25).map((item,idx)=>(
                        <div className='flash-items-each-card' key={idx} >
                            <div className='flash-item-images'>
                            <div className='product-add-wishlist' onClick={()=>handlewritewishlist(item.id)}>
                                {sharedvalue.wishlist.includes(item.id)?<FavoriteIcon sx={{ color: 'red' }}/>:<FavoriteBorderIcon/>}
                            </div>
                            <img src={item.imgurl} alt='products' onClick={()=>navigate(`/products/${item.id}`)}/>
                            <div className='product-add-to-cart-btn' onClick={()=>handlewritemycart(item)}>
                                <h1>
                                    Add To Cart
                                </h1>
                            </div>
                            </div>
                            <div>
                            <h1>{item.name}</h1>
                            <p>${item.price}</p>
                            <h3>{item.stars}<img src={stars} alt='stfarts' className='stars-icon-img'/></h3>
                            </div>
                        </div>
                    ))}
                    </div>
                    <button className='our-products-view-all-btn' onClick={()=>navigate('/products')}> view All Products <img src={rightarrow} alt='rightarrow' className='rightarrow-header'/></button>
                </div>
                {/* homepage features */}
                <div className='homepage-feat-con'>
                    <div className='homepage-feat-head'>
                        <div></div>
                        <h1>featured</h1>
                    </div>
                    <h1>New Arrival</h1>
                    <div className='homepage-img-features'>
                        <div className='homepage-img-features-d1'>
                            <img src={featurei1} alt='featured'/>
                        </div>
                        <div className='homepage-img-features-d2'>
                            <div className='homepage-img-features-d3'>
                            <img src={featurei2} alt='featured'/>
                            </div>
                            <div className='homepage-img-features-d4'>
                                <div>
                                <img src={featurei3} alt='featured'/>
                                </div>
                                <div>
                                <img src={featurei4} alt='featured'/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* about free delivery */}
                <div className="about-free-delivery">
                    <div>
                        <img src={Aboutf1} alt="aboutf" className="aboutf-img"/>
                        <h3>FREE AND FAST DELIVERY</h3>
                        <p>Free delivery for all orders over $140</p>
                    </div>
                    <div>
                        <img src={Aboutf2} alt="aboutf" className="aboutf-img"/>
                        <h3>24/7 CUSTOMER SERVICE</h3>
                        <p>Friendly 24/7 customer support</p>
                    </div>
                    <div>
                        <img src={Aboutf3} alt="aboutf" className="aboutf-img"/>
                        <h3>MONEY BACK GUARANTEE</h3>
                        <p>We reurn money within 30 days</p>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Homepage;