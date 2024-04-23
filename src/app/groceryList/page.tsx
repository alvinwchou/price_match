import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import { AddGroceryListItem, DeleteGroceryListItem, ToggleGroceryListItems } from "./_component/GroceryListActions";

export default function GroceryList() {
  return (
    <div>
      <div>
        <h1>Grocery List</h1>
        {/* <button><Link href="/testDashboard/groceryList/addItem">Add an Item</Link></button> */}
      </div>

      <AddGroceryListItem />

      <GroceryListTable />
    </div>
  );
}

type GroceryItem = {
  id: string;
  itemName: string;
  checked: boolean;
};

async function GroceryListTable() {
  // create GroceryList ref
  const groceryListRef = collection(db, "GroceryList");
  const groceryListSnapshot = await getDocs(groceryListRef);

  const groceryList: GroceryItem[] = [];

  groceryListSnapshot.forEach((doc) => {
    const groceryListData = doc.data();

    const groceryListItem = {
      id: doc.id,
      itemName: groceryListData.itemName,
      checked: groceryListData.checked,
    };

    groceryList.push(groceryListItem);
  });

  return (
    <div className="w-100border-2">
      {groceryList.map((groceryListItem) => {
        console.log("test",groceryListItem.id)
        return (
          <div key={groceryListItem.id} className="flex justify-between border-8">
            <div className="flex">
              <ToggleGroceryListItems id={groceryListItem.id} checked={groceryListItem.checked} />
              <div>
                <p>{groceryListItem.itemName}</p>
              </div>
            </div>
            <DeleteGroceryListItem id={groceryListItem.id} />
          </div>
        );
      })}
    </div>
  );
}
