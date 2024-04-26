"use client"

import { db } from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

type GroceryItem = {
  id: string;
  itemName: string;
  checked: boolean;
};

type GroceryListProps = {
  groceryList: GroceryItem[];
};

export default function GroceryListTable({ groceryList }: GroceryListProps) {
  const [itemName, setItemName] = useState<string>();

  // get the name of the grocery item in the list
  function handleClick(itemName: string) {
    console.log(itemName);
    setItemName(itemName);
  }

//   useEffect(()=>{

//     async function test() {

//         // create ref to GroceryStore
//         const groceryStoreRef = collection(db, "GroceryStore")
   
//         // query for grocery item
//         const q = query(groceryStoreRef, where("itemName", "==", itemName))
    
//         const querySnapshot = await getDocs(q)
    
//         querySnapshot.forEach(doc =>{
//             // console.log(doc.data())
//         })
//     }
//     test()
//   },[])

  return (
    <div className="w-100border-2">
      {groceryList.map((groceryListItem) => {
        return (
          <div
            key={groceryListItem.id}
            className="flex justify-between border-8"
            onClick={() => handleClick(groceryListItem.itemName)}
          >
            <p>{groceryListItem.itemName}</p>
          </div>
        );
      })}
    </div>
  );
}
