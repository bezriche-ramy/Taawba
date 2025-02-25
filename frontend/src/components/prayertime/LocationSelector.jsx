import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './LocationSelector.css';
import islamicCountries from '../../pages/islamiccontrys.json';

const LocationSelector = ({ selectedCountry, selectedCity, onCountryChange, onCityChange }) => {
  const [countryOptions, setCountryOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  useEffect(() => {
    // Map all countries from the JSON file to the options array
    const newCountryOptions = islamicCountries.map(country => ({
      value: country.country,
      label: country.country
    }));
    setCountryOptions(newCountryOptions);

    // Find the selected country's data
    const selectedCountryData = islamicCountries.find(country => country.country === selectedCountry);
    if (selectedCountryData) {
      // Map the cities to the options array
      const newCityOptions = selectedCountryData.cities.map(city => ({
        value: city,
        label: city
      }));
      setCityOptions(newCityOptions);
    }
  }, [selectedCountry]); // Add selectedCountry as a dependency

  const handleCountryChange = (selectedOption) => {
    const country = selectedOption.value;
    onCountryChange(country);

    const selectedCountryData = islamicCountries.find(c => c.country === country);
    if (selectedCountryData) {
      const newCityOptions = selectedCountryData.cities.map(city => ({
        value: city,
        label: city
      }));
      setCityOptions(newCityOptions);
      onCityChange(newCityOptions[0].value); // Select the first city by default
    } else {
      setCityOptions([]);
      onCityChange('');
    }
  };

  const handleCityChange = (selectedOption) => {
    onCityChange(selectedOption.value);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'white',
      border: '2px solid #ddd',
      borderRadius: '30px',
      padding: '8px 16px',
      fontSize: '16px',
      fontWeight: '500',
      color: '#333',
      cursor: 'pointer',
      boxShadow: state.isFocused ? '0 0 0 2px #00968840' : null,
      borderColor: state.isFocused ? '#009688' : '#ddd',
      '&:hover': {
        borderColor: '#009688',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: '16px',
      color: '#333',
      backgroundColor: state.isFocused ? '#00968820' : null,
      '&:hover': {
        backgroundColor: '#00968820',
        cursor: 'pointer',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#333',
      fontSize: '16px',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#777',
      fontSize: '16px',
    }),
    indicatorSeparator: () => null, // Remove the separator line
  };

  return (
    <div className="location-selector">
      <div className="select-group">
        <Select
          options={countryOptions}
          onChange={handleCountryChange}
          styles={customStyles}
          placeholder="Country" // Changed placeholder text
          isSearchable
        />
      </div>
      <div className="select-group">
        <Select
          options={cityOptions}
          onChange={handleCityChange}
          styles={customStyles}
          placeholder="City" // Changed placeholder text
          isSearchable
        />
      </div>
    </div>
  );
};

export default LocationSelector;
