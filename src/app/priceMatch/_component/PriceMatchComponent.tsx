"use client";

import { db } from "@/firebase";
import { update } from "firebase/database";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";

type GroceryItem = {
  id: string;
  itemName: string;
  checked: boolean;
  priceMatchedItems: GroceryStoreItem[];
};

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

type GroceryListProps = {
  groceryList: GroceryItem[];
};

export default function PriceMatchComponent({ groceryList }: GroceryListProps) {
  const [itemIndex, setItemIndex] = useState<number>(0);

  // get the name of the grocery item in the list
  function handleClick(itemIndex: number) {
    console.log(itemIndex);
    setItemIndex(itemIndex);
  }

  return (
    <div className="w-100 flex">
      <PriceMatchedGroceryListTable
        groceryList={groceryList}
        handleClick={handleClick}
      />
      <PriceMatchedItem
        groceryList={groceryList}
        selectedItemIndex={itemIndex}
      />
    </div>
  );
}

function PriceMatchedGroceryListTable({
  groceryList,
  handleClick,
}: {
  groceryList: GroceryItem[];
  handleClick: (itemIndex: number) => void;
}) {
  return (
    <div className="flex-1 w-50">
      {groceryList.map((groceryListItem, index) => {
        return (
          <div
            key={groceryListItem.id}
            className="flex justify-between border-8"
            onClick={() => handleClick(index)}
          >
            <p>{groceryListItem.itemName}</p>
          </div>
        );
      })}
    </div>
  );
}

function PriceMatchedItem({
  groceryList,
  selectedItemIndex,
}: {
  groceryList: GroceryItem[];
  selectedItemIndex: number;
}) {
  // sort the priceMatchedItems array from lowest current price to highest
  const sortedPriceMatchedItems = groceryList[
    selectedItemIndex
  ].priceMatchedItems.sort(function (a, b) {
    return a.current_price - b.current_price;
  });

  const router = useRouter();

  async function addToGroceryList(itemName: string) {
    // create ref to GroceryList
    const groceryListRef = doc(db, "GroceryList", crypto.randomUUID());

    // add to GroceryList
    await setDoc(groceryListRef, {
      itemName: itemName,
      checked: false,
    });

    router.refresh();
  }

  async function addToExcludeList(itemId: string, itemName: string) {
    console.log(itemId, itemName);
    // create GroceryList ref
    const groceryListItemRef = doc(db, "GroceryList", itemId);
    const groceryListItemRefSnapshot = await getDoc(groceryListItemRef)

    const groceryListItemDoc = groceryListItemRefSnapshot.data()

    // get current excludeList and if not assign empty array
    const excludeListArray: string[] = groceryListItemDoc?.excludeList || []

    excludeListArray.push(itemName)
    
    await updateDoc(groceryListItemRef, { 
      excludeList: excludeListArray
    })
  }

  return (
    <div className="flex-1 w-50 bg-white bg-opacity-50 h-80vh overflow-auto">
      {/* cheapest of the week`` */}
      {sortedPriceMatchedItems.map((item) => {
        return (
          <div className="p-4">
            {/* header */}
            <div className="flex items-center mb-2 p2">
              {/* image container */}
              <div className="size-7 flex items-center">
                <img
                  className="border rounded-full"
                  src={item.merchant_logo}
                  alt={`${item.merchant_name} logo`}
                />
              </div>
              {/* text container */}
              <div className="ml-1 flex justify-between items-baseline w-full">
                <p className="font-medium">{item.merchant_name}</p>
                <button
                  className="border rounded p-1 text-xs"
                  onClick={() => addToGroceryList(item.name)}
                >
                  Add to Grocery List
                </button>
                <button
                  className="border rounded p-1 text-xs"
                  onClick={() =>
                    addToExcludeList(
                      groceryList[selectedItemIndex].id,
                      item.name
                    )
                  }
                >
                  Exclude from{" "}
                </button>
              </div>
            </div>

            {/* body */}
            <div className="flex items-center gap-2">
              {/* image container */}
              <div className="w-1/3">
                <img
                  className="w-full"
                  src={item.clean_image_url}
                  alt={`Image of ${name}`}
                />
              </div>
              {/* text container */}
              <div className="w-2/3">
                <p>{item.name}</p>
                <p>
                  {item.current_price} {item.post_price_text}
                </p>
                {/* {showEndsToday(valid_to) && (
              <p className="text-red-500	">Ends today</p>
            )}
            {showStartsTomorrow(valid_from) && (
              <p className="text-slate-500	">Starts tomorrow</p>
            )} */}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
