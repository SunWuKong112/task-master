const db = require("../models");

// Defining methods for the tasksController
module.exports = {
  // Finds all tasks
  findAll: function(req, res) {
    db.Task
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // Finds one task
  findById: function(req, res) {
    db.Task
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // Finds all tasks created by a specific user
  findByAuthor: function(req, res){
    db.Task
      .find({author_id: req.body.author_id})
      .then(dbModel=>{
        res.json({tasks:dbModel});
      })
      .catch(err=>{
        console.log(err);
        res.status(422).json(err);
      });
  },
  // Creates one task
  create: function(req, res) {
    console.log(req.body);
    db.Task
      .create(req.body)
      .then(dbModel =>{
        res.json(dbModel);
      })
      .catch(err => {
        res.status(422).json(err);
      });
  },
  // Edits one task
  update: function(req, res) {
    console.log(req.params);
    console.log(req.body);
    db.Task
      .findOneAndUpdate({ _id: req.params.id }, req.body, {new: true})
      .then(dbModel => {
        console.log(dbModel);
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  // Deletes one task
  remove: function(req, res) {
    db.Task
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};