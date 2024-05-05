import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { BiTask } from "react-icons/bi";
import { BsListTask } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { BiCog } from "react-icons/bi";
import { IoMdLogOut } from "react-icons/io";
import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";

const adminroutes = [
 
    {
      path: "/dashboard/setemployee",
      name: "Add employee",
      icon: <FaUser />,
    },
    {
        path: "/dashboard/allemployee",
        name: "Employees",
        icon: <FaUsers />,
      },
    {
      path: "/dashboard/settask",
      name: "Add task",
      icon: <BiTask />,
    },
    {
      path: "/dashboard/alltask",
      name: "Tasks",
      icon: <BsListTask />,
    }
  ];

  const employeeroutes = [

    {
      path: "/employee/dashboard/mytask",
      name: "MyTasks",
      icon: <BsListTask />,
    }

  ]



export {adminroutes, employeeroutes};