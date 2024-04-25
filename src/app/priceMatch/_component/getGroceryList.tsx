import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function getGroceryList() {
  const groceryListRef = collection(db, "GroceryList");
  return new Promise((resolve, reject) => {
    getDocs(groceryListRef)
      .then((snapshot) => {
        const groceryList:{
            id: string;
            itemName: string;
            checked: boolean;
          }[] = [];
        snapshot.forEach((doc) => {
          const groceryListData = doc.data();
          const groceryListItem = {
            id: doc.id,
            itemName: groceryListData.itemName,
            checked: groceryListData.checked,
          };
          groceryList.push(groceryListItem);
        });
        resolve(groceryList);
      })
      .catch((error) => reject(error));
  });
}