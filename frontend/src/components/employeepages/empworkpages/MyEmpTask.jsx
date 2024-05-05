import axios from "axios";
import { getTask } from "../../../slices/employeeSlice";
import { getEmpTaskData } from "../../../stateApis/stateapi";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const MyEmpTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mytask = useSelector((state) => state.employee.tasks);
  let emp_id = useSelector((state) => state.employee.logindetails.id);

  console.log(emp_id);

  const updateTaskData = async (data) => {
    dispatch(getTask(data));
  };
  useEffect(() => {
    console.log(mytask);
    if (emp_id) {
      getEmpTaskData(emp_id, updateTaskData);
    }
  }, []);

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  return (
    <>
      <div className="all-task-container">
        <table border={2}>
          <tr style={{ fontSize: '20px' }}>
            <th>
              Seriel Number
            </th>

            <th>
              Task Title
            </th>

            <th>
               Task discription 
            </th>

            <th>
              Start date
            </th>

            <th>
              Endtart date
            </th>

            <th>
              Status
            </th>
            <th>
              Action
            </th>
          </tr>
          {mytask.map((key, idx) => {
            return (
              <>
                <tr style={{ fontSize: '16px' }}>
                  <td>
                    {idx + 1}
                  </td>
                  <td>
                    {key.title}
                  </td>

                  <td>
                    {key.discription}
                  </td>

                  <td>
                    {formatDate(key.startdate)} 
                  </td>

                  <td>
                    {formatDate(key.enddate)}
                  </td>

                  <td>
                    {key.status}
                  </td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                    >
                      <GrUpdate
                        style={{
                          color: "green",
                          fontSize: "2.2rem",
                          marginRight: "20px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          navigate(
                            `/employee/dashboard/updateemptask/${key._id}`
                          );
                        }}
                      />
                    </div>
                  </td>
                </tr>
              </>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default MyEmpTask;