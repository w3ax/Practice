import { useState, useEffect } from 'react';
import sun from '/sun.png';
import { Image, Box, Text } from '@chakra-ui/react';
import './App.css';
import CitySelector from './components/CitySelector/CitySelector.tsx';
import { weatherApiUrl, weatherApiKey } from "./API";
import WeatherBottomPanel from './components/WeatherBottomPanel/WeatherBottomPanel.tsx';
import CityWeather from "./components/CityWeather/CityWeather.tsx";
import CityWeatherData from "./types/CityWeatherData.tsx";

const App = () => {
    const [cityWeather, setCityWeather] = useState<CityWeatherData>({
        id: 0,
        temperature: 0,
        city: '',
        weatherCondition: '',
        imageAlt: '',
        weather: [],
        main: {
            temp: 0,
            feels_like: 0,
            humidity: 0,
            pressure: 0,
        },
        wind: {
            speed: 0,
        },
    });
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

    const handleSearchChange = (searchData: any) => {
        const [lat, lon] = searchData.value.split(" ");
        const cityWeatherFetch = fetch(
            `${weatherApiUrl}/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`
        );
        Promise.all([cityWeatherFetch])
            .then(async (responses) => {
                const weatherResponse = await responses[0].json();
                setCityWeather({
                    id: Math.random(),
                    city: searchData.label,
                    imageAlt: `${searchData.label} weather`,
                    temperature: weatherResponse.main.temp,
                    weatherCondition: weatherResponse.weather[0].main,
                    weather: weatherResponse.weather,
                    main: weatherResponse.main,
                    wind: weatherResponse.wind,
                });
            })
            .catch(console.log);
    };

    return (
        <Box
            className="app-container"
            minH="100vh"
            bgGradient="linear(to right, rgba(159,212,151,100) 0%, rgba(255,238,208,0.8) 50%, rgba(126,188,200,100) 100%)"
            animation="gradient 70s infinite linear"
            bgSize="700% 700%"
        >
            <Box className="sun-container">
                <Image className="sun-pic" src={sun} alt="sun" />
            </Box>
            <Box className="content-container">
                <Text className="header-text">Weather forecast</Text>
                <CitySelector onSearchChange={handleSearchChange} />
                {cityWeather && <CityWeather data={cityWeather} />}
            </Box>
            <WeatherBottomPanel weatherData={weatherData} />
        </Box>
    );
};

export default App;