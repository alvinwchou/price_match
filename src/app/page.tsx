"use client"

import firebase, { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getDatabase, onValue, ref } from "firebase/database";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  userInfo: {
    uid: string
    favLocation?: string
    savedLocations?: []
  }
  list?: [{
    itemName: string
    exclude?: string[]
    display: boolean
  }]
}

export default function Home() {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    // check if the user is logged in already
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
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

          console.log(currentUser, data)

          // data is an object, iterate through it using for in loop to access each item
          for (let key in data) {
            newState.push({ key: key, groceryItem: data[key] });
          }

          const tempUserState: User = {
            userInfo: {
              uid: currentUser.uid
            },
            list: data
          }

          setUser(tempUserState)

          // setGroceryList(newState);
        });
      } else {
        // router.push("/signIn")
      }
    })
  }, [])

  // encode the array of object, user, into a query string
  const serializedUser = encodeURIComponent(JSON.stringify(user))

  return (
    <div className="container m-auto">
      <p>Welcome to my first project back from a year break.</p>
      <br />
      <p>The goal of this project is to help me get back into coding.</p>
      <p>
        With create react app deprecated, I will take this opportunity to learn
        nextjs, typescript, and tailwind.
      </p>
      <br />
      <p>My vision for this project:</p>
      <p>
        *First start off with creating a grocery list connecting it to firebase
        as a database
      </p>
      <p>
        *Second, compare grocery items that are on sale and display the cheapest
        price along with the location
      </p>
      <p>
        *Other features will be added as I go along, some ideas as of right now
        is to limit which store we are comparing our grocery items. Since some
        locations have restrictions. User Auth.
      </p>
      <br />
      <p>Currently using axios to fetch API, will comeback and try new fetch from nextjs</p>
      <br />
      <p>Dashboard: </p>
      <p>Grocery List - list of all gorcery items you want to purchase
      </p>
      <p>- if you have exluded an item a Exclude List button will show you have the option of adding it back to the on sale list</p>
      <p>Grocery On Sale - list of all items that are currently on sale from based on your Grocery List</p>
      <br />
      <p>Add a grocery item page:</p>
      <p>After entering an item it will populate the naming of the item that the flyers use ie. we say BROCCOLI which is BROCCOLI CROWNS</p>
      <br />
      <p>last update: Mar 25, 20204</p>
      <br />

      <Link href={`/Dashboard?array=${serializedUser}`} passHref>Go to Dashboard</Link>

    </div >
  );
}
