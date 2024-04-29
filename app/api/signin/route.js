import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { NextResponse } from "next/server";
import { generateToken } from "@/utils/auth";

let db

export async function POST(req, res) {
    if (!db) {
        db = await open({
            filename: "./forum.db",
            driver: sqlite3.Database,
        });
    }

    const data = await req.json();

    const existingUser = await db.get("SELECT username FROM users WHERE mail = ? OR username = ?", data.mail, data.username);

    if (existingUser) {
        return NextResponse.json({ error: "Utilisateur déjà présent" }, { status: 500 });
    }

    db.run('INSERT INTO users (username, name, surname, mail, password) VALUES (?, ?, ?, ?, ?)', [data.username, data.name, data.surname, data.mail, data.password], (err) => {
        if (err) {
            return NextResponse.json({ error: err.message }, { status: 500 });
        }
    })
    const newUser = await db.get("SELECT * FROM users WHERE mail = ?", data.mail);
    const token = generateToken(newUser);
    return NextResponse.json({ message: "ok", token: token }, { status: 200 });
}