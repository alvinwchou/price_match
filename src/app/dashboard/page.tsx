"use client";

import { getDatabase, onValue, ref, remove } from "firebase/database";
import firebase from "../../firebase";
import { useEffect, useState } from "react";
import Link from "next/link";
import GroceryList from "@/components/GroceryList";

export default function Dashboard() {
  const [groceryList, setGroceryList] = useState([]);

  useEffect(() => {
    // create a variable to hold our db details
    const database = getDatabase(firebase);

    // create a variable that makes reference to our database
    const dbRef = ref(database);

    // add event listener to that variable that will fire from the db, and call that data 'response'
    onValue(dbRef, (response) => {
      console.log(response.val());
      // create a variable to store the new state we want to introduce to our app
      const newState = [];

      // store the response from our query to Firebase inside of a variable
      const data = response.val();

      // data is an object, iterate through it using for in loop to access each item
      for (let key in data) {
        newState.push({ key: key, itemName: data[key] });
      }

      setGroceryList(newState);
    });
  }, []);

  return (
    <>
      <header className="flex justify-center">
        <h1>PRICE MATCH</h1>
      </header>
      <div className="border rounded my-10 bg-white w-1/2 mx-auto shadow-2xl">
        <Link href="/addGroceryItem" className="">
          Add a Grocery Item
        </Link>
        <ul className="border bg-white rounded">
          {groceryList.map((groceryItem) => {
            return (
              <GroceryList
                key={groceryItem.key}
                id={groceryItem.key}
                {...groceryItem}
              />
            );
          })}
        </ul>
      </div>
    </>
  );
}
