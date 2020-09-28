import React, { useState, useEffect } from 'react'
import noteService from './services/notes'
import './index.css'

const Notification = (props) => {
if (props.message === null){
  return null
}
console.log(props.message,`${props.styleClass}`)
return (
  <div className={props.className}> 
  {props.message}
  </div>
)
}

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
  const [ notificationMessage, setNotificationMessage] = useState(null)
  const [ errorMessage, setErrorMessage] = useState(null)

  const deleteName = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm("poistetaanko henkilö")) {
      noteService.Delete(id).then(response => {
        setPersons(persons.filter(person => person.id !==id))
      })
      setNotificationMessage(`Contact ${person.name} deleted`)
      setTimeout(() => {          
        setNotificationMessage(null)        
        }, 1500)
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
        setNotificationMessage(`Added ${person.name}`)
        setTimeout(() => {          
          setNotificationMessage(null)        
          }, 1500)

    }) 
    } 
    else {
      if (window.confirm(`${newName} is already added to phonebook, replace with a new one?`)) {
        const oldName = persons.find(name => name.name.toLowerCase() === person.name.toLowerCase())
        console.log(oldName,"id ompi:",oldName.id)
        noteService.replace(oldName.id,person)
        .then(response => {
          setPersons(persons.map(name => name.id === oldName.id ? response.data : name ))
          setNewName('')
          setNewNumber('')
          setNotificationMessage(`Replaced ${person.name}`)
          setTimeout(() => {          
            setNotificationMessage(null)        
            }, 2500)
          })
          .catch(error => {
            setPersons(persons.filter(n => n.id !== oldName.id))
            setErrorMessage(      
              `Information of '${person.name}' was already deleted from server`)      
              setTimeout(() => {          
                setErrorMessage(null)        
                }, 4000)    
              })
            }} 
                     
  }

  useEffect(() => {
    noteService.getAll().then(response => {
    setPersons(response.data)
    })
  }, [])
  
   const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} className="notification" />
      <Notification message={errorMessage} className="error" />
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