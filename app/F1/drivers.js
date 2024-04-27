"use client"

import React from "react";


export default function Drivers() {

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

    return (
        <main>
            {data.map(item => (
                <><div className="flex text-center items-center justify-between m-5">
                    <div>{item.position}</div>
                    <div>{item.driver.name}</div>
                    <div>n°{item.driver.number}</div>
                    <img src={item.driver.image} alt="photo du pilote" />
                    <img src={item.team.logo} alt="logo de l'équipe du pilote" />
                    {item.points ?
                        item.points == 1 ?
                            <div>1 point</div>
                            :
                            <div>{item.points} points</div>
                        :
                        <div>0 point</div>
                    }
                </div>
                </>
            ))}
        </main>
    )
}