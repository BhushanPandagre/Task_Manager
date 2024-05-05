import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getTask } from '../../../slices/adminSlice';
import { getTaskData } from '../../../stateApis/stateapi';
import { useSelector, useDispatch } from 'react-redux';
import { MdDeleteForever } from 'react-icons/md';
import { GrUpdate } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Alltask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateTaskData = async (data) => {
    dispatch(getTask(data));
  };

  useEffect(() => {
    getTaskData(updateTaskData);
  }, []);

  const allTasks = useSelector((state) => state.admin.tasks);
  const allEmployees = useSelector((state) => state.admin.employees);

  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/v1/deletetask/${id}`);
      if (response.status === 200) {
        toast.success('Task has been deleted', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        getTaskData(updateTaskData);
      } else {
        toast.error('Failed to delete task. Please try again later.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Something went wrong. Please try again later.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const submitAlert = (key) => {
    confirmAlert({
      title: 'Are you sure you want to delete?',
      message: '',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteTask(key._id),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  const downloadTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/export', {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'tasks.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading tasks:', error);
      toast.error('Error downloading tasks. Please try again later.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
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
        style={{ fontSize: '1.8rem', width: 'fit-content', padding: '0 2rem' }}
      />

      <div className="all-task-container">
        <table border={2}>
          {/* Table headers */}
          <thead>
            <tr style={{ fontSize: '20px' }}>
              <th>Serial Number</th>
              <th>Task Title</th>
              <th>Task Description</th>
              <th>Start date</th>
              <th>End date</th>
              <th>Assign to</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody style={{ fontSize: '16px' }}>
            {allTasks.map((key, idx) => (
              <tr key={key._id}>
                <td>{idx+1}</td>
                <td>{key.title}</td>
                <td>{key.discription}</td>
                <td>{formatDate(key.startdate)}</td>
                <td>{formatDate(key.enddate)}</td>
                <td>
                  {allEmployees
                    .filter((key2) => key2._id === key.assign)
                    .map((key3) => (
                      <span key={key3._id}>{key3.name}</span>
                    ))}
                </td>
                <td>{key.status}</td>
                <td>
                  <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                    <MdDeleteForever
                      style={{ color: 'red', fontSize: '2.4rem', marginLeft: '20px', cursor: 'pointer' }}
                      onClick={() => submitAlert(key)}
                    />
                    <GrUpdate
                      style={{ color: 'green', fontSize: '2.2rem', marginRight: '20px', cursor: 'pointer' }}
                      onClick={() => navigate(`/dashboard/updatetask/${key._id}`)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Download Task button */}
        <div className="download-button-container">
          <button onClick={downloadTasks}>Open in Excel</button>
        </div>
      </div>
    </>
  );
};

export default Alltask;