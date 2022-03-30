const Thing = require('../models/thing');
const fs = require('fs'); // (file system) allow to modify file system

exports.createThing = (req, res, next) => {
    // thing is object so we need to parse it to use it
    const thingObject = JSON.parse(req.body.thing);
    delete thingObject._id;
    const thing = new Thing({
        ...thingObject, // '...' is used to copy all elements from 'thingObject'
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    thing.save() // return a Promise
        .then(() => res.status(201).json({ message: 'Object saved' }))
        .catch(() => res.status(400).json({ error }))
};

exports.getThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(400).json({ error }))
};

exports.updateThing = (req, res, next) => {
    // if we need to catch url or not
    const thingObject = req.file ? {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Object updated' }))
        .catch(() => res.status(400).json({ error }));
};

exports.deleteThing = (req, res, next) => {
    // find it and check if it s the right auth
    Thing.findOne({ _id: req.params.id })
        .then(
            (thing) => {
                const filename = thing.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    // delete it
                    Thing.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Object deleted' }))
                        .catch(() => res.status(400).json({ error }));
                });
            })
        .catch(error => res.status(500).json({ error }));
};

exports.getAllThings = (req, res, next) => {
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
};