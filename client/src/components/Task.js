import React, {useRef} from 'react';
import {useHistory} from "react-router-dom";

function Task({task, index, updateTask, deleteTask, changeCompletionStatus}){
     const history = useHistory();
     const id = `task-${index}`;
     const updateInput = useRef();
     const dateInput = useRef();
     const dueDate = task.dueDate.split("T");

     function ellipsify (str) {
          if (str.length > 10) {
               return (str.substring(0, 10) + "...");
          }
          else {
               return str;
          }
     }

     return(
     <tr id={id}>
          <td>{task.title}</td>
          <td>
               <p>{ellipsify(task.detail)}</p>
          </td>
          <td>{task.completionStatus === true ?
               <span>Completed <button onClick={()=>changeCompletionStatus(false, task._id)}>Mark as in progress</button></span>
          :
               <span>In progress <button onClick={()=>changeCompletionStatus(true, task._id)}>Mark as completed</button></span>}
          </td>
          <td><p type="date">{dueDate[0]}</p></td>
          {/* <button onClick={()=>{
               const updatedTask = {
                    detail:updateInput.current.value,
                    dueDate:dateInput.current.value
               };
               updateTask(updatedTask, task._id);
               // console.log(task);
          }}>Update task</button> */}
          <button onClick={()=>history.push(`/home/edit/${task._id}`)}>Edit</button>
          <button onClick={()=>deleteTask(task._id)}>Delete task</button>
     </tr>);
}

export default Task;