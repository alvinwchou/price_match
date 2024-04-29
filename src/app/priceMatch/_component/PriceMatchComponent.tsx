"use client";

import { db } from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

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
    <div className="w-100border-2">
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
    <div className="w-100border-2">
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
  console.log(sortedPriceMatchedItems);

  return (
    <div>
      {/* cheapest of the week`` */}
      <li className="p-4 border rounded bg-white bg-opacity-50">
        {/* header */}
        <div className="flex items-center mb-2 p2">
          {/* image container */}
          <div className="size-7 flex items-center">
            <img
              className="border rounded-full"
              src={sortedPriceMatchedItems[0].merchant_logo}
              alt={`${sortedPriceMatchedItems[0].merchant_name}'s logo`}
            />
          </div>
          {/* text container */}
          <div className="ml-1 flex justify-between items-baseline w-full">
            <p className="font-medium">{sortedPriceMatchedItems[0].merchant_name}</p>
            {/* <button
              className="border rounded p-1 text-xs"
              onClick={() => handleClick(id, name)}
            >
              Exclude
            </button> */}
          </div>
        </div>

        {/* body */}
        <div className="flex items-center gap-2">
          {/* image container */}
          <div className="w-1/3">
            <img
              className="w-full"
              src={sortedPriceMatchedItems[0].clean_image_url}
              alt={`Image of ${name}`}
            />
          </div>
          {/* text container */}
          <div className="w-2/3">
            <p>{sortedPriceMatchedItems[0].name}</p>
            <p>
              {sortedPriceMatchedItems[0].current_price} {sortedPriceMatchedItems[0].post_price_text}
            </p>
            {/* {showEndsToday(valid_to) && (
              <p className="text-red-500	">Ends today</p>
            )}
            {showStartsTomorrow(valid_from) && (
              <p className="text-slate-500	">Starts tomorrow</p>
            )} */}
          </div>
        </div>
      </li>
      {/* the rest */}
    </div>
  );
}
