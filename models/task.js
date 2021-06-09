const { text } = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {type: String, required: true},
  dueDate: {type: Date, required: true},
  detail: {type: String, required: false},
  completionStatus: {default: false},
  author_id: {type: String, required: true},
  date: {type: Date, default: Date.now}
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;