/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');

if(process.argv.length < 3) {
  console.log('Please provide the required password to connect.');
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url =
`mongodb+srv://fullstack:${password}@fullstackopen.kfuzq.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

// create the mongoDB connection
mongoose.connect(url);

//person Schema
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

//person model
const Person = mongoose.model('Person', personSchema);

if(process.argv.length === 3) {
  // return all persons in the phonebook
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number);
      mongoose.connection.close();
    });
  });
}

if(process.argv.length === 5) {

  //create the person object to be saved to the DB
  const person = new Person({
    name: `${name}`,
    number: `${number}`
  });

  person.save().then(result => {
    console.log('person saved');
    mongoose.connection.close();
  });
}

