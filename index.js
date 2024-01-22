const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const { v4: uuid } = require('uuid');
const exp = require('constants');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

let drivers = [
    {
        id: uuid(),
        name: 'Lewis Hamilton',
        email: 'lhamilton@gmail.com',
        truckId: '1012',
        company: 'Express Transport' 
    },
    {
        id: uuid(),
        name: 'Max Verstappen',
        email: 'mverstappen@gmail.com',
        truckId: '2038',
        company: 'Express Transport'
    },
    {
        id: uuid(),
        name: 'Valtteri Bottas',
        email: 'vbottas@gmail.com',
        truckId: '1045',
        company: 'Express Transport'
    },
    {
        id: uuid(),
        name: 'Sergio Perez',
        email: 'sperez@gmail.com',
        truckId: '1050',
        company: 'Express Transport'
    },
    {
        id: uuid(),
        name: 'Lando Norris',
        email: 'lnorris@gmail.com',
        truckId: '2014',
        company: 'Express Transport'
    },
    {
        id: uuid(),
        name: 'Charles Leclerc',
        email: 'cleclerc@gmail.com',
        truckId: '2016',
        company: 'Express Transport'
    }
]

app.get('/drivers', (req, res) => {
    res.render('drivers/index.ejs', { drivers });
});

app.get('/driver/:id', (req, res) => {
    const { id } = req.params;
    const driver = drivers.find(d => d.id === id);
    res.render('drivers/driver.ejs', { driver });
    res.send(driver);
});

app.get('/driver/new', (req, res) => {
    res.render('drivers/new-driver.ejs');
});

app.listen(3000, () => {
    console.log("App is listening on port 3000");
});