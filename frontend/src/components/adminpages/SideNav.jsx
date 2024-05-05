import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { FaBars } from "react-icons/fa";
import { adminroutes } from "../../Data";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { adminLogout } from "../../slices/adminSlice";
import { Outlet } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";

const SideNav = () => {

 const isAdminLogin = useSelector((state)=>state.admin.logindetails.isLogin)
 const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
const dispatch = useDispatch();


  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  useEffect(()=>{
    if(!isAdminLogin) navigate('/')
  })

  if(isAdminLogin){
  return (
    <>
      <div className="main-container">

<div className="heading-container">

<h1> Employee Management </h1>

</div>
        
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
           
            <div className="bars">
              {!isOpen ? <FaBars onClick={toggle} /> : <RxCross1 onClick={toggle}/>}
            </div>
          </div>
   
          <section className="routes">
            {adminroutes.map((route, index) => {
             
              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
                 <div
                  to="/"
                  key={4}
                  className="link"
                  onClick={()=>{dispatch(adminLogout())}}
                >
                  <div className="icon"><IoMdLogOut /></div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        Log Out
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
          </section>
        </motion.div>

        <main>


        
        
        <Outlet/>
        </main>
      </div>
    </>
  );

 }
 else{
  navigate('/')
  
 }

};






export default SideNav;