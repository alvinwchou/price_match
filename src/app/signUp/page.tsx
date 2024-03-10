"use client"

import { auth } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react"

interface SignUpForm {
    email: string;
    passOne: string;
    passTwo: string;
}


export default function SignUp() {
    const [signUpForm, setSignUpForm] = useState<SignUpForm>({
        email: "",
        passOne: "",
        passTwo: ""
    })

    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setSignUpForm((prevState: SignUpForm) => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const { email, passOne } = signUpForm

        createUserWithEmailAndPassword(auth, email, passOne)
            .then(() => {
                router.push("/dashboard")
            })
            .catch((e) => {
                console.error(e)
            })
    }

    const handleClick = () => {
        router.push("/signIn")
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col my-10 w-1/2 mx-auto">
                <div className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" onChange={handleChange} value={signUpForm.email} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="passOne">Password</label>
                    <input type="password" name="passOne" id="passOne" onChange={handleChange} value={signUpForm.passOne} />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="passTwo"> Confirm Password</label>
                    <input type="password" name="passTwo" id="passTwo" onChange={handleChange} value={signUpForm.passTwo} />
                </div>
                <div className="flex justify-between">
                    <button>Register</button>
                    <button onClick={handleClick}>Back</button>
                </div>
            </form>
        </>
    )
}