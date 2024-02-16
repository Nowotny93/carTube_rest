const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const listingController = require('./controllers/listingController');
const usersController = require('./controllers/usersController');
const auth = require('./middlewares/auth');

start()

async function start() {
    
    await new Promise((resolve, reject) => {
        mongoose.connect('mongodb://localhost:27017/carTube-rest', { ignoreUndefined: true })
        const db = mongoose.connection;
        db.once('open', () => {

            console.log('Database connected');
            resolve()
        })
        db.on('error', (err) => reject(err));
    })

    const app = express()
    app.use(cors());
    app.use(auth());
    app.use(express.json());
    app.use(express.static('assets'))
    app.set("view engine", "ejs")

    app.use('/data/cars', listingController)
    app.use('/users', usersController)

    app.get('/', (req, res) => res.send('It works!'));
    app.listen(5000, () => console.log('REST Service is running on port 5000'))
}

