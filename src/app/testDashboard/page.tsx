import { db } from "@/firebase";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";

type itemsProps = {
  valid_from: string;
};

async function addItemsOfTheWeek(items: itemsProps[], storeName: string) {
  // getting the Grocery Store Ref
  const groceryStoreRef = doc(db, "GroceryStore", storeName);

  // update database with flyer items
  await setDoc(groceryStoreRef, {
    [items[0].valid_from]: items,
  });
}

export default function TestDashboard() {
  // list of primary store name and the store names they price match with
  const storeNames = ["no frills", "food basics"];

  // make api call to get flyer items of the week from store name
  storeNames.forEach((store) => {
    axios({
      url: `https://backflipp.wishabi.com/flipp/items/search?locale=en-ca&postal_code=M1W2Z6&q=${store}`,
    }).then((apiData) => {
      addItemsOfTheWeek(apiData.data.items, store);
    });
  });

  return <h1>Hi</h1>;
}
