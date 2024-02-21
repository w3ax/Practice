import sunny from '../assets/sunny.svg';
import rainy from '../assets/rainy.svg';
import cloudy from '../assets/cloudy.svg';
import thunder from '../assets/thunder.svg';
import snowy from '../assets/snowy.svg';

const getWeatherImage = (weatherCondition: string) => {
    switch (weatherCondition) {
        case 'Clear':
            return sunny;
        case 'Rain':
            return rainy;
        case 'Clouds':
            return cloudy;
        case 'Thunderstorm':
            return thunder;
        case 'Snow':
            return snowy;
        default:
            return sunny;
    }
};

export default getWeatherImage;