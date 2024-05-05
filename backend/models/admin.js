const mongoose =  require("mongoose")
const { required } = require("nodemon/lib/config")
const bcrypt = require("bcrypt")

const scheama = new mongoose.Schema({

    name:{
        type:String,
        required:[true,"name is required"]
    },
    mobile:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true

    }

})



scheama.pre("findOneAndUpdate", async function (next) {
    const update = this.getUpdate() // {password: "..."}
    if (update.password) {
      
      this.setUpdate({ $set: { 
         password: passwordHash
        } 
      });
    }
    next()
  });





scheama.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next();

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
     
scheama.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const admin = mongoose.model("admin",scheama);

module.exports = admin;