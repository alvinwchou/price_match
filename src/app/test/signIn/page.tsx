"use client"

import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react"

interface SignInForm {
    email: string;
    passOne: string;
}


export default function SignUp() {
    const [signInForm, setSignInForm] = useState<SignInForm>({
        email: "",
        passOne: ""
    })

    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setSignInForm((prevState: SignInForm) => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const { email, passOne } = signInForm


        signInWithEmailAndPassword(auth, email, passOne)
            .then(() => {
                router.push("/dashboard")
            })
            .catch((e) => {
                console.error(e)
            })
    }

    const handleCreateAccountClick = () => {
        router.push("/signUp")
    }

    const handleGuestClick = () => {
        signInWithEmailAndPassword(auth, "guest@pricematch.com", "password")
        .then(()=>{
            router.push("/dashboard")
        })
        .catch((e) => {
            console.error(e)
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col my-10 w-1/2 mx-auto">
                <div className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" onChange={handleChange} value={signInForm.email} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="passOne">Password</label>
                    <input type="password" name="passOne" id="passOne" onChange={handleChange} value={signInForm.passOne} />
                </div>
                <div className="flex justify-between">
                    <button>Enter</button>
                    <button onClick={handleCreateAccountClick}>Create an Account</button>
                </div>
                <div className="flex">
                    <button onClick={handleGuestClick}>Sign in as Guest</button>
                </div>
            </form>
        </>
    )
}