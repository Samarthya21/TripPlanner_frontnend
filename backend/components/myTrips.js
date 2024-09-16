const user_model = require('../schema.js');

function myTrips(app) {
    app.post('/api/v1/mytrips', async (req, res) => {
        try {
            console.log("Received post request from mytrips in server")
            let obj = req.body; 
            const email = obj.email;
            
            console.log(email);
            const user = await user_model.findOne({ email: email });
            console.log(user);
            if (!user) {
                return res.json({
                    message: "User not found",
                    data: obj
                });
            }
            else{
                return res.json({
                    message: "Received post request from mytrips",
                    data:user,
                })
            }

        }
        catch (err) {
            console.log(err);
        }
    })
}
module.exports = myTrips;