import { useState} from 'react';
import sun from './assets/sun.png';
import { useSpring, animated } from 'react-spring';
import './App.css';
import CitySelector from './components/CitySelector/CitySelector.tsx';
import { weatherApiUrl, weatherApiKey } from "./API";
import WeatherBottomPanel from './components/WeatherBottomPanel/WeatherBottomPanel.tsx';
import CityWeather from "./components/CityWeather/CityWeather.tsx";
import CityWeatherData from "./types/CityWeatherData.tsx";

interface Option {
    value: string;
    label: string;
}
const App = () => {
    const [cityWeather, setCityWeather] = useState<CityWeatherData | null>(null);
    const [selectedCity, setSelectedCity] = useState<Option | null>(null);

    const fadeIn = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        config: { duration: 400 },
    });

    const handleSearchChange = (searchData: Option | null) => {
        if (searchData) {
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
                    setSelectedCity(searchData);
                })
                .catch(console.log);
        }
    };

    return (
        <div className="app-container">
            <div className="sun-container">
                <img className="sun-pic" src={sun} alt="sun" />
            </div>
            <animated.div style={fadeIn} className="content-container">
                <text className="header-text">Weather forecast</text>
                <CitySelector onSearchChange={handleSearchChange} />
                {selectedCity && cityWeather ? (
                    <CityWeather data={cityWeather} />
                ) : (
                    <WeatherBottomPanel weatherData={[]}/>
                )}
            </animated.div>
        </div>
    );
};

export default App;