"use client";

import { db } from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function PriceMatch() {
  const [itemName, setItemName] = useState<string>();

  // get the name of the grocery item in the list
  function handleClick(itemName: string) {
    console.log(itemName);
    setItemName(itemName);
  }

  useEffect(() => {
    console.log("useeffect", itemName);
    getPriceMatchItems(itemName)
      .then((items) => {})
      .catch((error) => {
        console.error("Error fetching price match items:", error);
      });
  }, [itemName]);

  return (
    <div>
      <div>
        <h1>Price Match</h1>
      </div>

      {/* <AddGroceryListItem /> */}

      <GroceryListTable handleClick={handleClick} />
    </div>
  );
}

type GroceryItem = {
  id: string;
  itemName: string;
  checked: boolean;
};

async function GroceryListTable({
  handleClick,
}: {
  handleClick: (itemName: string) => void;
}) {
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
  });

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

function getPriceMatchItems(itemName: string | undefined) {
  // const querySnapshot = await

  // querySnapshot.forEach(doc =>{
  //     console.log(doc.data())
  // })
  return new Promise((resolve, reject) => {
    // create ref to GroceryStore
    const groceryStoreRef = collection(db, "GroceryStore");

    // query for grocery item
    const q = query(groceryStoreRef, where("itemName", "==", itemName));

    getDocs(q)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
        });
        resolve(true);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
