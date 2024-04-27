import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { NextRequest, NextResponse } from "next/server";
import { Moderation } from "@/utils/moderation";

let db

export async function GET(req, res) {
  if (!db) {
    db = await open({
      filename: "./forum.db",
      driver: sqlite3.Database,
    });
  }


  const items = await db.all("SELECT comments.*, users.username FROM comments INNER JOIN users ON comments.idUser = users.id");

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

  if(Moderation(data.content) == "Not good"){
    return NextResponse.json({ error: "Mot interdit" }, { status: 500 });
  }

  db.run('INSERT INTO comments (idUser, content, idPost) VALUES (?, ?, ?)', [data.idUser, data.content, data.idPost], (err) => {
    if (err) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  })
  return NextResponse.json({ message: 'ok' }, { status: 200 });
}
