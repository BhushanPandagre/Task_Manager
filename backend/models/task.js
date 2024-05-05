const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  discription: String,
  startdate: Date,
  enddate: Date,
  assign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee"
  },
  status: {
    type: String,
    enum: ['Pending', 'Done'],
    default: 'Pending',
  },
});

taskSchema.virtual('formattedStartdate').get(function () {
  return moment(this.startdate).format('DD MMMM YYYY');
});

taskSchema.virtual('formattedEnddate').get(function () {
  return moment(this.enddate).format('DD MMMM YYYY');
});


const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
