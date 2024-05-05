import "./workpages.css"
import axios from "axios";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getEmployee } from "../../../slices/adminSlice";
import { setEmployeeData, getEmployeeData } from "../../../stateApis/stateapi";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Addemployee = () => {
    const isAdminLogin = useSelector((state)=>state.admin.logindetails.isLogin)
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const [addEmployeeData, setAddEmployeeData] = useState("");







    const handleInput = (e) => {

        setAddEmployeeData((prev) => {

            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })

    }





    const handleSubmitResponse = async (data) => {

        const updateEmpState = (data) => {
            dispatch(getEmployee(data));
        }

        if (data) {
            toast.success(' Employee Added Successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
               
                })
            getEmployeeData(updateEmpState)

        }
        else {

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




if(isAdminLogin){
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

        <div className="add-employee-container" >

            <div className="add-employee-main">

            

                <div className="add-employee-box">
              <div style={{display:"flex",justifyContent:"center",alignItems:"center", fontSize:"2rem",marginBottom:"1rem"}}><h1 >Add Employee</h1></div>  

                    <input type="text" name="name" id="inpt" placeholder="Enter Employee Name" onChange={handleInput} />
                    <input type="email" name="employee_id" id="inpt" placeholder="Enter Employee email" onChange={handleInput} />
                    <input type="password" name="password" id="inpt" placeholder="Enter the Password" minLength={8} onChange={handleInput} />
                    <input type="number" name="mobile" id="inpt" placeholder="Enter Mobile No." onChange={handleInput}/>

                    <button className="primary-button empbtn add-employee" onClick={() => { setEmployeeData(addEmployeeData, handleSubmitResponse) }}>Add Employee</button>



                </div>


            </div>



        </div>
    </>
}
else{
    navigate('/')
}
}




export default Addemployee