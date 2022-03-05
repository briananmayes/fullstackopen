import { useState, useEffect } from 'react';
import personService from './services/persons' 
import Persons from './Persons';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Notification from './Notification';

const App = () => {
  //pieces of state
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [ filterBy, setFilterBy ] = useState('');
  const [errScssMsg, setErrScssMsg] = useState('');

  //effect hook to handle data fetching from json-server
  useEffect(() => {
    console.log('effect');
    personService.getPersons()
    .then(initialPersons => {
      console.log(initialPersons)
      setPersons(initialPersons)
    })
    .catch(error => {
      setErrScssMsg('Unable to get phonebook list from server...');
      setTimeout(() => {
        setErrScssMsg(null)}, 3000)
    });
  }, [])

  // method for adding a person to the phonebook
  const addPerson = (event) => {
    //prevent the default action of a form submission
    event.preventDefault(); 

    //if this person already exists in the phonebook, prompt the user if they want to update the number
    if(persons.filter(person => person.name === newName).length > 0) {
      if(window.confirm(`${newName} is already added to phonebook, do you want to update the number?`)){
        const person = persons.find(person => person.name === newName);
        const id = person.id;
        const changedPerson = {...person, number: newNumber};

        // the service call which handles the HTTP put request to update a persons information
        personService.updatePersonsNumber(id, changedPerson)
        .then(returnedPerson => setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        )
        .catch(error => {
          setErrScssMsg(`${newName} has already been removed from the phonebook.`);
        setTimeout(() => {
          setErrScssMsg(null)
        }, 3000)
        setPersons(persons.filter(person => person.id !== id));
        });
      }
    }
    else{
      personService.createPerson({name: newName, number: newNumber})
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setErrScssMsg(`Added ${newName} to phonebook`);
        setTimeout(() => {
          setErrScssMsg(null)
        }, 3000)
      });


    }
  }

  const removePerson = (id, name) => {
    if(window.confirm(`Delete ${name}?`)) {
    personService.deletePerson(id)
    .then(() => setPersons(persons.filter(person => person.id !== id)))
    };
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const searchByName = (event) => {
    setFilterBy(event.target.value);
    //console.log(filterBy);

  }

  const namesToShow = filterBy === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filterBy.toLowerCase()));

  return (
    <div>
    <Notification message={errScssMsg} name={newName} />
      <h1>
        Phonebook
      </h1>
     <Filter filter={filterBy} change={searchByName}/>
      <h1>
      Add New
      </h1>
     <PersonForm submission={addPerson} name={newName} nameChange={handleNameChange} number={newNumber} numberChange={handleNumberChange}/>
      <h1>
      Numbers
      </h1>
      <Persons persons={namesToShow} deletePerson={removePerson}/>
    </div>
    
  );
}

export default App;
