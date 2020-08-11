import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => (
  <div>
  filter shown with: <input value={props.value} 
  onChange={props.onChange}/>
  </div>
)

const Person = (props) => (
  <form onSubmit={props.onSubmit}>
    <div>
    name: <input value={props.name} 
    onChange={props.onChangeName}/>
    </div>
    <div>
    number <input value={props.number} 
    onChange={props.onChangeNumber}/>
    </div>
    <div>
    <button type="submit">add</button>
    </div>
  </form>
)

const Persons = (props) => {
  const copy = props.persons.filter(person =>
  person.name.toLowerCase().includes(props.filter.toLowerCase()))
  return (
    copy.map(a => <p key={a.name}>{a.name} {a.number}</p>)
  )
}

const App = () => {

  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, showFiltered ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }
    if (persons.map(person => person.name.toLowerCase()).includes(newName.toLowerCase()) === false) {
      setPersons(persons.concat(person))
      setNewName('')
      setNewNumber('')
    } 
    else {
      window.alert(`${newName} is already added to phonebook`)
    }

  }

  const handleName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilter = (event) => {
    showFiltered(event.target.value)
  }


  useEffect(() => {
    console.log('effect')
    axios.get('http://localhost:3001/persons').then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  }, [])
  console.log('render',persons.length, 'notes')
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleFilter}/>
      <h2>add a new</h2>
      <Person onSubmit={addName} name={newName} onChangeName={handleName}
      number={newNumber} onChangeNumber={handleNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={newFilter}/>
    </div>
  )
}

export default App

