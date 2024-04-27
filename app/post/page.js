"use client"

import React from "react";
import { getTokenFromLocalStorage, getUserFromToken } from "@/utils/auth";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Header from "@/components/header";

export default function Post() {

    const [data, setData] = React.useState([])
    const [post, setPost] = React.useState([])
    const [content, setContent] = React.useState('')

    const token = getTokenFromLocalStorage()

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/comments?idPost=${id}`);
                const apiData = await response.json();
                setData(apiData);
            } catch (error) {
                console.error('Erreur lors de la récupération des données de l\'API', error);
            }
        };
        const post = async () => {
            try {
                const postReponse = await fetch(`/api/posts?id=${id}`);
                const postData = await postReponse.json();
                setPost(postData);
            } catch (error) {
                console.error('Erreur lors de la récupération des données de l\'API', error);
            }
        }

        fetchData();
        post();
    }, []);

    async function sendData(e) {
        e.preventDefault();
        var data
        try {
            const response = await fetch('/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "idUser": getUserFromToken(token).id,
                    "content": content,
                    "idPost": parseInt(id)
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

    return (
        <main className="min-h-screen bg-white text-black">
            <ToastContainer />
            <Header />
            <div className="space-y-5 m-5">
                <form onSubmit={sendData} className="flex flex-col">
                    <label for="content">Ajouter un nouveau message :</label>
                    <input type="text" name="content" id="content" placeholder="Tapez ici..." onChange={(e) => setContent(e.target.value)} className="p-5 border-4 rounded-lg" />
                    <button type="submit" className="m-2">envoyer</button>
                </form>
                {post.map(item => (
                    <>
                        <div>
                            <h1>{item.username} a dit :</h1>
                            <h1>{item.content}</h1>
                        </div>
                    </>
                ))}
                {data.map(item => (
                    <>
                        <div>
                            <h2>{item.username} répond :</h2>
                            <h2>{item.content}</h2>
                        </div>
                    </>
                ))}
            </div>

        </main>
    )
}