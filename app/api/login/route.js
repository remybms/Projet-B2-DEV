import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { NextResponse } from "next/server";
import { generateToken } from "@/utils/auth"; // Importez votre fonction generateToken depuis votre fichier utilitaire d'authentification

let db;

export async function POST(req, res) {
    if (!db) {
        db = await open({
            filename: "./forum.db",
            driver: sqlite3.Database,
        });
    }

    const data = await req.json();

    const existingUser = await db.get("SELECT * FROM users WHERE mail = ?", data.mail);

    if (!existingUser) {
        return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
    } else {
        if(data.password != existingUser.password){
            return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 500 });
        } else {
            // Si les informations d'identification sont correctes, générez un token JWT
            const token = generateToken(existingUser);
            // Vous pouvez ensuite envoyer le token en réponse si nécessaire, ou le sauvegarder dans le stockage local du navigateur, etc.
            return NextResponse.json({message: "ok", token: token }, { status: 200 });
        }
    }
}
