const mongoose = require('mongoose');
const Driver = require('./models/driver.js');
const Trailer = require('./models/trailer.js');
const Yard = require('./models/yard.js');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/lunaLink')
    .then(() => {
        console.log("Mongo Connection Open");
    })
    .catch(err => {
        console.log("Mongo Connection Error");
        console.log(err);
    });

let drivers = [
    {
        name: 'Lewis Hamilton',
        email: 'lhamilton@gmail.com',
        truckId: '1012',
        company: 'Express Transport'
    },
    {
        name: 'Max Verstappen',
        email: 'mverstappen@gmail.com',
        truckId: '2038',
        company: 'Express Transport'
    },
    {
        name: 'Valtteri Bottas',
        email: 'vbottas@gmail.com',
        truckId: '1045',
        company: 'Express Transport'
    },
    {
        name: 'Sergio Perez',
        email: 'sperez@gmail.com',
        truckId: '1050',
        company: 'Express Transport'
    },
    {
        name: 'Lando Norris',
        email: 'lnorris@gmail.com',
        truckId: '2014',
        company: 'Express Transport'
    },
    {
        name: 'Charles Leclerc',
        email: 'cleclerc@gmail.com',
        truckId: '2016',
        company: 'Express Transport'
    }
]

Driver.insertMany(drivers)
    .then(res => {
        console.log(res);
    })
    .catch(e => {
        console.log(e);
    });

let trailers = [
    {
        trailerId: '1001',
        trailerType: 'Dry Van',
        trailerStatus: 'Available',
        trailerLocation: 'Atlanta, GA'
    },
    {
        trailerId: '1002',
        trailerType: 'Dry Van',
        trailerStatus: 'In Transit',
        trailerLocation: 'Modesto, CA'
    },
    {
        trailerId: '1003',
        trailerType: 'Reefer',
        trailerStatus: 'In Transit',
        trailerLocation: 'White City, OR'
    },
    {
        trailerId: '1004',
        trailerType: 'Tanker',
        trailerStatus: 'Available',
        trailerLocation: 'Santa Rosa, CA'
    },
    {
        trailerId: '1005',
        trailerType: 'Dry Van',
        trailerStatus: 'Docked',
        trailerLocation: 'Norcross, GA'
    },
    {
        trailerId: '1006',
        trailerType: 'Reefer',
        trailerStatus: 'In Transit',
        trailerLocation: 'Atlanta, GA'
    }
]

Trailer.insertMany(trailers)
    .then(res => {
        console.log(res);
    })
    .catch(e => {
        console.log(e);
    });

let yards = [
    {
        name: 'Napa Yard',
        location: 'Napa, CA',
        capacity: '40',
        status: 'Active'
    },
    {
        name: 'Modesto Yard',
        location: 'Modesto, CA',
        capacity: '280',
        status: 'Active'
    },
    {
        name: 'Santa Rosa Skikos Yard',
        location: 'Santa Rosa, CA',
        capacity: '80',
        status: 'Active'
    },
    {
        name: 'White City Yard',
        location: 'White City, OR',
        capacity: '150',
        status: 'Active'
    },
    {
        name: 'Norcross Yard',
        location: 'Norcross, GA',
        capacity: '50',
        status: 'Active'
    },
    {
        name: 'Atlanta Yard',
        location: 'Atlanta, GA',
        capacity: '300',
        status: 'Active'
    },
    {
        name: 'Encore',
        location: 'Fairfield, CA',
        capacity: '100',
        status: 'Active'
    }
];

// Save yards to database

const seedYards = async () => {
    try {
        const res = await Yard.insertMany(yards);
        console.log(res);
    }
    catch (err) {
        console.log('Error seeding yards to database!');
        console.log(err);
    }
};

seedYards();