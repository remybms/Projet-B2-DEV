"use client"

import Header from "@/components/header";
import React from "react";

export default function F1(){

    const [data, setData] = React.useState([])

    React.useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('/api/drivers-standings');
            const apiData = await response.json();
            setData(apiData.teams.response);
          } catch (error) {
            console.error('Erreur lors de la récupération des données de l\'API', error);
          }
        };
        
        fetchData();
      }, []);

    return(
        <main className="min-h-screen bg-white text-black">
            <Header />
        {data.map(item => (
            <><div className="flex">
            <div>{item.position}</div>
            <div>{item.driver.name}</div>
            <div>{item.driver.number}</div>
            <img src={item.driver.image} alt="photo du pilote"/>
            <img src={item.team.logo} alt="logo de l'équipe du pilote"/>
            </div>
            </>
        ))}
        </main>
    )
}