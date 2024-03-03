"use client"

import { getDatabase, onValue, push, ref, remove } from 'firebase/database'
import firebase from '../firebase'
import { useEffect, useState } from 'react'

export default function Home() {
  const [groceryList, setGroceryList] = useState([])
  const [userInput, setUserInput] = useState('')

  useEffect(() => {
    // create a variable to hold our db details
    const database = getDatabase(firebase)
  
    // create a variable that makes reference to our database
    const dbRef = ref(database)
  
    // add event listener to that variable that will fire from the db, and call that data 'response'
    onValue(dbRef, response => {    
      console.log(response.val());
      // create a variable to store the new state we want to introduce to our app
      const newState = []
  
      // store the response from our query to Firebase inside of a variable
      const data = response.val()
  
      // data is an object, iterate through it using for in loop to access each item
      for (let key in data) {
        newState.push({key: key, itemName: data[key]})
      }
  
      setGroceryList(newState)
    })
  }, [])

  const hanndleInputChange = e => {
    setUserInput(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()

    //create a reference to our db
    const database = getDatabase(firebase)
    const dbRef = ref(database)

    // push the value of the 'userInput' state to the database
    push(dbRef, userInput)
    
    // reset the state of an empty string
    setUserInput('')
  }

  // this functoin takes an argument, which is the KEY of the grocery item we want to remove
  const handleRemoveGroceryItem = groceryItemKey => {
    // create a reference to db
    // this time instead of pointing at the whole db, we make our dbRef point to the specific node of the item we want to remove
    const database = getDatabase(firebase)
    const dbRef = ref(database, `/${groceryItemKey}`)

    remove(dbRef)
  }

  return (
    <>
    <header>
      <h1>PRICE MATCH</h1>
    </header>
    <form action="submit">
      <label htmlFor="newGroceryItem">Add a Grocery Item</label>
      <input type="text" id='newGroceryItem' onChange={hanndleInputChange} value={userInput}/>
      <button onClick={handleSubmit}>Add Item</button>
    </form>
    <ul>
      {groceryList.map(groceryItem => {
        return (
          <li key={groceryItem.key}>
            <p>{groceryItem.itemName}</p>
            <button onClick={() => handleRemoveGroceryItem(groceryItem.key)}>Remove</button>
          </li>
        )
      })}
    </ul>
    </>
  )
}
