"use client"

import Header from "@/components/header";
import React from "react";
import Drivers from "./drivers";
import Teams from "./teams";

export default function F1() {

  const [standings, setStandings] = React.useState("drivers");

  const driversDisplay = () => {
    setStandings("drivers");
  };
  const teamsDisplay = () => {
    setStandings("teams");
  };

  return (
    <main className="min-h-screen bg-white text-black">
      <Header />
      <div className="flex space-x-5 m-5 text-xl">
        <button onClick={driversDisplay} className="border-4 focus:border-black p-2 rounded-lg">Pilotes</button>
        <button onClick={teamsDisplay} className="border-4 focus:border-black p-2 rounded-lg">Écuries</button>
      </div>
      <div className="">
        {standings === "drivers" && <Drivers />}
        {standings === "teams" && <Teams />}
      </div>
    </main>
  )
}