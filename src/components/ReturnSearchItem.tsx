import firebase from "@/firebase";
import { getDatabase, push, ref } from "firebase/database";

type ReturnSearchItemProps = {
    name: string
}

export default function ReturnSearchItem({name}: ReturnSearchItemProps) {
    // handle click function
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        // e.target is of type EventTarget which does not have previousSibling so we have to change it to HTMLElement 
        const target = e.target as HTMLElement

        // create a reference to our db
        const database = getDatabase(firebase);
        const dbRef = ref(database);

        // push the value to the database
        push(dbRef, target.previousSibling?.textContent?.toUpperCase());
    }
    if (!name) return

    return (
        <li className="bg-white rounded">
            <p>{name.toUpperCase()}</p>
            <button onClick={handleClick}>Add</button> 
        </li>
    )
}   