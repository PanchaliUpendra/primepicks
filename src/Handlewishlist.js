import { useContext } from 'react';
import { doc, runTransaction } from 'firebase/firestore';
import Mycontext from './Mycontext';
import { db } from './Firebase';
 function Handlewishlist({id}){
    const sharedvalue = useContext(Mycontext);
    async function handlewritewishlist(){
        try{
            const sfDocRef = doc(db, "products", sharedvalue.isauthed.uid);
            const newPopulation = await runTransaction(db, async (transaction) => {
            const sfDoc = await transaction.get(sfDocRef);
            if (!sfDoc.exists()) {
              return "Document does not exist! wishlist";
            }
            const newPop = sfDoc.data();
            const arr=newPop.wishlist;
              transaction.update(sfDocRef, { wishlist: [...arr,id] });
              return [...arr,id];
          }); 
          console.log('we added the data',newPopulation);
        }catch(e){
            console.error('you got an error while updating the wishlist',e);
        }
    }
    handlewritewishlist();
    
};

export default Handlewishlist;