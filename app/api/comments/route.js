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

  const items = await db.all("SELECT * FROM comments");

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

  db.run('INSERT INTO comments (idUser, content, idPost) VALUES (?, ?, ?)', [data.idUser, data.content, data.idPost], (err) => {
    if (err) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  })
  return NextResponse.json({ message: 'Données insérées avec succès' }, { status: 200 });
}
