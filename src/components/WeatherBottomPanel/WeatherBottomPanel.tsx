import React, {useEffect, useState} from 'react';
import './WeatherBottomPanel.css';
import CityWeatherData from '../../types/CityWeatherData.tsx';
import getWeatherImage from "../../functions/GetWeatherImage.tsx";
import {weatherApiKey, weatherApiUrl} from "../../API.ts";

interface WeatherBottomPanelProps {
    weatherData: CityWeatherData[];
}

const WeatherBottomPanel: React.FC<WeatherBottomPanelProps> = ({  }) => {
    const [weatherData, setWeatherData] = useState<CityWeatherData[]>([
        { city: 'Paris', id: 2988507 },
        { city: 'New York', id: 5128581 },
        { city: 'London', id: 2643743 },
        { city: 'Berlin', id: 2950159 },
        { city: 'Prague', id: 3067696 },
        { city: 'Tokyo', id: 1850147 },
        { city: 'Beijing', id: 1816670 },
        { city: 'Kyiv', id: 703448 },
    ]);
    useEffect(() => {
        const fetchWeatherData = async () => {
            const dataPromise = weatherData.map(async (item) => {
                const response = await fetch(
                    `${weatherApiUrl}/weather?id=${item.id}&appid=${weatherApiKey}&units=metric`
                );
                const weatherResponse = await response.json();
                return {
                    city: item.city,
                    temperature: weatherResponse.main.temp,
                    weatherCondition: weatherResponse.weather[0].main,
                    imageAlt: `${item.city} weather`,
                };
            });
            const newData = await Promise.all(dataPromise);
            setWeatherData(newData.map(item => ({
                ...item,
                id: Math.random(),
            })));
        };
        fetchWeatherData();
    }, [weatherData]);
    return (
        <div className="bottom-panel">
            {weatherData.map((item, index) => (
                <div key={index} className="panel-section">
                    {(item.temperature !== undefined && !isNaN(item.temperature)) && (
                        <>
                            <img
                                className="weather-panel-pic"
                                src={getWeatherImage(item.weatherCondition as string)}
                                alt={item.imageAlt}
                            />
                            <text className="temp">{`${Math.round(item.temperature)}°C`}</text>
                        </>
                    )}
                    <text className="city-name">{item.city}</text>
                </div>
            ))}
        </div>
    );
};

export default WeatherBottomPanel;