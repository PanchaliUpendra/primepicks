import React, { useContext } from 'react';
import './Wishlist.css';
import Mycontext from '../../Mycontext';
import emptycart from '../../Assets/emptycart.gif';
import stars from '../../Assets/stars.png';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { db } from '../../Firebase';
import { doc} from 'firebase/firestore';

import { writeBatch} from "firebase/firestore";
import { useNavigate } from 'react-router-dom';



function Wishlist(){
    const sharedvalue=useContext(Mycontext);
    const batch = writeBatch(db);
    const navigate =  useNavigate();

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

    return(
        <>
            <div className='Wishlist-con'>
                <div className="about-path">
                    <p>Home / <span>Wishlist</span></p>
                </div>
                <div>
                    {sharedvalue.wishlist.length===0?
                    <div className='wishlist-emptycart-img'>
                    <img src={emptycart} alt="emptycart"/>
                    </div>
                    :
                    <div className='products-items-all-cards'>
                    {sharedvalue.products.filter((item,idx)=> sharedvalue.wishlist.includes(item.id)).map((item,idx)=>(
                        <div className='flash-items-each-card' key={idx} onClick={()=>navigate(`/products/${item.id}`)}>
                            <div className='flash-item-images'>
                            <div className='product-add-wishlist' onClick={()=>handlewritewishlist(item.id)}>
                                {sharedvalue.wishlist.includes(item.id)?<FavoriteIcon sx={{ color: 'red' }}/>:<FavoriteBorderIcon/>}
                            </div>
                            <img src={item.imgurl} alt='products'/>
                            {/* <div className='product-add-to-cart-btn'>
                                <h1>
                                    Move to cart
                                </h1>
                            </div> */}
                            </div>
                            <div>
                            <h1>{item.name}</h1>
                            <p>${item.price}</p>
                            <h3>{item.stars}<img src={stars} alt='stfarts' className='stars-icon-img'/></h3>
                            </div>
                        </div>
                    ))}
                    </div>
                    }
                </div>
            </div>
        </>
    );
}

export default Wishlist;