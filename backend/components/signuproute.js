const user_model = require('../schema.js');
function signuproute(app) { 
    app.post('/api/v1/signup', async (req, res) => {
        try {
            console.log("Received post request from signup")
            let obj = req.body;
            let { email, password } = req.body;
            if (
                password.length < 8
            ) {
                console.log("Password is too short");
                res.json({
                    message: "Password is too short",
                    data: obj
                })
                return;
            }
            if (!email || !password) {
                console.log("Password or Email is empty");
                res.json({
                    message: "Email or Password is empty",
                    data: obj
                })
                return;
            }
            
            else {
                
                if (await user_model.findOne({ email: email })) {
                    console.log("Email already in database , no need to signup")
                    res.json({
                        message: "User already in the database",
                        data: obj
                    })
                    return;
                }
                else {
                    console.log("User signup successful");
                
               
                    let user = await user_model.create({ email:email, password: password });
                    console.log({ message: obj });
                    res.json({
                        message: "user signup done",
                        data: obj,
                    });
                    return;
        
                }
                
        
            }
        
        }
        catch (err) {
            console.log('Error: ', err);
        }
    
    });
}

module.exports = signuproute;