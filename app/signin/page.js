"use client"

import Header from "@/components/header"
import { hashPassword } from "@/utils/password";
import { useRouter } from "next/navigation";
import React from "react";
import { saveTokenToLocalStorage } from "@/utils/auth";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Signin() {

    const [username, setUsername] = React.useState('')
    const [name, setName] = React.useState('')
    const [surname, setSurname] = React.useState('')
    const [mail, setMail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const router = useRouter()


    async function sendData(e) {
        e.preventDefault();
        var data
        try {
            const response = await fetch('/api/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "username": username,
                    "name": name,
                    "surname": surname,
                    "mail": mail,
                    "password": hashPassword(password)
                }),
            });

            data = await response.json();
            if(data.message == "ok"){
                saveTokenToLocalStorage(data.token);
                router.push('/')
            } else if (data.error == "Utilisateur déjà présent"){
                toast.error("Un compte existe déjà !")
            }
        } catch (error) {
            console.error('Erreur lors de l\'envoi des données à l\'API :', error);
        }
    }

    return (
        <main className="flex flex-col bg-white min-h-screen text-black">
            <ToastContainer />
            <Header />
            <form onSubmit={sendData} className="flex flex-col w-fit space-y-5 m-5">
                <input type="text" placeholder="Pseudo" onChange={(e) => setUsername(e.target.value)} className="p-2 border-4 rounded-lg" required/>
                <input type="text" placeholder="Prénom" onChange={(e) => setName(e.target.value)} className="p-2 border-4 rounded-lg" required/>
                <input type="text" placeholder="Nom" onChange={(e) => setSurname(e.target.value)} className="p-2 border-4 rounded-lg" required/>
                <input type="email" placeholder="Adresse e-mail" onChange={(e) => setMail(e.target.value)} className="p-2 border-4 rounded-lg" required/>
                <input type="password" placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} className="p-2 border-4 rounded-lg" required/>
                <button type="submit">S'inscrire</button>
            </form>
        </main>
    )
}