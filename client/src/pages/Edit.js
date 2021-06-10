import React, {useRef, useState, useContext, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {useParams} from "react-router-dom";
import {StoreContext} from "../utils/context";
import API from "../utils/API";

function Edit(){
     const history = useHistory();
     const taskInput = useRef();
     const detailInput = useRef();
     const dateInput = useRef();
     const {currentUser, setUser} = useContext(StoreContext);
     let {taskId} = useParams();
     const [task, setTask] = useState('null');
     
     // const taskInput = useRef();
     // const detailInput = useRef();
     // const dateInput = useRef();

     useEffect(() => {
          getTask();
     }, [currentUser]);

     function getTask(){
          if(currentUser._id){
               console.log(taskId);
               API.getTask(taskId)
               .then(response=>{
                    console.log(response.data);
                    let dueDate;
                    dueDate = response.data.dueDate.split("T");
                    dueDate = dueDate[0];
                    const task = {
                         author_id:response.data.author_id,
                         title:response.data.title,
                         detail:response.data.detail,
                         dueDate:dueDate,
                         date:response.data.date
                    };
                    setTask(task);
               });
          }else{
               history.push("/login");
          }
     }

     function submitTask(title, detail, date){
          const task = {
               title: title,
               detail: detail,
               dueDate: date
          };
          API.updateTask(task, taskId)
          .then(response=>{
               console.log(response);
               getTask();
          }).catch(err=>{
               console.log(err);
          });
     }

     return(
          <div>
               <button onClick={()=>history.push(`/home/:${currentUser._id}`)}>Back</button>
               <button onClick={()=>{setUser([])}}>Log out</button>
               {task !== 'null' ?
               <table>
                    <tr>
                         <th><label htmlFor="task-title">Edit task</label></th>
                         <th><label htmlFor="task-description">Edit Description</label></th>
                         <th><label htmlFor="dueDate">Edit due date:</label></th>
                    </tr>
                    <tr>
                         <th><input id="task-title" name="task-title" maxLength="10" defaultValue={task.title} ref={taskInput}></input></th>
                         <th><textarea id="task-description" name="task-description" maxLength="30" defaultValue={task.detail} ref={detailInput}></textarea></th>
                         <th><input type="date" for="dueDate" name="dueDate" defaultValue={task.dueDate} ref={dateInput}></input></th>
                    </tr>
               </table>:<span></span>}
               <button onClick={()=>{
                    submitTask(taskInput.current.value, detailInput.current.value, dateInput.current.value);
               }}>Update task</button>
          </div>
     );
}

export default Edit;