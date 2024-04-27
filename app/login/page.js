"use client"

import Header from "@/components/header";
import React from "react";
import { hashPassword } from "@/utils/password";
import { useRouter } from "next/navigation";
import { saveTokenToLocalStorage } from "@/utils/auth";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
            } else if (data.error == "Utilisateur non trouvé"){
                toast.error("Adresse e-mail introuvable !")
            } else if(data.error == "Mot de passe incorrect"){
                toast.error("Mot de passe incorrect !")
            }
        } catch (error) {
            console.error('Erreur lors de l\'envoi des données à l\'API :', error);
        }
    }

    return(
        <main className="bg-white min-h-screen text-black">
            <ToastContainer />
            <Header/>
            <form onSubmit={sendData} className="flex flex-col w-fit space-y-5 m-5">
                <input type="email" placeholder="Adresse e-mail" onChange={(e) => setMail(e.target.value)} className="p-2 border-4 rounded-lg" />
                <input type="password" placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} className="p-2 border-4 rounded-lg" />
                <button type="submit">Se connecter</button>
            </form>

        </main>
    )
}