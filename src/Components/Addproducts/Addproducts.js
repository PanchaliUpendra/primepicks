import React,{useState}from 'react';
import './Addproducts.css';
import {db, storage} from '../../Firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { doc, runTransaction } from 'firebase/firestore';
import { v4 as uuidv4} from 'uuid';

function Addproducts(){
    const [addpro,setaddpro] = useState({
        name:'',
        price:'',
        stars:'',
        size:'',
        category:'',
        availability:true,
        flashitems:false,
        des:'',
        imgurl:'',
        type:''
    })
    const [propimg,setpropimg]=useState('')
    function handleimageurl(e){
        const file=e.target.files[0]
        setpropimg(file);
    }

    async function handleuploadimage(e){
        e.preventDefault();
        try{
            if(propimg!==''){
                const storageref = ref(storage,propimg.name);
                    await uploadBytes(storageref,propimg);
                    const downloadurl = await getDownloadURL(storageref);
                    setaddpro({
                        ...addpro,
                        imgurl:downloadurl
                    })
                    alert('uploaded the image successfully');
                    console.log('here your downloadurl',downloadurl);
            }
        }catch(e){
            console.error('you got an erro while uploading image',e);
            alert('sorry you got error  while uploading the image')
        }
        
    }

    async function handlesubmitdata(e){
        e.preventDefault();
        try{
            const sfDocRef = doc(db, "products", "Q04OE1daygv34W9nGEpa");
            if(addpro.name!=='' && addpro.price!=='' && addpro.stars!=='' && addpro.category!=='' && addpro.des!=='' && addpro.imgurl!=='' && addpro.size!==''){
                const newPopulation = await runTransaction(db, async (transaction) => {
                    const sfDoc = await transaction.get(sfDocRef);
                    if (!sfDoc.exists()) {
                      return "Document does not exist!";
                    }
                    const newPop = sfDoc.data();
                    const arr=newPop.product;
                      transaction.update(sfDocRef, { product: [...arr,{
                        ...addpro,
                        id:uuidv4()
                      }] });
                      alert('your data added successfully')
                      setaddpro({
                        name:'',
                        price:'',
                        stars:'',
                        size:'',
                        category:'',
                        availability:true,
                        flashitems:false,
                        des:'',
                        type:'',
                        imgurl:''
                      });  
                      return [...arr,{
                        ...addpro,
                        id:uuidv4()
                      }];
                  }); 
                  console.log('we added the data',newPopulation);
                  
            }else{
                alert('please fill the form correctly and you have to click upload after upload the image');
            }
        }catch(e){
            alert('you got error while uploading the data');
            console.error('you got an error while uploading the data',e);
        }
    }

    return(
        <>
        <div className='addproduct-con'>
            <div className="about-path">
                <p>Home / <span>Add Products</span></p>
            </div>
            <div className='addproducts-cards'>
                <div className='addproduct-header'>
                    <h1>add your products here</h1>
                </div>
                <div className='addproduct-con-inner'>
                    <div>
                        <label>name</label>
                        <input type='text' value={addpro.name} onChange={(e)=>setaddpro(prev=>({
                            ...prev,
                            name:e.target.value
                        }))}/>
                    </div>
                    <div>
                        <label>price</label>
                        <input type='number' onChange={(e)=>setaddpro(prev=>({
                            ...prev,
                            price:e.target.value
                        }))} value={addpro.price}/>
                    </div>
                    <div>
                        <label>stars</label>
                        <input type='number' onChange={(e)=>setaddpro(prev=>({
                            ...prev,
                            stars:e.target.value
                        }))} value={addpro.stars}/>
                    </div>
                    <div>
                        <label>size</label>
                        <select value={addpro.size} onChange={(e)=>setaddpro(prev=>({
                            ...prev,
                            size:e.target.value
                        }))} >
                            <option value=''>Select Size</option>
                            <option value="all">All</option>
                            <option value="xl">XL</option>
                            <option value="l">L</option>
                            <option value="m">M</option>
                            <option value="s">S</option>
                        </select>
                    </div>
                    <div>
                        <label>Category</label>
                        <select value={addpro.type} onChange={(e)=>setaddpro(prev=>({
                            ...prev,
                            type:e.target.value
                        }))}>
                            <option value=''>Select Category</option>
                            <option value='clothing'>Clothing</option>
                            <option value='electronics'>Electronics</option>
                            <option value='furniture'>Furniture</option>
                            <option value='appliances'>Appliances</option>
                        </select>
                    </div>
                    <div>
                        <label>Sub-Category</label>
                        <select value={addpro.category} onChange={(e)=>setaddpro(prev =>({
                            ...prev,
                            category:e.target.value
                        }))}>
                            <option value=''>Select SubCategory</option>
                            <option value='femalecollection'>Female Collection</option>
                            <option value='malecollection'>Male Collection</option>
                            <option value='kidsware'>Kids wear</option>
                            <option value='electronics'>Electronics</option>
                            <option value='mobiles'>Mobiles</option>
                            <option value='computer'>computer & laptops</option>
                            <option value='bed'>Bed</option>
                            <option value='tables'>Tables</option>
                            <option value='chairs'>Chairs</option>
                            <option value='sofas'>Sofas</option>
                            <option value='microwaves'>Microwaves</option>
                            <option value='refrigerators'>Refrigerators</option>
                            <option value='coffeemakers'>Coffee Makers</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    
                    <div>
                        <label>Choose Image</label>
                        <div className='addproducts-choose-img-div'>
                            <input type='file' onChange={(e)=>handleimageurl(e)}/>
                            <button onClick={(e)=>handleuploadimage(e)} >upload</button>
                        </div>
                    </div>
                </div>
                <div className='addproducts-textarea'>
                    <textarea placeholder='enter the description of an item ...' onChange={(e)=>setaddpro(prev=>({
                            ...prev,
                            des:e.target.value
                        }))} value={addpro.des}/>
                </div>
                <div className='addproducts-submit-btn'>
                    <button onClick={(e)=>handlesubmitdata(e)}>Submit</button>
                </div>
            </div>
        </div>
        
        </>
    );
}

export default Addproducts;