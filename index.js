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
        company: 'Express Transport' 
    },
    {
        id: uuid(),
        name: 'Max Verstappen',
        email: 'mverstappen@gmail.com',
        company: 'Express Transport'
    },
    {
        id: uuid(),
        name: 'Valtteri Bottas',
        email: 'vbottas@gmail.com',
        company: 'Express Transport'
    },
    {
        id: uuid(),
        name: 'Sergio Perez',
        email: 'sperez@gmail.com',
        company: 'Express Transport'
    },
    {
        id: uuid(),
        name: 'Lando Norris',
        email: 'lnorris@gmail.com',
        company: 'Express Transport'
    },
    {
        id: uuid(),
        name: 'Charles Leclerc',
        email: 'cleclerc@gmail.com',
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

app.listen(3000, () => {
    console.log("App is listening on port 3000");
});