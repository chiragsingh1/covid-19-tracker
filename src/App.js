import { 
  Card, 
  CardContent, 
  FormControl, 
  MenuItem, 
  Select 
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import InfoBox from './InfoBox';
import './App.css';
import Map from './Map';

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

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    // console.log('COUNTRYCODE', countryCode);
    setCountry(countryCode);
  };

  return (
    <div className="app">

      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" cases={95566} total={3023334} />

          <InfoBox title="Recovered" cases={3389} total={285509} />

          <InfoBox title="Deaths" cases={23} total={68091} />
        </div>
        
        {/* Map */}
        <Map />

      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          {/* Table */}
          <h3>Wordlwide New Cases</h3>
          {/* Graph */}
        </CardContent>
                
      </Card>
    </div>
  );
}

export default App;
