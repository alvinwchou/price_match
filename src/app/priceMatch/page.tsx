"use client";

import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import GroceryListTable from "./_component/GroceryListTable";

type GroceryItem = {
  id: string;
  itemName: string;
  checked: boolean;
  priceMatchedItems?: GroceryStoreItem[];
};

export default async function PriceMatch() {
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
  //   PriceMatchItems("WATERCRESS")
  //   console.log(groceryList)

  GetFilteredGroceryList(groceryList);

  return (
    <div>
      <div>
        <h1>Price Match</h1>
      </div>
      <GroceryListTable groceryList={groceryList} />

      {/* <GroceryListTable handleClick={handleClick} /> */}

      {/* <PriceMatchItems itemName={itemName} /> */}
    </div>
  );
}

async function GetFilteredGroceryList(originalGroceryList: GroceryItem[]) {
  const newGroceryListPromise = originalGroceryList.map(
    async (originalGroceryListItem) => {
      // since CompareGroceryListItemToGroceryStore is an async function it wil return an array of promises we have to await map
      return await CompareGroceryListItemToGroceryStore(
        originalGroceryListItem
      );
    }
  );

  const newGroceryList = await Promise.all(newGroceryListPromise);

  return newGroceryList.filter((item) => item !== null);
}

type GroceryStoreItem = {
  name: string;
  current_price: number;
  merchant_name: string;
  merchant_logo: string;
  post_price_text: string;
  pre_price_text: string;
  valid_from: string;
  valid_to: string;
};

async function CompareGroceryListItemToGroceryStore(
  groceryListItem: GroceryItem
) {
  const newGroceryListItem: GroceryItem = {
    id: groceryListItem.id,
    itemName: groceryListItem.itemName,
    checked: groceryListItem.checked,
  };
  const allStorePriceMatchedItems: GroceryStoreItem[] = [];
  // create ref to GroceryStore
  const groceryStoreRef = collection(db, "GroceryStore");

  // get data from Grocery Store
  const querySnapshot = await getDocs(groceryStoreRef);

  // for each store find items that contain item name
  querySnapshot.forEach((doc) => {
    const groceryStoreDoc = doc.data();

    // priceMatchedItem will be an array with object of the current week to find item names that contain grocery list item
    const storePriceMatchedItems = groceryStoreDoc[
      "2024-04-25T04:00:00+00:00"
    ]?.filter((item: { name: string }) =>
      item.name
        ?.toLowerCase()
        .includes(groceryListItem.itemName.toLocaleLowerCase())
    );

    if (storePriceMatchedItems?.length > 0) {
      // add all store into one variable
      storePriceMatchedItems.forEach((item: GroceryStoreItem) => {
        allStorePriceMatchedItems.push(item);
      });
      // add to newGroceryListItem
      newGroceryListItem.priceMatchedItems = allStorePriceMatchedItems;
    }
  });
  // only return if there is priceMatchedItems
  console.log(groceryListItem.itemName);
  return newGroceryListItem.priceMatchedItems && newGroceryListItem;
}

// pass each groceryListItem in
// check if grocery list items are in this week's flyer
// if it is update groceryList and store flyer item in a new list

// const groceryListItem = {
//     id: doc.id,
//     itemName: groceryListData.itemName,
//     checked: groceryListData.checked,
//     priceMatchedItems:
//   };

// return the item
