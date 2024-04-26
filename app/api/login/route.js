import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { NextResponse } from "next/server";

let db

export async function POST(req, res) {
    if (!db) {
        db = await open({
            filename: "./collection.db",
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
            return NextResponse.json({ message: "ok" }, { status: 200 });
        }
    }

}