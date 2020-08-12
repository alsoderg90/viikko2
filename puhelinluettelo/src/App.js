import React, { useState, useEffect } from 'react'
import noteService from './services/notes'

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
  copy.map(a => console.log(a))
  copy.map(a => console.log(a.id))
  return (
    copy.map( person => <List key={person.id} id={person.id}
             name={person.name} number={person.number} event={props.event}/> )
  )
}

const List = ({id,name,number,event}) => (
  <p> {name}  {number} <button onClick={() => event(id) } > Delete     </button></p>
)

const App = () => {

  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, showFiltered ] = useState('')

  const deleteName = (id) => {
   
    if (window.confirm("poistetaanko henkilö")) {
      noteService.Delete(id).then(response => {
        setPersons(persons.filter(person => person.id !==id))
      })
    }
  }

  const addName = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }
    if (persons.map(person => person.name.toLowerCase()).includes(newName.toLowerCase()) === false) {
      noteService.create(person).then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')

    }) 
    } 
    else {
      window.alert(`${newName} is already added to phonebook`)
    }
  }

  useEffect(() => {
    noteService.getAll().then(response => {
    setPersons(response.data)
    })
  }, [])
  
   const handleNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={(event) => {
      showFiltered(event.target.value)}}/>
      <h2>add a new</h2>
      <Person onSubmit={addName} name={newName}
      onChangeName={(event) => {setNewName(event.target.value)}}
      number={newNumber} onChangeNumber={handleNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={newFilter} event={deleteName}/>
    </div>
  )
}

export default App

