import React,{useState} from "react";

function TodoList()
{
    
   const [tasks,setTasks] = useState(["Learn JS","Watch football","Sleep"]);
   const [newTasks,setNewTask] = useState("");

   function handleInputChange(event)
   {
      setNewTask(event.target.value);
   }

   function displayCheck(check)
   {
      if(check === true)
      {
      document.querySelector('.nofication-container').style.display = "block";
      }else
      {
      document.querySelector('.nofication-container').style.display = "none";
      }
   }

   function addTask()
   {
      if(newTasks.trim() !== "")
      {
      setTasks(t => [...t,newTasks]);
      setNewTask("");
      }else{
        document.querySelector('.nofication').innerHTML = "Enter a task";
        setTimeout(()=>{
            document.querySelector('.nofication').innerHTML = "";
        },1000);
      }
   }
   function deleteTask(index)
   {

      setTasks(tasks.filter((_,i)=>{
         return i !== index;
       }));
   }
   function moveTaskUp(index)
   {
      if(index > 0)
      {
         const updatedTasks = [...tasks];
         [updatedTasks[index],updatedTasks[index-1]] = [updatedTasks[index-1],updatedTasks[index]];
         setTasks(updatedTasks);
      }
   }

   function moveTaskDown(index)
   {
    if(index < tasks.length -1)
        {
           const updatedTasks = [...tasks];
           [updatedTasks[index],updatedTasks[index+1]] = [updatedTasks[index+1],updatedTasks[index]];
           setTasks(updatedTasks);
        }
   }
   let tmp = null;

   return(
      <>
     <div className="todo-list-container">
          <h1>To do list</h1>
          
          <div>
             <input type="text" placeholder="Enter a task..." value={newTasks} onChange={handleInputChange}/>
             <button className="add-button" onClick={addTask}>Add</button>
             <p className="nofication"></p>

          </div>

          <ol>
            {tasks.map((task,index)=>{
                return <li key={index}> 
                <span className="text">{index+1 +"."}{task}</span>
                <button className="delete-button" onClick={()=> {displayCheck(true); tmp = index}}>Delete</button>
                <button className="move-button" onClick={() => moveTaskUp(index)}>👆</button>
                <button className="move-button" onClick={() => moveTaskDown(index)}>👇</button>


                 </li>
            })}
          </ol>
     </div>
     <div className="nofication-container">
        <span>Do you want delete this task</span>
        <button className="yes-button" onClick={()=>{deleteTask(tmp); displayCheck(false)}} >Yes</button>
        <button className="no-button" onClick={()=>displayCheck(false)}>No</button>
     </div>
     </>
   )
}
export default TodoList;