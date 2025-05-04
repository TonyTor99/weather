import React, { useState } from "react";
import Header from "./Header";
import Main from "./Main";

function App() {
    const [weather, setWeather] = useState(null);
    console.log("Переменная: ", weather);

    return (
        <div className="app-container">
            <Header setWeather={setWeather} />
            <Main weather={weather} />
        </div>
    );
}

export default App;