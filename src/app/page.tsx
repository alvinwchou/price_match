"use client"
import { db } from "@/firebase";
import axios from "axios";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

type itemsProps = {
  valid_from: string;
};

async function addItemsOfTheWeek(items: itemsProps[], storeName: string) {
  // getting the Grocery Store Ref
  const groceryStoreRef = doc(db, "GroceryStore", storeName);

  // check if we already saved the items of the  week
  // get data from Grocery Store
  const groceryStoreSnapshot = await getDoc(groceryStoreRef);
  const groceryStoreDoc = groceryStoreSnapshot.data();

  // check if this week has already been updated
  if (groceryStoreDoc?.[`${items[0].valid_from}`]) return;

  // check if store exist in database if so update database with flyer items else set database with flyer items
  if (groceryStoreDoc) {
    await updateDoc(groceryStoreRef, {
      [items[0].valid_from]: items,
    });
  } else {
    await setDoc(groceryStoreRef, {
      [items[0].valid_from]: items,
    });
  }
}

export default function Dashboard() {
  // list of primary store name and the store names they price match with
  const storeNames = [
    "no frills",
    "food basics",
    "foody mart",
    "freshco",
    "metro",
    "t&t supermarket",
    "walmart",
  ];

  // make api call to get flyer items of the week from store name
  storeNames.forEach((store) => {
    axios({
      url: `https://backflipp.wishabi.com/flipp/items/search?locale=en-ca&postal_code=M1W2Z6&q=${store}`,
    }).then((apiData) => {
      addItemsOfTheWeek(apiData.data.items, store);
    });
  });

  return <h1>Hi</h1>;
}
