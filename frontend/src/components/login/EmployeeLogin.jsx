import "../../global.css"
import { Outlet, Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css"
import { employeeLoginX } from "../../slices/employeeSlice";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EmployeeLogin = ()=>{

const navigate = useNavigate();
const dispatch = useDispatch();
const isLogin = useSelector((state)=>state.employee.logindetails.isLogin);
const [message, setmessage] = useState("");
const [employeeData,setEmployeeData] = useState();

  
const handleInput = (e)=>{
console.log(employeeData)
  setEmployeeData((prev)=>{
    return {
  ...prev,
  [e.target.name]:e.target.value
  
    }
  })
}


const Login = async () => {
  axios.post("http://localhost:8000/api/v1/employeelogin", employeeData).then(data => {

      if (data.statusText == "OK") {
          if (data.data.employeelogin) {
              //if admin is login is true redirect to the home page
              console.log("works")
              console.log(data.data);
              dispatch(employeeLoginX(data.data))
              navigate("/employee/dashboard/mytask")
     
                                                                                
          }
          else {
              //if admin login is not true set a message to show on the screen     
              if (data.data.message.length > 0) {   
                  console.log(data)
                  toast.error(` ${data.data.message} `, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                   
                    }) 
                  setmessage(data.data.message)                      
              }   
          }     
      }
      else {
          alert("something went wrong")
      }
  })       
}

useEffect(()=>{


})




  
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
style={{fontSize:"1.8rem", width:"40rem", padding:"0 2rem"}}
/>

      <div className="login-container">       
<div className="login-box">
<div className="login-box-container">

  <h1>Employee Login</h1>
<div className="login-input-container">
    <input type="email" name="employee_id" placeholder="Employee Email" onChange={handleInput} />
    <input type="password" name="password" placeholder="Password" onChange={handleInput}/>
</div>

<button className="primary-button" onClick={()=>{Login()}}> Sign In</button>
<button className="primary-button empbtn" onClick={()=>{navigate("/")}}> Admin Login</button>


</div>
</div>

      </div>
      </>


}

export default EmployeeLogin;