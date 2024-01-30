import express from 'express';
import pg from "pg";
import dotenv from "dotenv";
import { carsInfo } from './getcars.js';
import { ownerInfo } from './getowners.js';

dotenv.config();

const PORT = 8000;

const Pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

Pool.connect()
    .then((client) => {
        console.log(`Connected to postgres using connection string ${process.env.DATABASE_URL}`);
        client.release();
    })
    .catch((err)=>{
        console.log("Failed to connect to postgres: ", err.message);
    })


const app = express();
app.use(express.json());
app.use(express.static('public'));

const cars = carsInfo(Pool);
const owners = ownerInfo(Pool);

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
// })

app.get('/', (req, res, next) => {
    res.sendFile
})

app.get('/cars', cars.getAllCars);
app.get('/cars/:carId', cars.carsById);
app.post('/cars', cars.createCar);
app.patch('/cars/:carId', cars.updateCar);
app.delete('/cars/:carId', cars.deleteCar);

app.get('/owners', owners.allOwners);
app.get('/owners/:ownerId', owners.singleOwner);
app.post('/owners', owners.createOwner);
app.patch('/owners/:ownerId', owners.updateowner);
app.delete('/owners/:ownerId', owners.deleteOwner);

// app.get('/api/owners/:ownerId/cars', async(req, res) => {
//     const ownerId = Number.parseInt(req.params.ownerId);
//     let ownerCars = 'SELECT make FROM cars WHERE owners_id = $1';
//     try {
//         const owner = await Pool.query(
//             ownerCars, [ownerId]
//         );
//         res.json(owner.rows);
//     } catch (error) {
//         console.log(error);
//         res.status(500).send(error.message)
//     }
// })





// app.post('/api/owners/:ownerId/cars', async (req, res) => {
//     const id = Number.parseInt(req.params.ownerId)
//     const { make, model, year} = req.body;
//     try {
//         const newCar = await Pool.query(
//             'INSERT INTO cars(make, model, year, owners_id) VALUES ($1, $2, $3, $4) RETURNING *',
//             [make, model, year]
//         );
//         res.json({ 
//             message: "New car added!",
//             item: newCar.rows
//          });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send(error.message)
//     }
// })
app.use((err, req, res, next) => {
    console.log("Something went wrong", err);
    res.sendStatus(500);
})


app.listen(PORT, () => {
    console.log("Server running on port: ", PORT);
})

