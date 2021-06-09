const db = require("../models");

// Defining methods for the tasksController
module.exports = {
  findAll: function(req, res) {
    db.Task
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Task
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
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
  update: function(req, res) {
    console.log(req.params);
    console.log(req.body);
    db.Task
      .findOneAndUpdate({ _id: req.params.id }, req.body, {new: true})
      // .findById({_id: req.params.id})
      .then(dbModel => {
        console.log(dbModel);
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Task
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};