import React, {useRef, useState, useContext, useEffect} from "react";
import {useHistory} from "react-router-dom";
import API from "../utils/API";
import {StoreContext} from "../utils/context";
import Task from '../components/Task';

function Home(){
     const history = useHistory();
     const taskInput = useRef();
     const detailInput = useRef();
     const dateInput = useRef();
     const [tasks, setTasks] = useState([]);
     const {currentUser, setUser} = useContext(StoreContext);

     // Sends a new task to the server
     function submitTask(title, detail, date){
          taskInput.current.value = "";
          detailInput.current.value = "";
          dateInput.current.value = "";
          const task = {
               author_id: currentUser._id,
               title: title,
               detail: detail,
               dueDate: date
          };
          API.submitTask(task)
          .then(response=>{
               console.log(response);
               getTasks();
          }).catch(err=>{
               console.log(err);
          });
     }

     // Queries the server for all the users previously created tasks, or redirects the user to
     // the login page if they are not logged in
     function getTasks(){
          if(currentUser._id){
               API.getTasks({author_id:currentUser._id})
               .then(response=>{
                    const data = response.data;
                    setTasks([]);
                    const task = data.tasks;
                    setTasks([...task]);
               });
          }else{
               history.push("/login");
          }
     }

     // Automatically calls the getTasks function on loading the page
     useEffect(()=>{
          getTasks();
     }, [currentUser]);

     // Sends a request to the server to update a task
     function updateTask(task, id){
          API.updateTask(task, id)
          .then(()=>{
               getTasks();
          }).catch();
     }

     // Sends a request to the server to delete a task
     function deleteTask(id){
          API.deleteTask(id)
          .then(()=>{
               getTasks();
          }).catch();
     }

     // Updates the completion status of a task
     function changeCompletionStatus(bool, id){
          const task = {
               completionStatus:bool
          };
          API.updateTask(task, id)
          .then(()=>{
               getTasks();
          }).catch();
     }

     return(
          <div>
               {/* Logs the user out by setting the currentUser to [], activating the getTasks function which automatically redirects the user if there is no currentUser */}
               <button onClick={()=>{setUser([])}}>Log out</button>
               <table>
                    <tr>
                         <th><label htmlFor="task-title">Enter task</label></th>
                         <th><label htmlFor="task-description">Enter Description</label></th>
                         <th><label htmlFor="dueDate" ref={dateInput}>Enter due date:</label></th>
                    </tr>
                    <tr>
                         <th><input id="task-title" name="task-title" maxLength="10" ref={taskInput}></input></th>
                         <th><textarea id="task-description" name="task-description" maxLength="500" ref={detailInput}></textarea></th>
                         <th><input type="date" htmlFor="dueDate" name="dueDate" ref={dateInput}></input></th>
                    </tr>
               </table>
               <input type="button" value="submitTask" onClick={()=>{
                    submitTask(taskInput.current.value, detailInput.current.value, dateInput.current.value);
               }}></input>

               <br/>
               <br/>

               {JSON.stringify(tasks) !== "[]" ?
               <div>
               <table border="1">
                    <tr>
                         <th>Title</th>
                         <th>Details</th>
                         <th>Status</th>
                         <th>Due date</th>
                    </tr>
                    {tasks.map((task, index)=>{
                    // Iterates over the tasks variable to create a table containing all tasks created by the user, handing down all the relavent information through props to the task component
                    return(
                         <Task key={index}
                              task={task}
                              index={index}
                              updateTask={(task, id)=>updateTask(task, id)}
                              deleteTask={(id)=>deleteTask(id)}
                              changeCompletionStatus={(bool, id)=>changeCompletionStatus(bool, id)}
                         />
                         );
               })}</table>
               {tasks.length > 3 ?<button onClick={()=>{
                    setUser([]);
                    history.push("/login");
               }}>Log out</button>:<span></span>}
               </div>
               :
               <span></span>}
          </div>
     );
}

export default Home;