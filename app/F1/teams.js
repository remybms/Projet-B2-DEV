"use client"

import React from "react";

export default function Teams() {

    const [data, setData] = React.useState([])

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/teams-standings');
                const apiData = await response.json();
                setData(apiData.teams.response);
            } catch (error) {
                console.error('Erreur lors de la récupération des données de l\'API', error);
            }
        };

        fetchData();
    }, []);

    return (
        <main>
            {data.map(item => (
                <><div className="flex text-center items-center justify-between m-5">
                    <div>{item.position}</div>
                    <div>{item.team.name}</div>
                    <img src={item.team.logo} alt="logo de l'équipe du pilote" />
                    {item.points <= 1 ?
                            <div>{item.points} point</div>
                            :
                            <div>{item.points} points</div>
                    }
                </div>
                </>
            ))}
        </main>
    )
}