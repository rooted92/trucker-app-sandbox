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

// let drivers = [
//     {
//         name: 'Lewis Hamilton',
//         email: 'lhamilton@gmail.com',
//         truckId: '1012',
//         company: 'Express Transport'
//     },
//     {
//         name: 'Max Verstappen',
//         email: 'mverstappen@gmail.com',
//         truckId: '2038',
//         company: 'Express Transport'
//     },
//     {
//         name: 'Valtteri Bottas',
//         email: 'vbottas@gmail.com',
//         truckId: '1045',
//         company: 'Express Transport'
//     },
//     {
//         name: 'Sergio Perez',
//         email: 'sperez@gmail.com',
//         truckId: '1050',
//         company: 'Express Transport'
//     },
//     {
//         name: 'Lando Norris',
//         email: 'lnorris@gmail.com',
//         truckId: '2014',
//         company: 'Express Transport'
//     },
//     {
//         name: 'Charles Leclerc',
//         email: 'cleclerc@gmail.com',
//         truckId: '2016',
//         company: 'Express Transport'
//     }
// ]

// Driver.insertMany(drivers)
//     .then(res => {
//         console.log(res);
//     })
//     .catch(e => {
//         console.log(e);
//     });

// let trailers = [
//     {
//         number: '1001',
//         type: 'Dry Van',
//         length: 53,
//         loadStatus: 'Empty',
//         cleanliness: 'Clean',
//         trailerStatus: 'Available',
//         notes: 'None'
//     },
//     {
//         number: '1002',
//         type: 'Reefer',
//         length: 48,
//         loadStatus: 'Loaded',
//         cleanliness: 'Dirty',
//         trailerStatus: 'In Transit',
//         notes: 'Fragile cargo'
//     },
//     {
//         number: '1003',
//         type: 'Flatbed',
//         length: 45,
//         loadStatus: 'Empty',
//         cleanliness: 'Clean',
//         trailerStatus: 'Docked',
//         notes: 'None'
//     },
//     {
//         number: '1004',
//         type: 'Step Deck',
//         length: 40,
//         loadStatus: 'Loaded',
//         cleanliness: 'Dirty',
//         trailerStatus: 'In Service',
//         notes: 'Requires maintenance'
//     },
//     {
//         number: '1005',
//         type: 'Double Drop',
//         length: 36,
//         loadStatus: 'Empty',
//         cleanliness: 'Clean',
//         trailerStatus: 'Out of Service',
//         notes: 'Damaged roof'
//     },
//     {
//         number: '1006',
//         type: 'Lowboy',
//         length: 32,
//         loadStatus: 'Loaded',
//         cleanliness: 'Dirty',
//         trailerStatus: 'In Repair',
//         notes: 'Axle repair needed'
//     },
//     {
//         number: '1007',
//         type: 'Conestoga',
//         length: 28,
//         loadStatus: 'Empty',
//         cleanliness: 'Clean',
//         trailerStatus: 'Available',
//         notes: 'None'
//     },
//     {
//         number: '1008',
//         type: 'Power Only',
//         length: 53,
//         loadStatus: 'Loaded',
//         cleanliness: 'Dirty',
//         trailerStatus: 'In Transit',
//         notes: 'Heavy load'
//     },
//     {
//         number: '1009',
//         type: 'Tanker',
//         length: 48,
//         loadStatus: 'Empty',
//         cleanliness: 'Clean',
//         trailerStatus: 'Docked',
//         notes: 'None'
//     },
//     {
//         number: '1010',
//         type: 'Dry Van',
//         length: 45,
//         loadStatus: 'Loaded',
//         cleanliness: 'Dirty',
//         trailerStatus: 'In Service',
//         notes: 'Requires maintenance'
//     }
// ];

// Trailer.insertMany(trailers)
//     .then(res => {
//         console.log(res);
//     })
//     .catch(e => {
//         console.log(e);
//     });

let yards = [
    {
        name: 'Napa Yard',
        location: 'Napa, CA',
        capacity: 40,
        status: 'Open',
        trailers: []
    },
    {
        name: 'Modesto Yard',
        location: 'Modesto, CA',
        capacity: 280,
        status: 'Open',
        trailers: []
    },
    {
        name: 'Santa Rosa Skikos Yard',
        location: 'Santa Rosa, CA',
        capacity: 80,
        status: 'Open',
        trailers: []
    },
    {
        name: 'White City Yard',
        location: 'White City, OR',
        capacity: 150,
        status: 'Open',
        trailers: []
    },
    {
        name: 'Norcross Yard',
        location: 'Norcross, GA',
        capacity: 50,
        status: 'Open',
        trailers: []
    },
    {
        name: 'Atlanta Yard',
        location: 'Atlanta, GA',
        capacity: 300,
        status: 'Open',
        trailers: []
    },
    {
        name: 'Encore',
        location: 'Fairfield, CA',
        capacity: 100,
        status: 'Open',
        trailers: []
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