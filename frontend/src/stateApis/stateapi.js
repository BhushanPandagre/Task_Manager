import axios from"axios"


const getEmployeeData = async (cb)=>{


axios.get("http://localhost:8000/api/v1/getemployee").then(resp=>{

if(resp.data){

    cb(resp.data);
    
    //dispatcher logic will be written here for updating the state of employees 

}
else{

//else part will be here 

}
})

}


const setEmployeeData = async (empdata,cb)=>{


    let data = await axios.post("http://localhost:8000/api/v1/setemployee", empdata);
    
    if(data.data){

cb( data.data )


    }
    else{
       
        cb( data.data )
    }

}



const getTaskData = async (cb)=>{

    axios.get("http://localhost:8000/api/v1/gettask").then(resp=>{
    
    if(resp.data){
    
       
        cb(resp.data)
    
    }
    else{
    //else part will be here 
    }
    }) 
    }

    const setTaskData = async (taskdata,cb)=>{


        let data = await axios.post("http://localhost:8000/api/v1/settask", taskdata);
        
        if(data.data){
    
    cb( data.data )
    
    
        }
        else{
           
            cb( data.data )
        }
    
    }


    const updateTaskData = async (taskdata,cb)=>{

        let data = await axios.put(`http://localhost:8000/api/v1/updatetask/${taskdata._id}`, taskdata);      
        if(data.data){
    
    cb( data.data )   
        }
        else{
           
            cb( data.data )
        }
    
    }

    const getEmpTaskData = async (taskdata,cb)=>{

        let data = await axios.get("http://localhost:8000/api/v1/getemployeetask/"+taskdata, taskdata);      
        if(data.data){
    console.log(data.data)
    cb( data.data )   
        }
        else{          
            cb( data.data )
        }
    
    }  


    const updateEmployeeTaskData = async (taskdataX,cb)=>{

        let data = await axios.put(`http://localhost:8000/api/v1/updatetask/${JSON.parse(JSON.stringify(taskdataX.task_id))}`, {status:taskdataX.status});      
        if(data.data){
    
    cb( data.data )   
        }
        else{
           
            cb( data.data )
        }
    
    }

    

    export  { setEmployeeData, getEmployeeData, getTaskData, setTaskData, updateTaskData, getEmpTaskData, updateEmployeeTaskData }