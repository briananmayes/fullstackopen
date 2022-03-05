import { useState, useEffect } from "react";
import axios from 'axios';

const CountryView = ({countries}) => {
  let country = [];
  country.push(countries);
  console.log('in country view', country);
  //const languages = countries.languages;
  return (
    <CountryShort countries={country} />

  )
}
const CountryShort = ({countries}) => {
  console.log('countryShort ', countries);
  const languages = countries[0].languages;
  console.log(languages);
  return (
    <div>
   <Country countries={countries} />
    <h5>languages spoken:</h5>
    <Languages languages={languages}/>
    </div>
  )
}

const Country = ({countries}) => {
  console.log('single country..', countries);
  return (
  <div>
      <h1>{countries[0].name.common}</h1>
      <img src={countries[0].flags.png} alt="Country's flag"/>
      <p>{countries[0].capital}</p>
      <p>area {countries[0].area}</p>
      </div>
  )
}

const Weather = ({countries}) => {
  return (
    <h2>Weather in {countries.capital}</h2>

  )
}

const Filter = (props) => {
  return (
  <div>find countries
    <input value={props.filter} onChange={props.search}/>
    </div>
  )
}

const Languages = ({languages}) => {
  for (const lang in languages) 
  return <li>{languages[lang]}</li>
}

const Countries = ({countries, click, view, latlon}) => {
  console.log(countries);
  if(countries.length > 10) {
    return <p>Too many search results, please refine your search.</p>
  }
  if(countries.length === 1) {
    //const languages = countries[0].languages;
    //console.log(languages);
    return (
      <CountryShort countries={countries} />
    )
  }
  return countries.map((country) => {
    return ( 
    <div key={country.ccn3}>
    <p>{country.name.common} 
    <button onClick={() => {
      click(true);
      view(country);
      latlon(country.latlng);
      console.log('the lat lon is', country.latlng);
    }}>
      show
    </button>
    </p> 
    </div> 
    )
  })
}

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterBy, setFilterBy] = useState('');
  const [showCountry, setShowCountry] = useState(false);
  const [country, setCountry] = useState([]);
  const [latlon, setLatLon] = useState([]);
  const [weather, setWeather] = useState({});


  const api_key = process.env.REACT_APP_WEATHER_API_KEY;
  console.log('api key is', api_key);

  useEffect(() => {
    console.log('effect');
    axios.get('https://restcountries.com/v3.1/all')
    .then(response => setCountries(response.data))
  }, []);

  useEffect(() => {
    console.log('effect 2');
    axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latlon[0]}&lon=${latlon[1]}&APPID=${api_key}`)
    .then(response => setWeather(response),
    console.log(weather))
  },[])

  const searchByCountry = (event) => setFilterBy(event.target.value);



  const countriesToShow = filterBy === '' ? [] : countries.filter(country => country.name.common.toLowerCase().includes(filterBy.toLowerCase()));

  if(showCountry) {
    return (
      <>
        <Filter filter={filterBy} search={searchByCountry}/>
      <CountryView countries={country} latlng={latlon} />
      </>
    )
  }
  else {
    return (
      <>
      <Filter filter={filterBy} search={searchByCountry}/>
      <Countries countries={countriesToShow} click={setShowCountry} view={setCountry} latlon={setLatLon} />
     </>
    );
  }
}

export default App;
