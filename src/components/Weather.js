import React from "react";

import "../styles/Weather.scss"

function Weather({ weather }) {
    // Группировка по датам
    const groupedByDate = weather.forecast.reduce((acc, item) => {
        const date = item.date.split(',')[0]; // Из "04.05.2025, 12:00" берём только "04.05.2025"
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(item);
        return acc;
    }, {});

    return (
        <div className="weather-multiday">
            <h2>{weather.city}, {weather.region}</h2>
            {/* Текущая погода */}
            <div className="current-weather">
                <h3>Сейчас ({weather.current.date})</h3>
                <div className="weather-info">
                    <p>Температура: {Math.round(weather.current.temp)}°C</p>
                    <p>Ощущается как: {Math.round(weather.current.feels_like)}°C</p>
                    <p>{weather.current.description}</p>
                    <img
                        src={`https://openweathermap.org/img/wn/${weather.current.icon}@2x.png`}
                        alt="Погодная иконка"
                    />
                </div>
            </div>
            {/* Прогноз по дням */}
            <div className="weather-columns">
                {Object.entries(groupedByDate).map(([date, items]) => (
                    <div key={date} className="weather-day-column">
                        <h3>{date}</h3>
                        {items.map((item, index) => (
                            <div key={index} className="weather-hour">
                                <p><strong>{item.date.split(',')[1].trim()}</strong></p>
                                <p>Температура: {Math.round(item.temp)}°C</p>
                                <p>Ощущается: {Math.round(item.feels_like)}°C</p>
                                <p>{item.description}</p>
                                <img
                                    src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                                    alt="Погодная иконка"
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}


export default Weather;
