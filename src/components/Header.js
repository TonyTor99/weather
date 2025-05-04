import React, {useState} from "react";
import Select from "react-select";
import "../styles/Header.scss";
import axios from "axios";

function Header({setWeather}) {
    const [options, setOptions] = useState([]);

    const handleChange = (selectedOption) => {
        const {lat, lon, city, region} = selectedOption.value;
        const token = "f832988405f4e5088dea4a95e37936c9";
        const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=ru&appid=${token}`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=ru&appid=${token}`;

        Promise.all([
            axios.get(currentUrl),
            axios.get(forecastUrl)
        ])
            .then(([currentResponse, forecastResponse]) => {
                console.log("currentResponse: ", currentResponse);
                const currentWeather = {
                    temp: currentResponse.data.main.temp,
                    feels_like: currentResponse.data.main.feels_like,
                    description: currentResponse.data.weather[0].description,
                    icon: currentResponse.data.weather[0].icon,
                    date: new Date(currentResponse.data.dt * 1000).toLocaleString("ru-RU", ({
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })),
                }

                console.log("forecastResponse: ", forecastResponse.data);
                const forecast = forecastResponse.data.list.map(day => ({
                    date: new Date(day.dt * 1000).toLocaleString("ru-RU", {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    }),
                    temp: day.main.temp,
                    feels_like: day.main.feels_like,
                    description: day.weather[0].description,
                    icon: day.weather[0].icon,
                }));

                setWeather({
                    city,
                    region,
                    current: currentWeather,
                    forecast,
                });
            })
            .catch(error => {
                console.error('Ошибка при получении погоды:', error.message);
            });
    };

    const handleInputChange = (newValue) => {
        const token = "d3ba576dfc04e017b9b69e8afff2eec1a3be17b8";

        axios.post('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {
            query: newValue,
            count: 3,
            locations: [{country_iso_code: 'RU'}]
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
            .then(response => {
                const suggestions = response.data.suggestions;

                const formatted = suggestions.map(item => ({
                    value: {
                        city: item.data.city,
                        region: item.data.region_with_type,
                        lat: item.data.geo_lat,
                        lon: item.data.geo_lon
                    },
                    label: item.data.city !== null ? `${item.data.city}, ${item.data.region_with_type}` : '',
                }));
                setOptions(formatted);
            })
            .catch(error => {
                console.error('Ошибка при запросе к Dadata:', error.message);
            });
    };

    return (
        <header className="header-container">
            <h1>Weather</h1>
            <div className="search-city">
                <Select
                    options={options}
                    onChange={handleChange}
                    placeholder="Выберите город"
                    isSearchable
                    onInputChange={handleInputChange}
                    noOptionsMessage={() => 'Город не найден'}
                />
            </div>
        </header>
    );
}

export default Header;
