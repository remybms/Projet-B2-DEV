"use client"
import React from "react";

export default function Home() {

  const [content, setContent] = React.useState('')

  async function sendData(e) {
    e.preventDefault();
    var data
    try {
        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "idUser": 1,
                "content": content,
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
        <input type="text" placeholder="content" onChange={(e) => setContent(e.target.value)}/>
        <button type="submit">envoyer</button>
      </form>
      
    </main>
  );
}
