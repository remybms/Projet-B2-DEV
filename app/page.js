"use client"
import React from "react";
import { hashPassword } from "@/components/password";

export default function Home() {

  const [username, setUsername] = React.useState('')
  const [name, setName] = React.useState('')
  const [surname, setSurname] = React.useState('')
  const [mail, setMail] = React.useState('')
  const [password, setPassword] = React.useState('')

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
                "mail" : mail,
                "password" : hashPassword(password),
                }),
        });

        data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Erreur lors de l\'envoi des données à l\'API :', error);
    }
}

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white text-black">
      <form onSubmit={sendData}>
        <input type="email" placeholder="email" onChange={(e) => setMail(e.target.value)}/>
        <input type="text" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit">envoyer</button>
      </form>
      
    </main>
  );
}
