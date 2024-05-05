const express = require('express');
const { setAdmin, adminLogin, updateAdminPassword } = require("./controllers/adminController");
const {setEmployee, employeeLogin, updateEmployeePassword, deleteEmployee,getemployee} = require("./controllers/empController")
const {setTask, deleteTask, getTask, updateTask, getEmployeeTask} = require("./controllers/taskController")
const router = require("express").Router();

const Employee = require('./models/employee');
const Task = require('./models/task');
const exceljs = require('exceljs');

//admin routes
router.route("/api/v1/setadmin").post(setAdmin);
router.route("/api/v1/adminlogin").post(adminLogin);



//employee routes

router.route("/api/v1/setemployee").post(setEmployee)
router.route("/api/v1/delete_employee/:id").delete(deleteEmployee);
router.route("/api/v1/getemployee").get(getemployee)
router.route("/api/v1/employeelogin").post(employeeLogin)

//task routes
router.route("/api/v1/settask").post(setTask)
router.route("/api/v1/deletetask/:id").delete(deleteTask)
router.route("/api/v1/gettask").get(getTask)
router.route('/api/v1/updatetask/:id').put(updateTask)
router.route('/api/v1/getemployeetask/:id').get(getEmployeeTask)



router.get('/api/v1/export', async (req, res) => {
    try {
      // Fetch all employees with their tasks
      const employees = await Employee.find().populate('tasks');
  
      // Create a new Excel workbook
      const workbook = new exceljs.Workbook();
      const worksheet = workbook.addWorksheet('Employees');
  
      // Add headers
      worksheet.addRow(['Employee Name', 'Tasks']);
  
      // Add employee data
      employees.forEach(employee => {
        const tasks = employee.tasks.map(task => task.title).join(', ');
        worksheet.addRow([employee.name, tasks]);
      });
  
      // Generate Excel file
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename="employees_tasks.xlsx"');
  
      // Stream Excel workbook to response
      await workbook.xlsx.write(res);
      res.end();
    } catch (error) {
      console.error('Export failed:', error);
      res.status(500).send('Export failed');
    }
  });






module.exports = router;