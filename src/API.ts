export const cityApiUrl: string = 'https://wft-geo-db.p.rapidapi.com/v1/geo';

export const cityApiOptions: RequestInit = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'ac08ec71dcmsha8cce6246e7e22ap189ca5jsn7e9629dff922',
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    }
};

export const weatherApiUrl = "https://api.openweathermap.org/data/2.5";
export const weatherApiKey = "abde5337695fa7f1fe7e122a74ddf401";