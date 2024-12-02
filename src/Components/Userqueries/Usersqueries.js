import React, { useEffect, useState } from 'react';
import './Usersqueries.css';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../../Firebase';
import { writeBatch} from "firebase/firestore"; 
import emptycart from '../../Assets/emptycart.gif';


function Usersqueries(){
    const [contacts,setcontact]=useState([]);
    const batch = writeBatch(db);
    async function handledeletemessage(indx){
        try{
            const dele=contacts.filter((item,idx)=>idx!==indx);
            setcontact(dele);
            const sfRef = doc(db, "contactus", "F5aO2W2FsP5JcAbMyeHt");
            batch.update(sfRef, {"contact":dele});
            await batch.commit();
        }catch(e){
            console.log('you got an error',e);
            alert('you got an error the meessage');
        }
    }
    useEffect(()=>{
        const unsub = onSnapshot(doc(db, "contactus", "F5aO2W2FsP5JcAbMyeHt"), (doc) => {
            setcontact(doc.data().contact);
        });
        return ()=>unsub();
    },[]);
    return(
        <>
        <div className="about-path">
                    <p>Home / <span>Users Queries</span></p>
        </div>
        {contacts.length===0?
            <div className='wishlist-emptycart-img'>
                <img src={emptycart} alt="emptycart"/>
            </div>:
            <div className='usersquer-con'>
                <div>
                    <div className='usersquer-all-divs'>
                        {contacts.map((item,idx)=>(
                            <div key={idx} className='usersqu-each1'>
                                <div className='usersqu-each1-one'>
                                    <p><span>email:</span>{item.email}, <span>Phone:</span> {item.phone}</p>
                                    <p><span>name:</span>{item.name}, <span>submituser:</span> {item.submitname}</p>
                                    <h1>message:</h1>
                                    <p>{item.message}</p>
                                </div>
                                
                                <button onClick={()=>handledeletemessage(idx)}>Delete</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        }
        </>
    );
}

export default Usersqueries;