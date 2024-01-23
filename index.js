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

// Home route
app.get('/', (req, res) => {
    res.render('dashboard.ejs');
});

// All Drivers route
app.get('/drivers', (req, res) => {
    res.render('drivers/index.ejs', { drivers });
});

// Add new driver route
// A more specific route should be placed above a more general route, so this route should be placed above the view single driver route (see below)
app.get('/driver/new', (req, res) => {
    res.render('drivers/new-driver.ejs');
});

// Create new driver route
app.post('/drivers', (req, res) => {
    const { name, email, truckId, company } = req.body;
    drivers.push({ name, email, truckId, company, id: uuid() });
    res.redirect('/drivers');
});

// View single driver route
app.get('/driver/:id', (req, res) => {
    const { id } = req.params;
    const driver = drivers.find(d => d.id === id);
    res.render('drivers/driver.ejs', { driver });
});

// Edit driver route
app.get('/driver/:id/edit', (req, res) => {
    const { id } = req.params;
    const driverToUpdate = drivers.find(d => d.id === id);
    res.render('drivers/edit-driver.ejs', { driverToUpdate });
});

// Update driver route
app.patch('/driver/:id', (req, res) => {
    const { id } = req.params;
    const updatedDriver = req.body;
    const driver = drivers.find(d => d.id === id);
    driver.name = updatedDriver.name;
    driver.email = updatedDriver.email;
    driver.truckId = updatedDriver.truckId;
    driver.company = updatedDriver.company;
    res.redirect('/drivers');
});

// Delete driver route
app.delete('/driver/:id', (req, res) => {
    const { id } = req.params;
    drivers = drivers.filter(d => d.id !== id);
    res.redirect('/drivers');
});

app.listen(3000, () => {
    console.log("App is listening on port 3000");
});