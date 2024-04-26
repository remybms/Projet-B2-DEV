"use client"

import React from "react";
import { getTokenFromLocalStorage, getUserFromToken } from "@/utils/auth";

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
            }

        } catch (error) {
            console.error('Erreur lors de l\'envoi des données à l\'API :', error);
        }
    }

    return (
        <main className="min-h-screen bg-white text-black">
            <form onSubmit={sendData}>
                <input type="text" placeholder="add a comment" onChange={(e) => setContent(e.target.value)} />
                <button type="submit">envoyer</button>
            </form>
            {post.map(item => (
                <><h1>{item.username} a dit :</h1>
                <h1>{item.content}</h1></>
            ))}
            {data.map(item => (
                <>
                    <h2>{item.username} répond :</h2>
                    <h2>{item.content}</h2>
                </>
            ))}
        </main>
    )
}