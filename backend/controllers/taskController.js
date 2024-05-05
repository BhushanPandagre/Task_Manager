const task = require("../models/task");
const employee = require("../models/employee");
const mongoose = require('mongoose');

const setTask = async (req, res) => {
    try {
        let assigneeId = req.body.assign; // Check if an employee is explicitly selected for the task
        if (!assigneeId) {
            // If no employee is explicitly selected, find the first employee in the database
            const firstEmployee = await employee.findOne({}).sort({ _id: 1 });

            // If no employee is found, return an error
            if (!firstEmployee) {
                return res.status(404).json({ success: false, message: "No employees found" });
            }

            // Assign the task to the first employee in the database
            assigneeId = firstEmployee._id;
        }

        // Create a new task with the assigneeId
        const newTask = new task({
            title: req.body.title,
            discription: req.body.discription,
            startdate: req.body.startdate,
            enddate: req.body.enddate,
            assign: assigneeId // Assign the task to the selected employee or the default employee
        });

        // Save the new task
        const savedTask = await newTask.save();

        // Update the tasks array of the selected employee
        await employee.findByIdAndUpdate(assigneeId, { $push: { tasks: savedTask._id } });

        // Return the saved task as the response
        res.status(200).json(savedTask);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}


const updateTask = async (req, res) => {

    try {

        let data = await task.findByIdAndUpdate(req.params.id, req.body);
        data.save().then(resp => {
            res.json(resp);
        })

    }
    catch (err) {
        res.status(404).json({ success: false, message: "internal server err" })
        console.log(err);

    }


}
const deleteTask = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ success: false, message: "Invalid task ID" });
        }

        let data = await task.findOneAndDelete({ _id: req.params.id });
        if (!data) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        let employee_id = data.assign;
        console.log(data);

        if (data.assign != null) {
            let employeeData = await employee.findOneAndUpdate(
                { _id: data.assign },
                { $pull: { tasks: data._id } },
                { new: true }
            );
            // No need to call save() on employeeData, as findOneAndUpdate already saves the changes.
        }

        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}


const getTask = async (req, res) => {

    try {
        let data = await task.find();
        res.json(data);

    }
    catch (err) {
        res.status(404).json({ success: false, message: "internal server err" })
        console.log(err);

    }


}

const getEmployeeTask = async (req, res) => {
    try{

    let emp_id = req.params.id    
    console.log("works  "+emp_id)
    let data = await task.find();
    data = data.filter((key)=>{

        return emp_id == key.assign;
    })
    res.json(data);
    console.log(data);
    }
    catch{
         res.status(404).json({ success: false, message: "internal server err" })
        console.log(err);
    }
}


module.exports = { setTask, deleteTask, getTask, updateTask, getEmployeeTask, }