import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import {
  AddGroceryListItem,
  DeleteGroceryListItem,
  ToggleGroceryListItems,
} from "./_component/GroceryListActions";

export default function GroceryList() {
  return (
    <div className="w-96 m-auto">
      <div>
        <h1>Grocery List</h1>
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
    // grocery list container
    <div className="bg-white bg-opacity-50 border-y-2 border-slate-300 divide-y divide-slate-300">
      {groceryList.map((groceryListItem) => {
        console.log("test", groceryListItem.id);
        return (
          // each listed item
          <div
            key={groceryListItem.id}
            className="flex justify-between px-5 py-2"
          >
            <div className="flex">
              <ToggleGroceryListItems
                id={groceryListItem.id}
                checked={groceryListItem.checked}
              />
              <div>
                <p className="text-transform: capitalize">
                  {groceryListItem.itemName}
                </p>
              </div>
            </div>
            <DeleteGroceryListItem id={groceryListItem.id} />
          </div>
        );
      })}
    </div>
  );
}
