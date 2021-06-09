import React, {useRef} from 'react';

function Task({task, index, updateTask, deleteTask, changeCompletionStatus}){
     const id = `task-${index}`;
     const updateInput = useRef();
     const dateInput = useRef();
     const dueDate = task.dueDate.split("T");
     return(
     <tr id={id}>
          <td>{task.title}</td>
          <td>{task.detail ?
               <textarea ref={updateInput} maxLength="100" defaultValue={task.detail} />
          : <span></span>}
          </td>
          <td>{task.completionStatus === true ?
               <span>Completed <button onClick={()=>changeCompletionStatus(false, task._id)}>Mark as in progress</button></span>
          :
               <span>In progress <button onClick={()=>changeCompletionStatus(true, task._id)}>Mark as completed</button></span>}
          </td>
          <td><input ref={dateInput} type="date" defaultValue={dueDate[0]}></input></td>
          <button onClick={()=>{
               const updatedTask = {
                    detail:updateInput.current.value,
                    dueDate:dateInput.current.value
               };
               updateTask(updatedTask, task._id);
               // console.log(task);
          }}>Update task</button>
          <button onClick={()=>deleteTask(task._id)}>Delete task</button>
     </tr>);
}

export default Task;