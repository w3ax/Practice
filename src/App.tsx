import { ChangeEvent, useRef, useEffect, useState } from 'react';
import sun from '/sun.png';
import sunny from '/sunny.svg';
import rainy from '/rainy.svg';
import cloudy from '/cloudy.svg';
import { Image, Box, Text } from '@chakra-ui/react';
import './App.css';

const App = () => {
    const WeatherPanel = () => {
        const [weatherData] = useState([
            { city: 'Paris', temperature: 9, weatherCondition: 'rainy', imageAlt: 'Опис картинки Парижа' },
            { city: 'New York', temperature: 15, weatherCondition: 'sunny', imageAlt: 'Опис картинки Нью-Йорка' },
            { city: 'London', temperature: 12, weatherCondition: 'cloudy', imageAlt: 'Опис картинки Лондона' },
            { city: 'Berlin', temperature: 10, weatherCondition: 'rainy', imageAlt: 'Опис картинки Берліна' },
            { city: 'Prague', temperature: 14, weatherCondition: 'cloudy', imageAlt: 'Опис картинки Праги' },
            { city: 'Tokyo', temperature: 20, weatherCondition: 'sunny', imageAlt: 'Опис картинки Токіо' },
            { city: 'Beijing', temperature: 16, weatherCondition: 'rainy', imageAlt: 'Опис картинки Пекіна' },
            { city: 'Kyiv', temperature: 8, weatherCondition: 'cloudy', imageAlt: 'Опис картинки Києва' },
        ]);

        return (
            <Box className="bottom-panel">
                {weatherData.map((item, index) => (
                    <Box key={index} className="panel-section">
                        <Image className="weather-panel-pic" src={getWeatherImage(item.weatherCondition)} alt={item.imageAlt} mb={2} />
                        <Text className="temperature">{`${item.temperature}°C`}</Text>
                        <Text className="city-name">{item.city}</Text>
                    </Box>
                ))}
            </Box>
        );
    };

    const getWeatherImage = (weatherCondition: string) => {
        switch (weatherCondition) {
            case 'sunny':
                return sunny;
            case 'rainy':
                return rainy;
            case 'cloudy':
                return cloudy;
            default:
                return sunny;
        }
    };

    const CitySelector = () => {
        const cityList = [
            'Kyiv', 'Lviv', 'Khmelnytskiy', 'New York', 'Paris', 'London', 'Berlin', 'Prague', 'Tokyo', 'Beijing'
        ];

        const [filter, setFilter] = useState('');
        const [selectedCity, setSelectedCity] = useState('');
        const [isOpen, setIsOpen] = useState(false);
        const menuRef = useRef<HTMLDivElement>(null);

        const handleToggleMenu = () => {
            setIsOpen(!isOpen);
        };

        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            setFilter(value);
            setSelectedCity(value);
            setIsOpen(true);
        };

        const handleSelect = (city: string) => {
            setSelectedCity(city);
            setFilter('');
            setIsOpen(false);
        };

        const handleDocumentClick = (e: MouseEvent) => {
            if (isOpen && menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        useEffect(() => {
            document.addEventListener("mousedown", handleDocumentClick);

            return () => {
                document.removeEventListener("mousedown", handleDocumentClick);
            };
        }, [isOpen]);

        const filteredCities = cityList.filter(city =>
            city.toLowerCase().includes(filter.toLowerCase())
        );

        return (
            <div className="city-selector-container" ref={menuRef}>
                <input
                    type="text"
                    placeholder="Type or select"
                    value={selectedCity || filter}
                    onChange={handleChange}
                    onFocus={handleToggleMenu}
                    onClick={(e) => e.stopPropagation()}
                />
                {isOpen && (
                    <ul className="city-selector-list">
                        {filteredCities.map(city => (
                            <li key={city} onClick={() => handleSelect(city)}>
                                {city}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
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
                <Image
                    className="sun-pic"
                    src={sun}
                    alt="sun"
                />
            </Box>
            <Box className="content-container">
                <Text className="header-text">Weather forecast</Text>
                <CitySelector />
            </Box>
            <WeatherPanel/>
        </Box>
    );
};

export default App;
