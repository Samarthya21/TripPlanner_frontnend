const express = require('express');
const cors = require('cors');
const user_model = require('./schema.js');
const loginroute = require('./components/loginroute.js');
const signuproute = require('./components/signuproute.js');
const saveTrip = require('./components/saveTrip.js');
const myTrips = require('./components/myTrips.js');

const app = express();
const port = 8000;

app.use(cors({
    origin: 'https://trip-planner-frontnend-d8h6fow0e-samarthya21s-projects.vercel.app/', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
   
}));
app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



loginroute(app);

signuproute(app);
 
saveTrip(app);

myTrips(app);