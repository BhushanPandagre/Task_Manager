import { createSlice } from "@reduxjs/toolkit";


const initialState = {
   
    logindetails:{ 
      id:"",
      name:"",
      employee_id:"",
      isLogin:false,
},
tasks:[]
    
};


export const employeeSlice = createSlice({

    name:"user",
    initialState,
    reducers:{
    
        employeeLoginX:(state,action)=>{

            state.logindetails.id = action.payload.userData._id     
            state.logindetails.name= action.payload.userData.name
            state.logindetails.employee_id= action.payload.userData.employee_id
            state.logindetails.isLogin=true               
        },
        employeeLogout:(state,action)=>{
            state.logindetails.id = ""   
            state.logindetails.name= ""
            state.logindetails.employee_id= ""
            state.logindetails.isLogin=false  

        },
        getTask:(state,action)=>{
            state.tasks = action.payload;
        }
    }
})

export const { employeeLoginX, employeeLogout,getTask} = employeeSlice.actions;
export default employeeSlice.reducer;






