import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { NextRequest, NextResponse } from "next/server";

let db

export async function GET(req, res) {
  if (!db) {
    db = await open({
      filename: "./collection.db",
      driver: sqlite3.Database,
    });
  }

  const items = await db.all("SELECT * FROM posts");

  return NextResponse.json(items, { status: 200 });
}

export async function POST(req, res) {
  if (!db) {
    db = await open({
      filename: "./collection.db",
      driver: sqlite3.Database,
    });
  }

  const data = await req.json();

  db.run('INSERT INTO posts (idUser, content) VALUES (?, ?)', [data.idUser, data.content], (err) => {
    if (err) {
      // En cas d'erreur, renvoyer un code d'erreur 500
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  })
  // En cas de succès, renvoyer un code de réussite 200
  return NextResponse.json({ message: 'Données insérées avec succès' }, { status: 200 });
}
