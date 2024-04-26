

import { db } from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import GroceryListTable from "./_component/GroceryListTable";

export default async function PriceMatch() {
//   const [itemName, setItemName] = useState<string>();

//   // get the name of the grocery item in the list
//   function handleClick(itemName: string) {
//     console.log(itemName)
//     test = itemName
//     setItemName(itemName);
//   }

// create GroceryList ref
const groceryListRef = collection(db, "GroceryList");
const groceryListSnapshot = await getDocs(groceryListRef);

const groceryList: GroceryItem[] = [];

groceryListSnapshot.forEach((doc) => {
  const groceryListData = doc.data();

  const groceryListItem = {
    id: doc.id,
    itemName: groceryListData.itemName,
    checked: groceryListData.checked,
  };

  groceryList.push(groceryListItem);
})

  return (
    <div>
      <div>
        <h1>Price Match</h1>
      </div>
      <GroceryListTable groceryList={groceryList} />

      {/* <AddGroceryListItem /> */}

      {/* <GroceryListTable handleClick={handleClick} /> */}

      {/* <PriceMatchItems itemName={itemName} /> */}
    </div>
  );
}

type GroceryItem = {
  id: string;
  itemName: string;
  checked: boolean;
};

// async function GroceryListTable({
//   handleClick,
// }: {
//   handleClick: (itemName: string) => void;
// }) {
//   // create GroceryList ref
//   const groceryListRef = collection(db, "GroceryList");
//   const groceryListSnapshot = await getDocs(groceryListRef);

//   const groceryList: GroceryItem[] = [];

//   groceryListSnapshot.forEach((doc) => {
//     const groceryListData = doc.data();

//     const groceryListItem = {
//       id: doc.id,
//       itemName: groceryListData.itemName,
//       checked: groceryListData.checked,
//     };

//     groceryList.push(groceryListItem);
//   });

//   return (
//     <div className="w-100border-2">
//       {groceryList.map((groceryListItem) => {
//         return (
//           <div
//             key={groceryListItem.id}
//             className="flex justify-between border-8"
//             onClick={() => handleClick(groceryListItem.itemName)}
//           >
//             <p>{groceryListItem.itemName}</p>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

async function PriceMatchItems({ itemName }: { itemName: string | undefined }) {
    // create ref to GroceryStore
    const groceryStoreRef = collection(db, "GroceryStore")

    // query for grocery item
    const q = query(groceryStoreRef, where("itemName", "==", itemName))

    const querySnapshot = await getDocs(q)

    querySnapshot.forEach(doc =>{
        // console.log(doc.data())
    })
  return 
}
