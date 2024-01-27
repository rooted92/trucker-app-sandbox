const mongoose = require('mongoose');
const Driver = require('./models/driver.js');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/lunaLink')
    .then(() => {
        console.log("Mongo Connection Open");
    })
    .catch(err => {
        console.log("Mongo Connection Error");
        console.log(err);
    });

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

const addSeedDrivers = async () => {
    try{
        await Driver.deleteMany({});
    } catch (err) {
        console.log(err);
    }
};

let trailers = [
    {
        id: uuid(),
        trailerId: '1001',
        trailerType: 'Dry Van',
        trailerStatus: 'Available',
        trailerLocation: 'Atlanta, GA'
    },
    {
        id: uuid(),
        trailerId: '1002',
        trailerType: 'Dry Van',
        trailerStatus: 'In Transit',
        trailerLocation: 'Modesto, CA'
    },
    {
        id: uuid(),
        trailerId: '1003',
        trailerType: 'Reefer',
        trailerStatus: 'In Transit',
        trailerLocation: 'White City, OR'
    },
    {
        id: uuid(),
        trailerId: '1004',
        trailerType: 'Tanker',
        trailerStatus: 'Available',
        trailerLocation: 'Santa Rosa, CA'
    },
    {
        id: uuid(),
        trailerId: '1005',
        trailerType: 'Dry Van',
        trailerStatus: 'Docked',
        trailerLocation: 'Norcross, GA'
    },
    {
        id: uuid(),
        trailerId: '1006',
        trailerType: 'Reefer',
        trailerStatus: 'In Transit',
        trailerLocation: 'Atlanta, GA'
    }
]

let yards = [
    {
        id: uuid(),
        yardName: 'Napa Yard',
        yardLocation: 'Napa, CA',
        yardCapacity: '40',
        yardStatus: 'Active'
    },
    {
        id: uuid(),
        yardName: 'Modesto Yard',
        yardLocation: 'Modesto, CA',
        yardCapacity: '280',
        yardStatus: 'Active'
    },
    {
        id: uuid(),
        yardName: 'Santa Rosa Skikos Yard',
        yardLocation: 'Santa Rosa, CA',
        yardCapacity: '80',
        yardStatus: 'Active'
    },
    {
        id: uuid(),
        yardName: 'White City Yard',
        yardLocation: 'White City, OR',
        yardCapacity: '150',
        yardStatus: 'Active'
    },
    {
        id: uuid(),
        yardName: 'Norcross Yard',
        yardLocation: 'Norcross, GA',
        yardCapacity: '50',
        yardStatus: 'Active'
    },
    {
        id: uuid(),
        yardName: 'Atlanta Yard',
        yardLocation: 'Atlanta, GA',
        yardCapacity: '300',
        yardStatus: 'Active'
    },
    {
        id: uuid(),
        yardName: 'Encore',
        yardLocation: 'Fairfield, CA',
        yardCapacity: '100',
        yardStatus: 'Active'
    }
]