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
     const updateDetail = useRef();
     const updateDueDate = useRef();
     const [tasks, setTasks] = useState([]);
     const {currentUser, setUser} = useContext(StoreContext);

     function submitTask(title, detail, date){
          const task = {
               author_id: currentUser._id,
               title: title,
               detail: detail,
               dueDate: date
          };
          console.log(task);
          API.submitTask(task)
          .then(response=>{
               console.log(response);
               setTasks([...tasks, response]);
          }).catch(err=>{
               console.log(err);
          });
     }

     useEffect(()=>{
          getTasks();
     }, [currentUser]);

     function getTasks(){
          if(currentUser._id){
               API.getTasks({author_id:currentUser._id})
               .then(response=>{
                    const data = response.data;
                    setTasks([]);
                    const task = data.tasks;
                    console.log(task);
                    setTasks([...task]);
               });
          }else{
               history.push("/login");
          }
     }

     function updateTask(task, id){
          API.updateTask(task, id)
          .then(()=>{
               getTasks();
          }).catch();
     }

     function deleteTask(id){
          API.deleteTask(id)
          .then(()=>{
               getTasks();
          }).catch();
     }

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
               <button onClick={()=>{setUser([])}}>Log out</button>
               <form>
                    <label for="task-title">Enter task:</label>
                    <br/>
                    <input id="task-title" name="task-title" maxLength="10" ref={taskInput}></input>
                    <br/>
                    <label for="task-description">Enter Description:</label>
                    <br/>
                    <textarea id="task-description" name="task-description" maxLength="30" ref={detailInput}></textarea>
                    <br/>
                    <label for="dueDate" ref={dateInput}>Enter due date:</label>
                    <br/>
                    <input type="date" for="dueDate" name="dueDate" ref={dateInput}></input>
                    <br/>
                    <input type="button" value="submitTask" onClick={()=>submitTask(taskInput.current.value, detailInput.current.value, dateInput.current.value)}></input>
               </form>
               <br/>
               {JSON.stringify(tasks) !== "[]" ?
               <table>
                    <tr>
                         <th>Title</th>
                         <th>Details</th>
                         <th>Status</th>
                         <th>Due date</th>
                    </tr>
                    {tasks.map((task, index)=>{
                    // const table = task.task;
                    console.log(task);
                    return(
                         <Task task={task} index={index} updateTask={(task, id)=>updateTask(task, id)} deleteTask={(id)=>deleteTask(id)} changeCompletionStatus={(bool, id)=>changeCompletionStatus(bool, id)}/>
                         );
               })}</table>
               :
               <span></span>}
               <button onClick={()=>{
                    setUser([]);
                    history.push("/login");
               }}>Log out</button>
          </div>
     );
}

export default Home;