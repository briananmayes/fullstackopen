const Persons = ({persons}) => {
    console.log(persons);
    return persons.map((person) => {
      return <p key={person.name}>{person.name} {person.number}</p>
    })
  }

  export default Persons;