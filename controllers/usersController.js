const db = require("../models");

// Defining methods for the usersController
module.exports = {
  // Finds all users
  findAll: function(req, res) {
    db.User
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // Finds one user
  findById: function(req, res) {
    db.User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // Finds one user by email and then compares the password
  findByEmail: function(req, res){
    db.User
    .find({email:req.body.email})
    .then((dbModel)=>{
      if(JSON.stringify(dbModel) !== "[]"){
        db.User.find({email:req.body.email, password:req.body.password})
        .then(dbCompare=>{
          if(JSON.stringify(dbCompare) !== "[]"){
            res.json({user:dbCompare});
          }else{
            res.json({response:"Username or password incorrect.", action: "clear password"});
          }
        }).catch(err=>{
          console.log(err);
          res.json({response:"Username or password incorrect.", action: "clear password"});
        });
      }else{
        res.json({response:"You do not have an account. Please create an account.", action: "clear all"});
      }
    }).catch((err)=>res.json(err));
  },
  // Creates one user
  create: function(req, res) {
    db.User
      .create(req.body)
      .then(dbModel => res.json({response: "Account created successfully.", action: "clear all", dbModel: dbModel}))
      .catch(err =>{
        res.json({response:"Username or email already associated with an account.", action: "clear all", err:err});
      });
  },
  // Edits one user
  update: function(req, res) {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // Deletes one user
  remove: function(req, res) {
    db.User
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};