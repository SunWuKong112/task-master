import axios from "axios";

// API access functions
export default {
     login: function(user){
          return axios.post("/api/users/login", user);
     },
     signUp: function(user){
          return axios.post("/api/users/sign-up", user);
     },
     getUsers: function(){
          return axios.get("/api/users");
     },
     submitTask: function(task){
          return axios.post("/api/tasks/new", task);
     },
     updateTask: function(task, id){
          return axios.put(`/api/tasks/${id}`, task);
     },
     getTasks: function(user){
          return axios.post("/api/tasks/by-author", user);
     },
     deleteTask: function(id){
          return axios.delete(`/api/tasks/${id}`);
     }
};