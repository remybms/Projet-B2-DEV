import Link from "next/link";

export default function Header(){
    return(
    <main className="flex text-black p-10 mb-5 justify-around w-screen">
        <Link href="/">Forum</Link>
        <Link href="/F1">Formule 1</Link>
        <Link href="/login">Se connecter</Link>
        <Link href="/signin">S'inscrire</Link>
    </main>
    )
}