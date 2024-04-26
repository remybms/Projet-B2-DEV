"use client"
import Header from "@/components/header";
import { getUserFromToken, getTokenFromLocalStorage, removeTokenFromLocalStorage } from "@/utils/auth";
import { useRouter } from "next/navigation";


export default function Profil(){

    const token = getTokenFromLocalStorage()
    const router = useRouter()
    const user = getUserFromToken(token)
  
    if (!token) {
      router.push('/login')
      return null;
    }

    return(
        <main className="min-h-screen bg-white text-black">
            <Header />
            <button onClick={removeTokenFromLocalStorage} className="m-10">Se déconnecter</button>
            <div>{user.username}</div>
            <div>{user.name}</div>
            <div>{user.surname}</div>
        </main>
    )
}