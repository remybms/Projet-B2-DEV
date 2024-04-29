"use client"
import Header from "@/components/header";
import React from "react";
import { getTokenFromLocalStorage, removeTokenFromLocalStorage, getUserFromToken } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { Toast, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


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
          "idUser": getUserFromToken(token).id,
          "content": content,
        }),
      });

      data = await response.json();
      if (data.message == "ok") {
        location.reload()
      } else if (data.error == "Mot interdit") {
        toast.error("Votre commentaire contient un ou plusieurs mots offensants")
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

  const handleClick = (item) => {
    window.location.href = `/post?id=${item.id}`;
  };

  return (
    <main className="min-h-screen bg-white text-black">
      <ToastContainer />
      <Header />
      <div className="space-y-5 m-5">
        <button onClick={removeTokenFromLocalStorage}>Se déconnecter</button>
        <form onSubmit={sendData} className="flex flex-col">
          <label for="content">Ajouter un nouveau message :</label>
          <input type="text" name="content" id="content" placeholder="Tapez ici..." onChange={(e) => setContent(e.target.value)} className="p-5 border-4 rounded-lg" required/>
          <button type="submit" className="m-2">envoyer</button>
        </form>
        {data.map(item => (
          <><div onClick={() => handleClick(item)} className="border-4 w-fit p-3 rounded-lg border-black">
            <div>{item.username} dit :</div>
            <div>{item.content}</div>
          </div>
          </>
        ))}
      </div>

    </main>
  );
}


