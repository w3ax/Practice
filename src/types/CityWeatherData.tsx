interface CityWeatherData {
    city: string;
    id: number;
    temperature?: number;
    weatherCondition?: string;
    imageAlt?: string;
    weather?: {
        description: string;
        icon: string;
    }[];
    main?: {
        temp: number;
        feels_like: number;
        humidity: number;
        pressure: number;
    };
    wind?: {
        speed: number;
    };
}

export default CityWeatherData;