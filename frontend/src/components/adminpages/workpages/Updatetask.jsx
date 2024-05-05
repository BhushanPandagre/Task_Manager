import { useDispatch, useSelector } from "react-redux";
import "./workpages.css"
import Select from 'react-select'
import { useEffect, useState } from "react";
import { getTask } from "../../../slices/adminSlice";
import { getTaskData, updateTaskData } from "../../../stateApis/stateapi";
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Updatetask = ()=>{

    const [addTaskData, setAddTaskData] = useState("")
    const allemployee = useSelector((state)=>state.admin.employees);
    const alltasks = useSelector((state)=>state.admin.tasks);
    const dispatch = useDispatch();
    const { task_id } = useParams();

useEffect(()=>{

    setAddTaskData((prev)=>{

const task = alltasks.filter((key)=>{

    return task_id == key._id

}).map((key)=>{
    
    return key
       
    
})

// const dt = task[0].startdate.split('T');
// task[0].startdate = dt[0]
// console.log(dt)

return {
   ...task[0],
}

 })




},[])

if(addTaskData.startdate){
    
}


    const handleInput = (e)=>{
        console.log(addTaskData);
        setAddTaskData((prev)=>{
        
            return{
                ...prev,
                [e.target.name]:e.target.value
            }
        })
        
        }




        const handleSubmitResponse = async (data)=>{

            const updateTaskState = (data)=>{
        dispatch(getTask(data));
            }
        
        if(data){
            // alert("Task updated successfully");
            toast.success(' Task Updated successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
               
                })
            getTaskData(updateTaskState)
        
        }
        else{
           
            toast.error(' Somthing Went Wrong ', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
               
                })         
           console.log("somthing went wrong");
        
        }
        
        }


    return <>
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
style={{fontSize:"1.8rem", width:"fit-content", padding:"0 2rem"}}
/>
      <div className="add-task-container" >


<div className="add-task-main">



    <div className="add-task-box">


<div>
   <p>Enter Task</p>  
   <input type="text" name="title" placeholder="Enter Task" value={addTaskData.title} onChange={handleInput} />
</div>



<div>
<p>Enter Task Discription</p> 
    <input type="text" name="discription" placeholder="Enter Task Discription" value={addTaskData.discription} onChange={handleInput} />
</div>


<div>  
<p>Enter Start Date</p>
<input type="text" id="dateInput" name="startdate" pattern="\d{4}-\d{2}-\d{2}" value={addTaskData.startdate} placeholder="YYYY-MM-DD" required onChange={handleInput}/>
</div>


<div> 
<p>Enter End Date</p>
<input type="text" id="enddate" name="enddate" pattern="\d{4}-\d{2}-\d{2}" value={addTaskData.enddate} placeholder="YYYY-MM-DD" required onChange={handleInput}/>
</div>


<div>
<p>assign to</p> 
    <select name="assign" id="select" value={addTaskData.assign} onChange={handleInput}>

{allemployee.map((key)=>{
    return <option value={key._id}>{key.name}</option>
})}

    </select>
</div>

<div>
<p>Task status </p> 
    <select name="status" value={addTaskData.status} id="select" onChange={handleInput}>
<option  value="Pending">Pending</option>
<option value="Done">Done</option>
    </select>
</div>

<button className="primary-button empbtn add-employee " id="addtask-btn" onClick={()=>{updateTaskData(addTaskData, handleSubmitResponse)}} >Update Task</button>

</div>


  </div>
    
</div>
    </>
}

export default Updatetask;