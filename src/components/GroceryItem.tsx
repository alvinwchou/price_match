import firebase from "@/firebase";
import { getDatabase, ref, remove } from "firebase/database";
import ExcludeList from "./ExcludeList";
import { useEffect, useState } from "react";

interface GroceryListProps {
  id: string;
  itemName: string;
  excludeList: string[]
};


export default function GroceryList({ id, itemName, excludeList }: GroceryListProps) {
  const [hideExcludeList, setHideExcludeList] = useState(true)
  const [hideExcludeListButton, setHideExcludeListButton] = useState(true)

  // this function takes an argument, which is the ID of the grocery item we want to remove
  const handleRemoveGroceryItem = (groceryItemId: string) => {
    // create a reference to db
    // this time instead of pointing at the whole db, we make our dbRef point to the specific node of the item we want to remove
    const database = getDatabase(firebase);
    const dbRef = ref(database, `/${groceryItemId}`);

    remove(dbRef);
  };

  const handleClick = () => {
    setHideExcludeList(!hideExcludeList)
  }

  useEffect(() => {
    if (excludeList) {
      setHideExcludeListButton(false)
    } else {
      setHideExcludeListButton(true)
    }
  }, [excludeList])

  return (
    <li className="p-4 border rounded bg-white bg-opacity-50">
      <div className="flex justify-between">
        <p>{itemName}</p>
        <button onClick={() => handleRemoveGroceryItem(id)}>x</button>
      </div>
      <button className={`text-xs border rounded ${hideExcludeListButton && "hidden"}`} onClick={handleClick}>Exclude List</button>
      <ul className={`p-1 ${hideExcludeList && "hidden"}`}>
        {excludeList?.map(excludeItem => {
          return (
            <ExcludeList id={id} excludeItem={excludeItem} />
          )
        })}
      </ul>
    </li>
  );
}
