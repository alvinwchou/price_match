"use client";

import { getDatabase, push, ref } from "firebase/database";
import firebase from "../../firebase";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddGroceryItem() {
  const [userInput, setUserInput] = useState("");
  const router = useRouter();

  const handleInputChange = (e: any) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //create a reference to our db
    const database = getDatabase(firebase);
    const dbRef = ref(database);

    // push the value of the 'userInput' state to the database
    push(dbRef, userInput);

    // reset the state of an empty string
    setUserInput("");

    router.push("/dashboard");
  };

  return (
    <div className="border rounded my-10 bg-white w-1/2 mx-auto">
      <form
        action="submit"
        className="flex justify-between"
        onSubmit={handleSubmit}
      >
        <label htmlFor="newGroceryItem" className="sr-only">
          Add a Grocery Item
        </label>
        <input
          type="text"
          id="newGroceryItem"
          placeholder="Add a Grocery Item"
          onChange={handleInputChange}
          value={userInput}
        />
        <button>Add Item</button>
      </form>
    </div>
  );
}
