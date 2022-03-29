const express = require('express');
const router = express.Router();

const Thing = require('../models/thing');

// put POST middlewares before GET requests (but write with 'use') to catch POST requests and not allow them to touch GET middlewares
router.post('/', (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
        ...req.body // '...' is used to copy all elements from 'req.body'
    });
    thing.save() // return a Promise
        .then(() => res.status(201).json({ message: 'Object saved'}))
        .catch(() => res.status(400).json({error}))
});

// catch one thing
router.get('/:id', (req, res, next) => {
    Thing.findOne({_id: req.params.id})
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(400).json({ error }))
});

// update one thing
router.put('/:id', (req, res, next) => {
    Thing.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
        .then(() => res.status(200).json({ message : 'Object updated'}))
        .catch(() => res.status(400).json({error}));
});

// delete one thing
router.delete('/:id', (req, res, next) => {
    Thing.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({message: 'Object deleted'}))
        .catch(() => res.status(400).json({ error }));
});

// catch all things
router.get('/', (req, res, next) => {
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
});

module.exports = router;