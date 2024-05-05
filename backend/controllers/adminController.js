const admin = require("../models/admin");
const bcrypt = require("bcrypt")


//for set admin account here is the setAdmin method
const setAdmin = async (req, res) => {
    try {
        let data = await new admin(req.body)
        data.save().then(data => {
            console.log(data)
            res.json(data);
        })
    }
    catch (err) {
        res.status(404).json({ success: false, message: "internal server err" })
        console.log(err);
    }
}

//this is the method for admin password updation
const updateAdminPassword = async (req, res) => {

    try {
        let hashpass = await bcrypt.hash(req.body.password, 10);
        let data = await admin.findOneAndUpdate({ email: req.body.email }, { $set: { password: hashpass } }, { new: true })
        if (data) {

            console.log(data)
            res.json({ message: "password updated successfully", redirect: true })
        }
        else {
            res.json({ message: "intrenal server error please try again later", redirect: false })
        }
    }
    catch (err) {

        res.status(404).json({ success: false, message: "internal server err" })
        console.log(err);
    }

}


const adminStaticEmail = "bhushan@gmail.com";
const adminStaticPassword = "bhp2upe@123";

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the entered email and password match the static admin credentials
        if (email === adminStaticEmail && password === adminStaticPassword) {
            // If matched, send login success response
            res.json({ adminlogin: true, message: "Login successful" });
        } else {
            // If not matched, send login failed response
            res.json({ adminlogin: false, message: "Incorrect email or password" });
        }
    } catch (error) {
        console.error('Error during admin login:', error);
        res.status(500).json({ adminlogin: false, message: "Internal server error" });
    }
};


module.exports = { setAdmin, adminLogin, updateAdminPassword }