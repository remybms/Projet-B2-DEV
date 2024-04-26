"use client"
import Header from "@/components/header";
import React from "react";
import { getTokenFromLocalStorage, removeTokenFromLocalStorage } from "@/utils/auth";
import { useRouter } from "next/navigation";
import jwt from 'jsonwebtoken';


export default function Home() {

  const [content, setContent] = React.useState('')
  const [data, setData] = React.useState([]);

  const token = getTokenFromLocalStorage()
  const router = useRouter()

  if (!token) {
    router.push('/login')
    return null;
  }

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
          "idUser": getUserIdFromToken(token),
          "content": content,
        }),
      });

      data = await response.json();
      if(data.message == "ok"){
        location.reload()
      }
      
    } catch (error) {
      console.error('Erreur lors de l\'envoi des données à l\'API :', error);
    }
  }

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/posts');
        const apiData = await response.json();
        setData(apiData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'API', error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center bg-white text-black">
      <Header />
      <button onClick={removeTokenFromLocalStorage}>Se déconnecter</button>
      <form onSubmit={sendData}>
        <input type="text" placeholder="content" onChange={(e) => setContent(e.target.value)} />
        <button type="submit">envoyer</button>
      </form>
      {data.map(item => (
        <><div>{item.username} dit :</div>
          <div>{item.content}</div></>
      ))}
    </main>
  );
}

const getUserIdFromToken = (token) => {
  const decodedToken = jwt.decode(token);
  return decodedToken.id;
};
