const mongoose = require('mongoose');
const express = require('express');
const app = express();

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

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

// Routes
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

// Trigger if nothing else is
app.use((req, res, next) => {
    res.json({ message : 'Wrong request'});
    next();
});

module.exports = app;