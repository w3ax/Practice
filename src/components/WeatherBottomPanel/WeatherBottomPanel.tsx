import React from 'react';
import { Image, Box, Text } from '@chakra-ui/react';
import sunny from '/sunny.svg';
import rainy from '/rainy.svg';
import cloudy from '/cloudy.svg';
import './WeatherBottomPanel.css';
import CityWeatherData from '../../types/CityWeatherData.tsx';

interface WeatherBottomPanelProps {
    weatherData: CityWeatherData[];
}

const WeatherBottomPanel: React.FC<WeatherBottomPanelProps> = ({ weatherData }) => {
    const getWeatherImage = (weatherCondition: string) => {
        switch (weatherCondition) {
            case 'Clear':
                return sunny;
            case 'Rain':
                return rainy;
            case 'Clouds':
                return cloudy;
            default:
                return sunny;
        }
    };

    return (
        <Box className="bottom-panel">
            {weatherData.map((item, index) => (
                <Box key={index} className="panel-section">
                    {(item.temperature !== undefined && !isNaN(item.temperature)) && (
                        <>
                            <Image
                                className="weather-panel-pic"
                                src={getWeatherImage(item.weatherCondition as string)}
                                alt={item.imageAlt}
                                mb={2}
                            />
                            <Text className="temp">{`${Math.round(item.temperature)}°C`}</Text>
                        </>
                    )}
                    <Text className="city-name">{item.city}</Text>
                </Box>
            ))}
        </Box>
    );
};

export default WeatherBottomPanel;