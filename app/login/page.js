"use client"

import Header from "@/components/header";
import React from "react";
import { hashPassword } from "@/components/password";
import { useRouter } from "next/navigation";
import { saveTokenToLocalStorage } from "@/utils/auth";

export default function Login(){

    const [mail, setMail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const router = useRouter()

    async function sendData(e) {
        e.preventDefault();
        var data
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "mail": mail,
                    "password": hashPassword(password)
                }),
            });

            data = await response.json();
            if(data.message == "ok"){
                saveTokenToLocalStorage(data.token);
                router.push('/')
            }
        } catch (error) {
            console.error('Erreur lors de l\'envoi des données à l\'API :', error);
        }
    }

    return(
        <main className="bg-white min-h-screen text-black">
            <Header/>
            <form onSubmit={sendData}>
                <input type="email" placeholder="Adresse e-mail" onChange={(e) => setMail(e.target.value)} />
                <input type="password" placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">S'inscrire</button>
            </form>

        </main>
    )
}