/* eslint-disable no-unused-vars */
// importing all the required modules
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

morgan.token('body', req => {
  return JSON.stringify(req.body);
});
const Person = require('./models/person');

const app = express();
app.use(cors());

//json-parser from express that is middleware used for handling request/response objects
app.use(express.json());

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

//display static content
app.use(express.static('build'));


/*let persons = [
    // eslint-disable-next-line no-trailing-spaces
    {
      "id": 1,
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": 2,
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": 3,
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": 4,
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    }
]*/


/* API CALLS */
//info about phonebook
app.get('/info', (request, response) => {
  const date = new Date();
  //console.log(response);
  response.status(200)
    .send(`<p>Phonebook has info for ${Person.length} people</p> <p>${date}</p>`);
});

//get all persons
app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(persons => response.json(persons))
    .catch(error => {
      next(error);
    });
});

//get a single person by id
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if(person) {
        response.json(person);
      }
      else {
        response.status(404).send({ error: 'malformatted id' });
      }
    })
    .catch(error => {
      console.log(error);
      next(error);
    });
  /*
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id);*/
});

//method to generate an id
/*const generateId = () => {
    const maxId = persons.length > 0 ? Math.max(...persons.map(n => n.id)) : 0;
    return maxId + 1;
  }*/

//add a person
app.post('/api/persons', (request, response, next) => {
  const body = request.body;
  if(body === undefined) {
    return response.status(400).json({
      error: 'content missing'
    });
  }
  /*if(persons.filter(person => person.name === body.name).length > 0) {
        response.status(400).json({
            error: 'person already exists'
        })
    }
  if(Person.exists(body.name)) {

  }*/

  const person = new Person({
    name: body.name,
    number: body.number
  });

  person.save().then(savedPerson => {
    response.json(savedPerson);
  })
    .catch(error => next(error));
});


//delete a single person by id
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id).then(result => {
    response.status(204).end();
  })
    .catch(error => next(error));
});

// update persons number
app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body;

  Person.findByIdAndUpdate(request.params.id, { name, number }, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson);
    })
    .catch(error => next(error));
});

//error handling for unknown endpoints
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknonw endpoint' });
};

app.use(unknownEndpoint);

// error handling middleware
const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if(error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (request.body.name ) {
    return response.status(400).json({ error: 'Duplicate entry' });
  }
  next(error);
};

app.use(errorHandler);

//config server port
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running, listening on port ${PORT}`);
});



