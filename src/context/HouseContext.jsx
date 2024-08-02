import React, { useState, useEffect, createContext } from 'react';
// Data import
import { housesData } from '../constants/data';

// Create context
export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState(housesData);
  const [country, setCountry] = useState('Location(any)');
  const [countries, setCountries] = useState([]);
  const [property, setProperty] = useState('PropertyType(any)');
  const [properties, setProperties] = useState([]);
  const [price, setPrice] = useState('Price range(any)');
  const [loading, setLoading] = useState(false);

  // Returning the locations
  useEffect(() => {
    // Extract locations from houses
    const allCountries = houses.map((house) => house.country);

    // Remove duplicates and add 'Location (any)'
    const uniqueCountries = ['Location (any)', ...new Set(allCountries)];

    // Set locations state
    setCountries(uniqueCountries);
  }, [houses]);

  // Return all properties
  useEffect(() => {
    // Extract properties from houses
    const allProperties = houses.map((house) => house.type);

    // Remove duplicates and add 'Type (any)'
    const uniqueProperties = ['Type (any)', ...new Set(allProperties)];

    // Set properties state
    setProperties(uniqueProperties);
  }, [houses]);

  useEffect(() => {
    setLoading(true);

    const isDefault = (str) => {
      return str.includes('any');
    };

    const minPrice = parseInt(price.split(' ')[0]) || 0;
    const maxPrice = parseInt(price.split(' ')[2]) || Infinity;

    const newHouses = housesData.filter((house) => {
      const housePrice = parseInt(house.price);

      // If all values are selected
      if (
        house.country === country &&
        house.type === property &&
        housePrice >= minPrice &&
        housePrice <= maxPrice
      ) {
        return true;
      }

      // If all values are default
      if (isDefault(country) && isDefault(property) && isDefault(price)) {
        return house;
      }

      // If only country is not default
      if (!isDefault(country) && isDefault(property) && isDefault(price)) {
        return house.country === country;
      }

      // If only property is not default
      if (!isDefault(property) && isDefault(country) && isDefault(price)) {
        return house.type === property;
      }

      // If only price is not default
      if (!isDefault(price) && isDefault(country) && isDefault(property)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house;
        }
      }

      // If country and property are not default
      if (!isDefault(country) && !isDefault(property) && isDefault(price)) {
        return house.country === country && house.type === property;
      }

      // If country and price are not default
      if (!isDefault(country) && isDefault(property) && !isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.country === country;
        }
      }

      // If property and price are not default
      if (isDefault(country) && !isDefault(property) && !isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.type === property;
        }
      }

      // Default return false
      return false;
    });

    // Update the properties and locations based on the filtered houses
    const filteredCountries = ['Location (any)', ...new Set(newHouses.map((house) => house.country))];
    const filteredProperties = ['Type (any)', ...new Set(newHouses.map((house) => house.type))];

    setCountries(filteredCountries);
    setProperties(filteredProperties);

    setTimeout(() => {
      setHouses(newHouses.length < 1 ? [] : newHouses);
      setLoading(false);
    }, 1000);
  }, [country, property, price]);

  return (
    <HouseContext.Provider
      value={{
        houses,
        setHouses,
        country,
        setCountry,
        countries,
        setCountries,
        property,
        setProperty,
        properties,
        setProperties,
        price,
        setPrice,
        loading,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;
