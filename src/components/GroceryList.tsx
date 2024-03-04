import firebase from "@/firebase";
import { getDatabase, ref, remove } from "firebase/database";

type GroceryListProps = {
  id: string;
  itemName: string;
};

export default function GrocerList({ id, itemName }: GroceryListProps) {
  // this functoin takes an argument, which is the ID of the grocery item we want to remove
  const handleRemoveGroceryItem = (groceryItemId: string) => {
    console.log(groceryItemId);

    // create a reference to db
    // this time instead of pointing at the whole db, we make our dbRef point to the specific node of the item we want to remove
    const database = getDatabase(firebase);
    const dbRef = ref(database, `/${groceryItemId}`);

    remove(dbRef);
  };
  return (
    <li className="flex justify-between p-4 border rounded">
      <p>{itemName}</p>
      <button onClick={() => handleRemoveGroceryItem(id)}>x</button>
    </li>
  );
}
