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

    const existingUser = await db.get("SELECT username FROM users WHERE mail = ?", data.mail);

    if (existingUser) {
        return NextResponse.json({ error: "Utilisateur déjà présent" }, { status: 404 });
    }

    db.run('INSERT INTO users (username, name, surname, mail, password) VALUES (?, ?, ?, ?, ?)', [data.username, data.name, data.surname, data.mail, data.password], (err) => {
        if (err) {
            return NextResponse.json({ error: err.message }, { status: 500 });
        }
    })
    return NextResponse.json({ message: 'ok' }, { status: 200 });
}