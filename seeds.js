const mongoose = require('mongoose');
const Driver = require('./models/driver.js');
const Trailer = require('./models/trailer.js');

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
        yardName: 'Napa Yard',
        yardLocation: 'Napa, CA',
        yardCapacity: '40',
        yardStatus: 'Active'
    },
    {
        yardName: 'Modesto Yard',
        yardLocation: 'Modesto, CA',
        yardCapacity: '280',
        yardStatus: 'Active'
    },
    {
        yardName: 'Santa Rosa Skikos Yard',
        yardLocation: 'Santa Rosa, CA',
        yardCapacity: '80',
        yardStatus: 'Active'
    },
    {
        yardName: 'White City Yard',
        yardLocation: 'White City, OR',
        yardCapacity: '150',
        yardStatus: 'Active'
    },
    {
        yardName: 'Norcross Yard',
        yardLocation: 'Norcross, GA',
        yardCapacity: '50',
        yardStatus: 'Active'
    },
    {
        yardName: 'Atlanta Yard',
        yardLocation: 'Atlanta, GA',
        yardCapacity: '300',
        yardStatus: 'Active'
    },
    {
        yardName: 'Encore',
        yardLocation: 'Fairfield, CA',
        yardCapacity: '100',
        yardStatus: 'Active'
    }
]