import "./workpages.css";
import axios from "axios";
import { getEmployee } from "../../../slices/adminSlice";
import { getEmployeeData } from "../../../stateApis/stateapi";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Allemployee = ()=>{
    const isAdminLogin = useSelector((state)=>state.admin.logindetails.isLogin)
    const navigate = useNavigate();
   
    //This is the code to update the react state instanly when the component renders;
    const dispatch = useDispatch();
    const empdt = useSelector((state)=>state.admin.employees)

const updateEmpData = async (data)=>{
    dispatch(getEmployee(data))
}
useEffect(()=>{
    getEmployeeData(updateEmpData);

},[])

 const allEmployees = useSelector((state)=>state.admin.employees);




 const deleteEmployee = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:8000/api/v1/delete_employee/${id}`);
    if (response.data.success) {
      toast.success('Employee has been deleted', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      getEmployeeData(updateEmpData);
    } else {
      toast.error('Something went wrong', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  } catch (error) {
    console.error('Error deleting employee:', error);
    toast.error('Something went wrong', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};

const submitAlert = (key) => {
    confirmAlert({
      title: "Are you sure want to delete",
      message: "",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteEmployee(key)
        },
        {
          label: "No"
          // onClick: () => alert("Click No")
        }
      ]
    });
  };


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

     <div className="all-employee-container" >

<table border={2}>

<tr>
    <th>
        <h1>Serial Number</h1>
    </th>
    <th>
       <h1> Employee Name</h1>
    </th>
    <th>
      <h1>  Employee Email</h1>
    </th>
    <th>
      <h1>Employee Phone</h1>
    </th>
<th>
    <h1>Action</h1>
</th>

</tr>

{ allEmployees.map((key, idx)=>{


return <tr>
    <td> <h1>{idx+1}</h1></td>
    <td> <h1>{key.name}</h1></td>
    <td> <h1>{key.employee_id}</h1> </td>
    <td> <h1>{key.mobile}</h1> </td>
    <td>        <MdDeleteForever style={{color:"red", fontSize:"2.4rem", marginLeft:"20px",cursor:"pointer"}} onClick={()=>{submitAlert(key._id)}} /></td>


     </tr>

})}

</table>


     </div>
    </>
}
else{
    navigate('/')
}
}

export default Allemployee