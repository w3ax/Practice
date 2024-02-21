import React from "react";
import "./CityWeather.css";
import CityWeatherData from '../../types/CityWeatherData';
import getWeatherImage from "../../functions/GetWeatherImage.tsx";
import WeatherBottomPanel from '../WeatherBottomPanel/WeatherBottomPanel.tsx';

interface CityWeatherProps {
    data: CityWeatherData;
}

const CityWeather: React.FC<CityWeatherProps> = ({ data }) => {

    return (
        <div className="weather">
            <div className="Box">
                <div className="city-info">
                    <p className="city">{data.city}</p>
                    <p className="weather-description">{data.weather && data.weather[0]?.description}</p>
                </div>
                <div className="temperature">{Math.round(data.main?.temp || 0)}°C</div>
                <img
                    alt="weather"
                    className="weather-icon"
                    src={data.weather && data.weather[0]?.main && getWeatherImage(data.weather[0]?.main)}
                />
                <div className="details">
                    <div className="parameter-row">
                        <span className="parameter-label subtle">Feels like:</span>
                        <span className="parameter-value subtle">
                                {Math.round(data.main?.feels_like || 0)}°C
                            </span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label subtle">Wind:</span>
                        <span className="parameter-value subtle">{data.wind?.speed} m/s</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label subtle">Humidity:</span>
                        <span className="parameter-value subtle">{data.main?.humidity}%</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label subtle">Pressure:</span>
                        <span className="parameter-value subtle">{data.main?.pressure} hPa</span>
                    </div>
                </div>
            </div>
            <div className="divider-line-vertical"></div>
            <div className="divider-line-horizontal"></div>
            <WeatherBottomPanel weatherData={[]}/>
        </div>
    );

};

export default CityWeather;