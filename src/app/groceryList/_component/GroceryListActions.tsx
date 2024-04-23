"use client";

import { db } from "@/firebase";
import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function AddGroceryListItem() {
  const [groceryItemName, setGroceryItemName] = useState<string>();

  const router = useRouter();

  async function addItem() {
    // create ref to GroceryList
    const groceryListRef = doc(db, "GroceryList", crypto.randomUUID());

    // add to GroceryList
    await setDoc(groceryListRef, {
      itemName: groceryItemName,
      checked: false,
    });

    setGroceryItemName("");
    router.refresh();
  }

  return (
    <form action={addItem}>
      <input
        type="text"
        id="groceryItemName"
        name="groceryItemName"
        required
        placeholder="Add an item"
        onChange={(e) => setGroceryItemName(e.target.value)}
        value={groceryItemName}
      />
    </form>
  );
}

export function ToggleGroceryListItems({
  id,
  checked,
}: {
  id: string;
  checked: boolean;
}) {
  const router = useRouter();
  return (
    <div
      onClick={async () => {
        // create ref to GroceryList
        const groceryListRef = doc(db, "GroceryList", `${id}`);

        // update
        await updateDoc(groceryListRef, {
          checked: !checked,
        });

        router.refresh();
      }}
    >
      {checked ? <p>✅</p> : <p>⬜️</p>}
    </div>
  );
}

export function DeleteGroceryListItem({ id }: { id: string }) {
  const router = useRouter();

  return (
    <div
      onClick={async () => {
        // create GroceryList ref
        const groceryListRef = doc(db, "GroceryList", `${id}`);

        // delete
        await deleteDoc(groceryListRef);

        router.refresh();
      }}
    >
      <p>🗑️</p>
    </div>
  );
}
