const Person = ({person, deletePerson}) => {
    //console.log(person);
      return (
        <>
      <p>{person.name} {person.number} <button onClick={() => deletePerson(person.id, person.name)}>delete person</button></p>
      </>
      )
  }

  export default Person;