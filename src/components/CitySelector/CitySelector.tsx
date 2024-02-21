import React, { useState, ReactElement, useEffect } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { cityApiOptions, cityApiUrl } from "../../API.ts";
import "./CitySelector.css";

interface City {
    latitude: string;
    longitude: string;
    name: string;
    countryCode: string;
}

interface Option {
    value: string;
    label: string;
}

interface CitySelectorProps {
    onSearchChange: (searchData: Option | null) => void;
    className?: string;
}

const CitySelector: React.FC<CitySelectorProps> = ({ onSearchChange }): ReactElement => {
    const [search, setSearch] = useState<Option | null>(null);
    const [moveUp, setMoveUp] = useState(false);

    const loadOptions = async (inputValue: string): Promise<{ options: Option[] }> => {
        const response = await fetch(
            `${cityApiUrl}/cities?minPopulation=250000&limit=6&namePrefix=${inputValue}&types=CITY`,
            cityApiOptions
        );
        const response_1 = await response.json();

        const uniqueCities: Record<string, boolean> = {};
        const options: Option[] = [];

        response_1.data.forEach((city: City) => {
            const cityIdentifier = `${city.name} ${city.countryCode}`;

            if (!uniqueCities[cityIdentifier]) {
                uniqueCities[cityIdentifier] = true;
                options.push({
                    value: `${city.latitude} ${city.longitude}`,
                    label: `${city.name}, ${city.countryCode}`,
                });
            }
        });

        return { options };
    };

    const handleOnChange = (searchData: Option | null): void => {
        setSearch(searchData);
        onSearchChange(searchData);
        setMoveUp(true);
    };

    useEffect(() => {
        if (moveUp) {
            const citySelectorContainer = document.querySelector('.city-selector-container');
            if (citySelectorContainer) {
                citySelectorContainer.classList.add('move-up');
            }
        }
    }, [moveUp]);

    return (
        <AsyncPaginate
            className={`city-selector-container ${moveUp ? 'move-up' : ''}`}
            placeholder="Search"
            debounceTimeout={500}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    );
};

export default CitySelector;