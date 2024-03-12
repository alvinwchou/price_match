"use client";

import { getDatabase, push, ref } from "firebase/database";
import firebase from "../../firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosResponse } from "axios";
import ReturnSearchItem from "@/components/ReturnSearchItem";

type addToList = {
  itemName: string
  exclude: string[]
}

export default function AddGroceryItem({searchParams}:any) {
  const {uid} = searchParams

  const [userInput, setUserInput] = useState("");
  const [returnSearchItems, setReturnSearchItems] = useState<any[]>([])
  const router = useRouter();

  // handle user input function
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value.toUpperCase());
  };

  // handle submit function
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // create a reference to our db
    const database = getDatabase(firebase);
    const dbRef = ref(database, `user/${uid}/groceryList`);

    const addToList: addToList = {
      itemName: userInput,
      exclude: []
    }

    // push the value of the 'userInput' state to the database
    push(dbRef, addToList);

    // reset the state of an empty string
    setUserInput("");

    router.push("/dashboard");
  };

  // handle click function to go back to dashboard
  const handleClick = () => {
    router.push("/dashboard");
  }

  // calling api to fetch a list of grocery items that are on sale
  useEffect(() => {
    axios({
      url: `https://backflipp.wishabi.com/flipp/items/search?locale=en-ca&postal_code=m1w2z6&q=${userInput}`,
    }).then((apiData: AxiosResponse<any>) => {

      const itemNames: string[] = []

      // push all the item names into an array
      apiData.data.items.map((item: { name: string }) => {
        itemNames.push(item.name?.toUpperCase())
      })

      // remove duplicate names
      const uniqueItemNames = Array.from(new Set(itemNames))

      setReturnSearchItems(uniqueItemNames)
    })
  }, [userInput]);
  return (
    <div className="my-10 w-1/2 mx-auto">
      <form
        action="submit"
        className="flex justify-between bg-white"
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
          className="w-9/12"
        />
        <button>Add Item</button>
      </form>
      <ul className="rounded my-10 bg-white w-full mx-auto shadow-2xl bg-opacity-50 p-2 h-80vh overflow-auto flex flex-wrap content-start items- gap-5 my-10 h-80vh">
        {returnSearchItems.map((searchItem, index) => {
          return (
            <ReturnSearchItem key={index} name={searchItem} />
          )
        })}
      </ul>
      <div className="mt-auto flex justify-center">
        <button className="px-4 border rounded mx-2 bg-white bg-opacity-50" onClick={handleClick}>Back</button>
      </div>
    </div>
  );
}
