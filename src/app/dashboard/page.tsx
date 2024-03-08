"use client";

import { getDatabase, onValue, ref, remove } from "firebase/database";
import firebase from "../../firebase";
import { useEffect, useState } from "react";
import Link from "next/link";
import GroceryItem from "@/components/GroceryItem";
import OnSaleList from "@/components/OnSaleList";
import { Console } from "console";

type GroceryItem = {
  key: string
  groceryItem: {
    itemName: string
  }
}

export default function Dashboard() {
  const [groceryList, setGroceryList] = useState<GroceryItem[]>([]);

  useEffect(() => {
    // create a variable to hold our db details
    const database = getDatabase(firebase);

    // create a variable that makes reference to our database
    const dbRef = ref(database);

    // add event listener to that variable that will fire from the db, and call that data 'response'
    onValue(dbRef, (response) => {
      // create a variable to store the new state we want to introduce to our app
      const newState = [];

      // store the response from our query to Firebase inside of a variable
      const data = response.val();

      // data is an object, iterate through it using for in loop to access each item
      for (let key in data) {
        newState.push({ key: key, groceryItem: data[key] });
      }

      setGroceryList(newState);
    });
  }, []);

  return (
    <>
      <header className="flex justify-center">
        <h1 className="text-5xl">PRICE MATCH</h1>
      </header>
      <div className="grid grid-cols-3 gap-10 max-w-6xl m-auto">

        {/* Grocery List */}
        <div className="rounded my-10 bg-white w-full mx-auto shadow-2xl bg-opacity-50 p-2 h-80vh flex flex-col gap-2">
          <h2 className="text-center text-2xl">Grocery List</h2>
          <ul className="overflow-auto">
            {groceryList.map((groceryItem) => {
              console.log(groceryItem.groceryItem)
              return (
                <GroceryItem
                  key={groceryItem.key}
                  id={groceryItem.key}
                  itemName={groceryItem.groceryItem.itemName}
                />
              );
            })}
          </ul>
          <div className="mt-auto flex justify-center">
            <Link href="/addGroceryItem" className="px-4 border rounded mx-2 bg-white bg-opacity-50">
              Add a Grocery Item
            </Link>
          </div>
        </div>

        {/* Grocery On Sale */}
        <div className="rounded my-10 bg-white w-full mx-auto shadow-2xl bg-opacity-50 p-2 h-80vh flex flex-col gap-2">
          <h2 className="text-center text-2xl">Grocery on Sale</h2>
          <ul className="overflow-auto">
            {groceryList.map((groceryItem) => {
              return (
                <OnSaleList
                key={groceryItem.key} 
                id={groceryItem.key} 
                itemName={groceryItem.groceryItem.itemName}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
