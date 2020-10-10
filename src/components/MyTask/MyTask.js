import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import Header from '../Header/Header';
import './MyTask.css';
import image from '../../images/myTask.png'

const MyTask = () => {
    const [tasks, setTasks] = useState([]);
    const [user, setUser] = useContext(UserContext);
    const loadMyTask = () => {
        fetch('https://volunteer-network-spa.herokuapp.com/tasks?email='+user.email, {
            method: "GET",
            headers: {
                authorization: `Bearer ${sessionStorage.getItem('token')}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => setTasks(data));
    }
    loadMyTask();
    
    const deleteTask = id => {
        fetch(`https://volunteer-network-spa.herokuapp.com/deleteTask/${id}`,{
            method: "DELETE"
        })
        .then(res => res.json())
        .then(result => {
            if(result){
                loadMyTask();
            }
        })
    } 
    
    return (
        <div>
            <Header />
            <div className="container py-5">
                <div className="row">
                        {
                            tasks.map(task => 
                                <div className="col-md-6 mt-5" key={task._id}>
                                    <div className="task mb-3 p-3">
                                    <div className="row align-items-center">
                                        <div className="col-4">
                                            <img src={task.task.img || image} className="d-block w-100 rounded" alt="..." />
                                        </div>
                                        <div className="col-8 align-self-start">
                                            <div className="body-text">
                                                <h5 className="mt-sm-3 mb-sm-2">{task.task.name}</h5>
                                                <p>{task.date}</p>
                                                <button onClick={() => deleteTask(`${task._id}`)} className="btn btn-sm btn-danger">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            )
                        }
                </div>
            </div>
        </div>
    );
};

export default MyTask;