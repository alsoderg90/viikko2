import React, { useState } from 'react'

const App = () => {

  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, showFiltered ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }

    if (persons.map(person => person.name).includes(newName) === false) {
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

  const Persons = (props) => {
    
    const copy = props.persons.filter(person =>
    person.name.toLowerCase().includes(newFilter.toLowerCase()))
    return (
      copy.map(a => <p key={a.name}>{a.name} {a.number}</p>)
    )
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={newFilter} 
        onChange={handleFilter}/>
      </div>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} 
          onChange={handleName}/>
        </div>
        <div>
          number <input value={newNumber} 
          onChange={handleNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons}/>
    </div>
  )

}

export default App