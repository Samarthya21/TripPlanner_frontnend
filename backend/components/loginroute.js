const user_model = require('../schema.js');
const jwt = require('jsonwebtoken');

function loginroute(app) {
    app.get('/api/v1/login', (req, res) => { 
        return res.json("login");
    })
    app.post('/api/v1/login', async (req, res) => { 
        try {
            console.log('req.body: ', req.body);
            
            console.log("Received post request from login")
            let obj= req.body
            if (!obj.email) {
                console.log("email not present")
                 res.json({
                     message: "email not found",
                     data:obj
                    })
                return;
            }
            if (!obj.password) {
                console.log("User password not present")
                 res.json({
                     message: "User password not found",
                     data:obj
                    })
                return;
            }
           
            let email = obj.email;
            let password = obj.password;
    
            if (password < 8) {
                console.log("User password length is less than 8");
                res.json({
                    message:"User password length is less than 8",
                })
                return;
            }
            
            const user = await user_model.findOne({ email: email });
    
            if (!user) {
                console.log("User id not found")
                res.json({
                    message:"User id not found"
                })
                return;
            }
            else {
                if (user.password === password) {
                    console.log("Login Successful")
                    const payload = { user: { email: user.email } };
                    jwt.sign(payload, 'SAMARTHYA', { expiresIn: 3600 }, (err, token) => {
                        if (err) throw err;
                        res.json({ token });
                    });
                    
                    return;
                }
                else {
                    console.log("User password does not match")
                    res.json({
                        message:"User password does not match"
                    })
                    return;
                }
            }
        }
        catch (err) {
            console.log('Error: ', err);
        }
        
    });   
}

module.exports = loginroute;