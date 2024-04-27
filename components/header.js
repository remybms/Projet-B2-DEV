import Link from "next/link";
import { getTokenFromLocalStorage } from "@/utils/auth";

export default function Header() {

    const token = getTokenFromLocalStorage()

    return (
        <main className="flex text-black p-10 mb-5 justify-around max-w-screen">
            <Link href="/">Forum</Link>
            <Link href="/F1">Formule 1</Link>
            {token == null ?
                <><Link href="/login">Se connecter</Link>
                    <Link href="/signin">S'inscrire</Link></>
                :
                <Link href="/profil">Profil</Link>
            }

        </main>
    )
}