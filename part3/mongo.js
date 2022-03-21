const mongoose = require('mongoose');

if(process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1);
}

const password = process.argv[2];

const url = 
`mongodb+srv://fullstack:${password}@fullstackopen.kfuzq.mongodb.net/noteApp?retryWrites=true&w=majority`;

mongoose.connect(url);

//note schema that maps to noteapp collection
// need to define schema before calling model
const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
});

//Note model used as constructor serve as instance of document in the DB
const Note = mongoose.model('Note', noteSchema);

//creating the note object with the model constructor 
/*const note = new Note({
    content: 'Callback functions suck',
    date: new Date(),
    important: true,
});*/

Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note);
    })
    mongoose.connection.close();
})

//saving the note to the database
/*note.save().then(result => {
    console.log('note saved!');
    mongoose.connection.close();
});*/