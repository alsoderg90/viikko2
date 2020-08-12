import React, {useState, useEffect} from 'react';
import axios from 'axios'

const Etsi = (props) => (
  <div>
  find countries: <input value={props.value} 
  onChange={props.onChange}/>
  </div>
)

const Maat = (props) => {
  const hakutulokset = props.maat.filter(maa => maa.name.toUpperCase().includes(props.value.toString().toUpperCase()))

  if (hakutulokset.length === 1) return (
  <Maa maa={hakutulokset[0]} saa={props.saa}/>
  )
  
  if (hakutulokset.length > 1 && hakutulokset.length <10) 
  return (
    hakutulokset.map(maa => <p key={maa.name}>{maa.name}
    <button onClick={() => props.hakusana(maa.name)}>show</button></p>)
  )
  else return <p>Too many matches, specify another filter</p>
}

const Maa = ({maa}) => {
  
 return ( 
  <div>
    <h1>{maa.name}</h1>
    <p>Capital: {maa.capital}</p>
    <p>Population: {maa.population}</p>
    <h2>Languages</h2>
    <ul>
 {maa.languages.map(kielet => <li key={kielet.name}>{kielet.name}</li>)}
</ul> 
      <a href="lippu" >
        <img alt="lippu" src={maa.flag}
        width="350" height="210">     
        </img>  
      </a>
    <Weather city={maa.capital}/>
  </div>
 )
}

const Weather = (props) => {
  
  console.log(props.city.toString())

  const [weather, showWeather] = useState() 
  
  useEffect(() => {
    const params = {
      access_key: 'TÄHÄN AVAIN',
      query: props.city
    }  
  axios.get('http://api.weatherstack.com/current', {params})
  .then(response => {
    showWeather(response.data)
  })
  },[])
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
  const [ hakuehto, haeMaat ] = useState([])
  const [ maat, naytaMaat] = useState([])

   useEffect(() => {
    axios.get('http://restcountries.eu/rest/v2/all').then(response => {
      naytaMaat(response.data)
    })
  }, [])

  const handleSearch = (event) => {
    haeMaat(event.target.value)
    console.log(event.target.value)
  }

  return (
    <div>
    <Etsi value={hakuehto} onChange={handleSearch}/>
    <Maat value={hakuehto} maat={maat} hakusana={haeMaat}/>
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