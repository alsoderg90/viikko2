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
    <div>
      <h1>{hakutulokset[0].name}</h1>
      <p>Capital: {hakutulokset[0].capital}</p>
      <p>Population: {hakutulokset[0].population}</p>
      <h2>Languages</h2>
      <ul>
       {hakutulokset[0].languages.map(kielet => <li key={kielet.name}>{kielet.name}</li>)}
      </ul> 
      <a href="{hakutulokset[0].flag}" >
        <img alt="lippu" src={hakutulokset[0].flag}
        width="350" height="210"
        ></img>
        
      </a>
      </div>
  )

  if (hakutulokset.length > 1 && hakutulokset.length <10) return hakutulokset.map(maa => <li key={maa.name}>{maa.name}</li>)
 
  else  return <p>Too many matches, specify another filter</p>
  //return hakutulokset.map(maa => <li key={maa.name}>{maa.name}</li>)
 
}

const App = ()  => {
  const [ hakuehto, haeMaat ] = useState([])
  const [ maat, naytaMaat] = useState([])

  const handleSearch = (event) => {
      haeMaat(event.target.value)
      console.log(event.target.value)
      }

  useEffect(() => {
    console.log('effect')
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      naytaMaat(response.data)
    })
  }, [])
  console.log(maat)

  return (
    <div>
    <Etsi value={hakuehto} onChange={handleSearch}/>
    <Maat value={hakuehto} maat={maat}/>
    </div>
  )
}

export default App;
