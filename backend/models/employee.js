const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    mobile: {
        type: Number,
        required:true,
      },
    employee_id: {
        type: String,
        required: true
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        default: []
    }],
    password: {
        type: String,
        required: true
    }
}, { strictPopulate: false });

employeeSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next();
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

employeeSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;