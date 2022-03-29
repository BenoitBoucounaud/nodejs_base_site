const mongoose = require('mongoose');
const express = require('express');
const app = express();

const Thing = require('./models/thing');

// MongoDB connection
mongoose.connect('mongodb+srv://User:edtX1Z9caAFzc4Jt@cluster.icjcw.mongodb.net/Cluster?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(() => console.log('Connection to MongoDB failed'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // allow acces to this app from anywhere
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // add those header to the requests
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // allow to send requests with those mmethods
    next();
});

// parses incoming JSON requests and puts the parsed data in req.body.
app.use(express.json()); 

// put POST middlewares before GET requests (but write with 'use') to catch POST requests and not allow them to touch GET middlewares
app.post('/api/stuff', (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
        ...req.body // '...' is used to copy all elements from 'req.body'
    });
    thing.save() // return a Promise
        .then(() => res.status(201).json({ message: 'Object saved'}))
        .catch(() => res.status(400).json({error}))
});

// catch one thing
app.get('/api/stuff/:id', (req, res, next) => {
    Thing.findOne({_id: req.params.id})
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(400).json({ error }))
});

// update one thing
app.put('/api/stuff/:id', (req, res, next) => {
    Thing.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
        .then(() => res.status(200).json({ message : 'Object updated'}))
        .catch(() => res.status(400).json({error}));
});

// delete one thing
app.delete('/api/stuff/:id', (req, res, next) => {
    Thing.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({message: 'Object deleted'}))
        .catch(() => res.status(400).json({ error }));
});

// catch all things
app.use('/api/stuff', (req, res, next) => {
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
});

app.use((req, res, next) => {
    res.json({ message : 'Wrong request'});
    next();
});

module.exports = app;