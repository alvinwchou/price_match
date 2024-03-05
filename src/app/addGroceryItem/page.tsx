"use client";

import { getDatabase, push, ref } from "firebase/database";
import firebase from "../../firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosResponse } from "axios";
import ReturnSearchItem from "@/components/ReturnSearchItem";

export default function AddGroceryItem() {
  const [userInput, setUserInput] = useState("");
  const [returnSearchItems, setReturnSearchItems] = useState<any[]>([])
  const router = useRouter();

  // handle user input function
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setUserInput(e.target.value);
  };

  // handle submit function
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // create a reference to our db
    const database = getDatabase(firebase);
    const dbRef = ref(database);

    // push the value of the 'userInput' state to the database
    push(dbRef, userInput);

    // reset the state of an empty string
    setUserInput("");

    router.push("/dashboard");
  };

  // calling api 
  useEffect(() => {
    axios({
      url: `https://backflipp.wishabi.com/flipp/items/search?locale=en-ca&postal_code=m1w2z6&q=${userInput}`,
    }).then((apiData: AxiosResponse<any>) => {
      console.log(apiData.data.items);
      setReturnSearchItems(apiData.data.items);
    })
  }, [userInput]);

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
      <ul>
        {returnSearchItems.map((searchItem, index) => {
        console.log(returnSearchItems)
          return (
            <ReturnSearchItem key={index} {...searchItem}/>
          )
        })}
      </ul>
    </div>
  );
}
