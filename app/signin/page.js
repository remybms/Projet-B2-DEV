"use client"

import Header from "@/components/header"
import { hashPassword } from "@/components/password";
import { useRouter } from "next/navigation";
import React from "react";

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
                router.push('/')
            }
        } catch (error) {
            console.error('Erreur lors de l\'envoi des données à l\'API :', error);
        }
    }

    return (
        <main className="flex flex-col bg-white min-h-screen text-black">
            <Header />
            <form onSubmit={sendData}>
                <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="Surname" onChange={(e) => setSurname(e.target.value)} />
                <input type="email" placeholder="Adresse e-mail" onChange={(e) => setMail(e.target.value)} />
                <input type="password" placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">S'inscrire</button>
            </form>
        </main>
    )
}