import { Routes, Route } from "react-router-dom";
import AdminLogin from "./components/login/AdminLogin"
import EmployeeLogin from "./components/login/EmployeeLogin";
import SideNav from "./components/adminpages/SideNav";
import Addemployee from "./components/adminpages/workpages/Addemployee";
import Addtask from "./components/adminpages/workpages/Addtask";
import Alltask from "./components/adminpages/workpages/Alltask";
import Updatetask from "./components/adminpages/workpages/Updatetask";
import Allemployee from "./components/adminpages/workpages/Allemployee";
import SideNavEmp from "./components/employeepages/SideNavEmp";
import MyEmpTask from "./components/employeepages/empworkpages/MyEmpTask";
import UpdateEmpTask from "./components/employeepages/empworkpages/UpdateEmpTask";


function App() {
  return (
    <Routes>



      <Route path="/" element={<AdminLogin />}/>



        <Route path="/dashboard" element={<SideNav />}>

          <Route path="/dashboard/setemployee" element={<Addemployee />} />
          <Route path="/dashboard/allemployee" element={<Allemployee />} />
          <Route path="/dashboard/settask" element={<Addtask />} />
          <Route path="/dashboard/alltask" element={<Alltask />} />
          <Route path="/dashboard/updatetask/:task_id" element={<Updatetask />} />


        </Route>


     




      <Route path="/employee" element={<EmployeeLogin />} />

         <Route path= "employee/dashboard" element={<SideNavEmp/>}>
         
         <Route path="/employee/dashboard/mytask" element={<MyEmpTask/>} />
         <Route path="/employee/dashboard/updateemptask/:task_id" element={<UpdateEmpTask/>} />




  </Route>


    </Routes>

  );
}

export default App;
