const express = require('express');
const cors = require('cors');
const loginroute = require('./components/loginroute.js');
const signuproute = require('./components/signuproute.js');
const saveTrip = require('./components/saveTrip.js');
const myTrips = require('./components/myTrips.js');

const app = express();
const port = 8000;


const allowedOrigins = [
    'https://trip-planner-frontnend-d8h6fow0e-samarthya21s-projects.vercel.app'
];

app.use(cors());

app.use(express.json());


loginroute(app);
signuproute(app);
saveTrip(app);
myTrips(app);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
