const user_model = require('../schema.js');

function saveTrip(app) {
    app.post("/api/v1/save", async (req, res) => { 
        try {
            console.log("Received post request from save");
            let obj = req.body;
            
            let email = req.body.obj.email;
            
            const user = await user_model.findOne({ email: email });
            console.log(req.body.obj.hotels)
            console.log(req.body.obj.attractions);
            console.log(req.body.obj.foods);
            if (!user) {
                return(res.json({
                    message: "User not found",
                    data: obj
                }));
            }
            else {
                // pushed the trip array to the user
                let { hotels, attractions, foods } = req.body.obj;
                await user.updateOne({ $push: { trip: { hotels: hotels, attractions: attractions, foods: foods } } });
                return res.json({
                    message: "Received post request from save",
                    data: obj
                });
            }
            return(res.json({
                message: "Received post request from save",
                data: obj
            }));
            
        }
        catch (err) {
            console.log("Error: ", err);    
        }
    });
}

module.exports = saveTrip;