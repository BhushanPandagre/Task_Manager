import { useState } from "react";
import { useParams } from "react-router-dom"
import { updateEmployeeTaskData } from "../../../stateApis/stateapi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateEmpTask = ()=>{

const { task_id } = useParams();
const [addTaskData, setAddTaskData] = useState({

task_id:task_id,
status:"Pending"

});

const handleInput = (e)=>{
    
    setAddTaskData((prev)=>{

        return{
            ...prev,
            [e.target.name]:e.target.value
        }
    })

    console.log(addTaskData,"  addtaskdata")
   
    }

    const handleSubmitResponse = async (data)=>{

    
    if(data){
       
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

    <select name="status" id="select-x" value={addTaskData.status} onChange={handleInput}>

 <option value="Pending">Pending</option> 
 <option value="Done">Done</option>


    </select>

    <button className="primary-button empbtn add-employee " id="addtask-btn" onClick={()=>{updateEmployeeTaskData(addTaskData, handleSubmitResponse)}} >Update Status</button>

        </div>
   </div>
</div>
    </>
}


export default UpdateEmpTask