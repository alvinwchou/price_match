import firebase from "@/firebase";
import { getDatabase, push, ref } from "firebase/database";

type ReturnSearchItemProps = {
    name: string
}

type addToList = {
    itemName: string
    exclude: string[]
  }

export default function ReturnSearchItem({name}: ReturnSearchItemProps) {
    // handle click function
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        // e.target is of type EventTarget which does not have previousSibling so we have to change it to HTMLElement 
        const target = e.target as HTMLElement

        // create a reference to our db
        const database = getDatabase(firebase);
        const dbRef = ref(database);

        const itemName = target.previousSibling?.textContent?.toUpperCase() || ""

        const addToList: addToList = {
            itemName: itemName,
            exclude: []
          }

        // push the value to the database
        push(dbRef, addToList);
    }
    if (!name) return

    return (
        <li className="bg-white bg-opacity-50 rounded">
            <p>{name.toUpperCase()}</p>
            <button onClick={handleClick}>Add</button> 
        </li>
    )
}   