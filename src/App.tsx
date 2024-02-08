import { ChangeEvent, useState } from 'react';
import sun from '/sun.png';
import { Image, Select, Box, Text } from '@chakra-ui/react';
import './App.css';

const App = () => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
    };

    return (
        <Box
            className="app-container"
            minH="100vh"
            bgGradient="linear(to right, rgba(159,212,151,1) 0%, rgba(247,249,255,1) 50%, rgba(126,188,200,1) 100%)"
            animation="gradient 30s infinite linear"
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
                <Select
                    className="select-city"
                    variant='filled'
                    value={selectedOption}
                    onChange={handleSelectChange}
                    w="350px"
                    h="60px"
                >
                    <option value='' disabled hidden>Select a city</option>
                    <option value='city1'>Kyiv</option>
                    <option value='city2'>Lviv</option>
                    <option value='city3'>Khmelnytskiy</option>
                </Select>
            </Box>
        </Box>
    );
};

export default App;
