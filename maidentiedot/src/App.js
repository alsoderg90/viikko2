import React, {useState, useEffect} from 'react';
import axios from 'axios'

const Find = (props) => (
  <div>
  find countries: <input value={props.value} 
  onChange={props.onChange}/>
  </div>
)

const Countries = (props) => {
  const results = props.countries.filter(countries => countries.name.toUpperCase().includes(props.value.toString().toUpperCase()))

  if (results.length === 1) return (
  <Country country={results[0]}/>
  )
  
  if (results.length > 1 && results.length <10) 
  return (
    results.map(country => <p key={country.name}>{country.name}
    <button onClick={() => props.search(country.name)}>show</button></p>)
  )
  else return <p>Too many matches, specify another filter</p>
}

const Country = ({country}) => {
  
 return ( 
  <div>
    <h1>{country.name}</h1>
    <p>Capital: {country.capital}</p>
    <p>Population: {country.population}</p>
    <h2>Languages</h2>
    <ul>
 {country.languages.map(languages => <li key={languages.name}>{languages.name}</li>)}
</ul> 
      <a href="lippu" >
        <img alt="lippu" src={country.flag}
        width="350" height="210">     
        </img>  
      </a>
    <Weather city={country.capital}/>
  </div>
 )
}

const Weather = (props) => {
  
  console.log(props.city.toString())

  const [weather, showWeather] = useState() 
  
  useEffect(() => {
    const params = {
      access_key: 'tähän avain',
      query: props.city
    }  
  axios.get('http://api.weatherstack.com/current', {params})
  .then(response => {
    showWeather(response.data)
  })
  },[props.city])
  console.log("Weather is", weather)

  if (weather)   
  return (
    <div>
    <h2>Weather in {weather.request.query}</h2>
    <p><b>Temperature:</b> {weather.current.temperature} Celsius </p>
      <img alt="weather" src={weather.current.weather_icons}
      width="150" height="150">
      </img>  
    <p><b>Wind:</b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
    </div>
    ) 
    else return (
    <p>Weather data is not available</p>
    )
}


const App = ()  => {
  const [ search, findCountries ] = useState([])
  const [ countries, showCountries] = useState([])

   useEffect(() => {
    axios.get('http://restcountries.eu/rest/v2/all').then(response => {
      showCountries(response.data)
    })
  }, [])

  const handleSearch = (event) => {
    findCountries(event.target.value)
    console.log(event.target.value)
  }

  return (
    <div>
    <Find value={search} onChange={handleSearch}/>
    <Countries value={search} countries={countries} search={findCountries}/>
    </div>
  )
}

export default App;






/* 

then(response => {
naytaSaa(response.data)



  const [saa, naytaSaa] = useState() 

  useEffect(() => {
    axios.get('http://api.weatherstack.com/current?access_key=f34e680fd8b388c61a065d0061ec10fc&query=Helsinki').then(response => {
    naytaSaa(response.data)
    })
  },[]) 
  console.log(saa)


const [saa, naytaSaa] = useState() 

 const axios = require('axios');
  const params = {
    access_key: 'f34e680fd8b388c61a065d0061ec10fc',
    query: 'New York'
  }
  
  axios.get('https://api.weatherstack.com/current', {params})
  .then(response => {
    const apiResponse = response.data;
    console.log(apiResponse)
    console.log(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`);
  }).catch(error => {
    console.log(error);
  });






 useEffect(() => {
    const parametrit = {
       access_key: 'f34e680fd8b388c61a065d0061ec10fc',
       query: 'helsinki'
    }
    axios.get('http://api.weatherstack.com/current', parametrit).then(response => {
    naytaSaa(response.data)
    })
  },[]
  ) 
  console.log(saa)












*/