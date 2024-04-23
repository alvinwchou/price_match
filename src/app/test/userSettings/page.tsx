"use client"

import firebase, { auth } from "@/firebase"
import { signOut } from "firebase/auth"
import { getDatabase, ref } from "firebase/database"
import { useState } from "react"

export default function UserSettings() {
    const [postalCode, setPostalCode] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPostalCode(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // create a reference to our db
        const database = getDatabase(firebase)
        const dbRef = ref(database)
    }

    const handleSignOutClick = () => {
        signOut(auth)
    }

    return (
        <>
            <form action="">
                <label htmlFor="postalCode">Enter your postal code to find weekly ads near you</label>
                <input type="text" id="postalCode" placeholder="A1A1A1" onChange={handleChange} value={postalCode} />
                <button>Update</button>
            </form>
            <button onClick={handleSignOutClick}>Sign Out</button>

        </>
    )
}