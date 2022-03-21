require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express(); //create an express application and store it in app
const Note = require('./models/note');

//creating middleware that prints info about every request to the server
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path: ', request.path);
  console.log('Body: ', request.body);
  console.log('---');
  next() //yields control to next middleware
}



app.use(cors());
app.use(express.static('build'));
app.use(express.json()); //activate express json-parser
app.use(requestLogger);


/*
let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2022-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2022-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2022-05-30T19:20:14.298Z",
      important: true
    }
  ]*/

  //app root
  app.get("/", (request, response) => {
      response.send('<h1>Hello World!</h1>');
  });

  //fetch all notes from server
  app.get('/api/notes', (request, response) => {
      Note.find({}).then(notes => {
        response.json(notes);
      });
  });

  //fetch note by id
  app.get('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id).then(note => {
      if(note) {
        response.json(note);
        } else {
            response.status(404).end()
        }  
    })
    .catch(error =>  
      next(error));
      /*const id = Number(request.params.id);
      console.log(id);
      const note = notes.find(note => note.id === id);
      }*/
  })

  //delete note by id
  app.delete('/api/notes/:id', (request, response, next) => {
    Note.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end();
    })
    .catch(error => next(error));

    response.status(204).end(); 
  });

  const generateId = () => {
    const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0;
    return maxId + 1;
  }


  //add new note
  app.post('/api/notes', (request, response, next) => {
    const body = request.body;

    const note = new Note({
      content: body.content,
      important: body.important || false,
      date: new Date(),
    });

    note.save()
    .then(savedNote => {
      response.json(savedNote);
    })
    .catch(error => next(error));
  });

  //toggle importance of note
  app.put('/api/notes/:id', (request, response, next) => {
    const { content, important } = request.body;

    const note = {
      content: content,
      important: important
    }

    Note.findByIdAndUpdate(request.params.id, {content, important }, { new: true, runValidators: true, context: 'query' })
      .then(updatedNote => {
        response.json(updatedNote);
      })
      .catch(error => next(error));
  })

  const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknonw endpoint'})
  }

app.use(unknownEndpoint);

//Express error handlers
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  //check if the error is a cast error which is an invalid object id in Mongo
  if(error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id'});
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message})
  }
  next(error);
}
app.use(errorHandler);


//const PORT = 3001

//for Heroku deployment
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => { 
    console.log(`Server listening on port ${PORT}`)
});

