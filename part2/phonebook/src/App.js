import { useState } from 'react';
import Persons from './Persons';
import Filter from './Filter';
import PersonForm from './PersonForm';

const App = () => {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas',
     number: '000-123-4567',
    id: 1 },
    {name: 'Alba Jennings',
  number: '111-234-7865',
id: 2},
{name: 'John Hopkins',
number: '999-111-2829',
id: 3},
{name: 'Jack L',
number: '987-102-9302',
id: 4}
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [ filterBy, setFilterBy ] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    if(persons.filter(person => person.name === newName).length > 0) {
      alert(`${newName} is already added to phonebook`);
    }
    else{
      setPersons(persons.concat({name: newName, number: newNumber}));

    }
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
      <h2>
        Phonebook
      </h2>
     <Filter filter={filterBy} change={searchByName}/>
      <h2>
      Add New
      </h2>
     <PersonForm submission={addPerson} name={newName} nameChange={handleNameChange} number={newNumber} numberChange={handleNumberChange}/>
      <h2>
      Numbers
      </h2>
      <Persons persons={namesToShow}/>
    </div>
    
  );
}

export default App;
