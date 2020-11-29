import { FormControl, MenuItem, Select } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [countries, setCountries] = useState(['USA', 'UK', 'INDIA']);
  const [country, setCountry] = useState('worldwide');
  // first useEffect hook to call the api
  useEffect(() => {
    const getCountriesData = async () => {
      const url = 'https://disease.sh/v3/covid-19/countries';
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          // console.log('DATAAAAAAAAAAAAAA', data[10]);
          const countries = data.map((country) => ({
            name: country.country, // United Kingdom, INDIA
            value: country.countryInfo.iso2, // UK,IND
          }));
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  return (
    <div className="App">
      <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value={country}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default App;
