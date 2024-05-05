import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { adminLogin } from "../../slices/adminSlice";
import "./style.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.admin.logindetails.isLogin);
  const [message, setMessage] = useState("");
  const [adminData, setAdminData] = useState({ email: "", password: "" });

  const handleInput = (e) => {
    setAdminData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const login = async () => {
    try {
      const { data } = await axios.post("http://localhost:8000/api/v1/adminlogin", adminData);
      console.log(data); // Check the response data
      if (data.adminlogin) {
        dispatch(adminLogin({
          id: 'admin123',
          name: 'Admin User',
          email: adminData.email,
          isLogin: true
        }));
        navigate("/dashboard/setemployee");
      } else {
        toast.error(data.message);
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error during admin login:', error);
      toast.error("Internal server error");
    }
  };

  return (
    <>
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
        style={{ fontSize: "1.8rem", width: "40rem", padding: "0 2rem" }}
      />

      <div className="login-container">
        <div className="login-box">
          <div className="login-box-container">
            <h1>Admin</h1>
            <div className="login-input-container">
              <input type="email" placeholder="Email or Phone" name="email" onChange={handleInput} />
              <input type="password" placeholder="Password" name="password" onChange={handleInput} pattern="[a-zA-Z0-9]+" title="Only alphanumeric characters are allowed" required />
            </div>
            <button className="primary-button" onClick={login}> Sign In</button>
            <button className="primary-button empbtn" onClick={() => { navigate("employee") }}> Employee Login</button>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
