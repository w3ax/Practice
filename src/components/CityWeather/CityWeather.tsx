import React from "react";
import "./CityWeather.css";
import CityWeatherData from '../../types/CityWeatherData';

interface CityWeatherProps {
    data: CityWeatherData;
}

const CityWeather: React.FC<CityWeatherProps> = ({ data }) => {
    return (
        <div className="weather">
            <div className="top">
                <div>
                    <p className="city">{data.city}</p>
                    <p className="weather-description">{data.weather && data.weather[0]?.description}</p>
                </div>
                <img
                    alt="weather"
                    className="weather-icon centered"
                    src={data.weather && `icons/${data.weather[0]?.icon}.png`}
                />
            </div>
            <div className="bottom">
                <p className="temperature">{Math.round(data.main?.temp || 0)}°C</p>
                <div className="details">
                    <div className="parameter-row">
                        <span className="parameter-label subtle">Details</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label subtle">Feels like: </span>
                        <span className="parameter-value">
                            {Math.round(data.main?.feels_like || 0)}°C
                        </span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label subtle">Wind: </span>
                        <span className="parameter-value">{data.wind?.speed} m/s</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label subtle">Humidity: </span>
                        <span className="parameter-value">{data.main?.humidity}%</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label subtle">Pressure: </span>
                        <span className="parameter-value">{data.main?.pressure} hPa</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CityWeather;