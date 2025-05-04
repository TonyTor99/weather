import React from "react";
import Weather from "./Weather";

import "../styles/Main.scss"

function Main({ weather }) {
    return (
        <main className="main-container">
            {weather ? (
                <Weather weather={weather} />
            ) : (
                <p>Выберите город для просмотра погоды.</p>
            )}
        </main>
    );
}

export default Main;