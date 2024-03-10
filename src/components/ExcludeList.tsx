import firebase from "@/firebase";
import { getDatabase, onValue, ref, set } from "firebase/database";

interface ExcludeListProps {
    id: string
    excludeItem: string;
}

// function to remove item from the exclude list
const handleClick = (id: string, excludeItemName: string) => {
    // create a reference to our db
    const database = getDatabase(firebase)
    const dbRef = ref(database, id)

    let groceryListItem
    // get the exculde list from db
    onValue(dbRef, res => {
        groceryListItem = res.val()

        // find the index of item
        const index = groceryListItem["exclude"]?.indexOf(excludeItemName)

        // remove from array
        groceryListItem["exclude"]?.splice(index, 1)
    })

    // set new list
    set(dbRef, groceryListItem)
}

export default function ExcludeList({ id, excludeItem }: ExcludeListProps) {
    return (
        <div className="flex justify-between items-center border-b py-1">
            <li className="text-xs">{excludeItem}</li>
            <button className="border rounded p-1 text-xs" onClick={() => {handleClick(id, excludeItem)}}>Add&nbsp;Back</button>
        </div>
    )
}

