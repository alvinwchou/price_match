import firebase from "@/firebase";
import { getDatabase, ref, remove } from "firebase/database";

type GroceryListProps = {
  id: string;
  itemName: string;
  excludeList: string[]
};

export default function GroceryList({ id, itemName, excludeList }: GroceryListProps) {
  // this function takes an argument, which is the ID of the grocery item we want to remove
  const handleRemoveGroceryItem = (groceryItemId: string) => {
    // create a reference to db
    // this time instead of pointing at the whole db, we make our dbRef point to the specific node of the item we want to remove
    const database = getDatabase(firebase);
    const dbRef = ref(database, `/${groceryItemId}`);

    remove(dbRef);
  };
  return (
    <li className="flex justify-between p-4 border rounded bg-white bg-opacity-50">
      <p>{itemName}</p>
      <button onClick={() => handleRemoveGroceryItem(id)}>x</button>
    </li>
  );
}
