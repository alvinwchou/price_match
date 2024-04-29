import { db } from "@/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import PriceMatchComponent from "./_component/PriceMatchComponent";

type GroceryItem = {
  id: string;
  itemName: string;
  checked: boolean;
  priceMatchedItems: GroceryStoreItem[];
};

export default async function PriceMatch() {
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
      priceMatchedItems: []
    };

    groceryList.push(groceryListItem);
  });

  const priceMatchedGroceryList = await getPriceMatchedGroceryList(groceryList);

  async function addToGroceryList(itemName:string) {
        // create ref to GroceryList
        const groceryListRef = doc(db, "GroceryList", crypto.randomUUID());

        // add to GroceryList
        await setDoc(groceryListRef, {
          itemName: itemName,
          checked: false,
        });
  }

  return (
    <div>
      <div>
        <h1>Price Match</h1>
      </div>
      <PriceMatchComponent groceryList={priceMatchedGroceryList}/>
    </div>
  );
}

async function getPriceMatchedGroceryList(originalGroceryList: GroceryItem[]) {
  const newGroceryListPromise = originalGroceryList.map(
    async (originalGroceryListItem) => {
      // since compareGroceryListItemToGroceryStore is an async function it wil return an array of promises we have to await map
      return await compareGroceryListItemToGroceryStore(
        originalGroceryListItem
      );
    }
  );

  const newGroceryList = await Promise.all(newGroceryListPromise);

  // filters out any empty index
  const filteredNewGroceryList = newGroceryList.filter((item) => item);

  return filteredNewGroceryList as GroceryItem[];
}

type GroceryStoreItem = {
  name: string;
  clean_image_url: string;
  current_price: number;
  merchant_name: string;
  merchant_logo: string;
  post_price_text: string;
  pre_price_text: string;
  valid_from: string;
  valid_to: string;
};

async function compareGroceryListItemToGroceryStore(
  groceryListItem: GroceryItem
) {
  const newGroceryListItem: GroceryItem = {
    id: groceryListItem.id,
    itemName: groceryListItem.itemName,
    checked: groceryListItem.checked,
    priceMatchedItems: []
  };
  const allStorePriceMatchedItems: GroceryStoreItem[] = [];
  // create ref to GroceryStore
  const groceryStoreRef = collection(db, "GroceryStore");

  // get data from Grocery Store
  const querySnapshot = await getDocs(groceryStoreRef);

  // for each store find items that contain item name
  querySnapshot.forEach((doc) => {
    const groceryStoreDoc = doc.data();

    // storePriceMatchedItem will be an array with object of the current week to find item names that contain grocery list item
    const storePriceMatchedItems = groceryStoreDoc[
      "2024-04-25T04:00:00+00:00"
    ]?.filter((item: { name: string }) =>
      item.name
        ?.toLowerCase()
        .includes(groceryListItem.itemName.toLocaleLowerCase())
    );

    if (storePriceMatchedItems?.length > 0) {
      // add all store into one variable
      storePriceMatchedItems.forEach((item: GroceryStoreItem) => {
        allStorePriceMatchedItems.push(item);
      });
      // add to newGroceryListItem
      newGroceryListItem.priceMatchedItems = allStorePriceMatchedItems;
    }
  });
  // only return if there are priceMatchedItems
  return newGroceryListItem.priceMatchedItems[0] && newGroceryListItem;
}
