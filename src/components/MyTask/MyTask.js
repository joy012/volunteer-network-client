import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import Header from '../Header/Header';
import './MyTask.css';

const MyTask = () => {
    const [tasks, setTasks] = useState([]);
    const [user, setUser] = useContext(UserContext);
    useEffect(() => {
        fetch('http://localhost:3360/tasks?email='+user.email, {
            method: "GET",
            headers: {
                authorization: `Bearer ${sessionStorage.getItem('token')}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => setTasks(data));
    }, [])
    console.log(tasks,user)
    return (
        <div style={{backgroundColor: '#eee'}}>
            <Header />
            <div className="container py-5">
                <div className="row">
                        {
                            tasks.map(task => 
                                <div className="col-md-6 mt-5">
                                    <div className="task mb-3">
                                    <div className="row">
                                        <div className="col-4">
                                            <img src={task.task.img} className="d-block w-100" alt="..." />
                                        </div>
                                        <div className="col-8 align-self-start">
                                            <div className="body-text">
                                                <h5 className="mt-3">{task.task.name}</h5>
                                                <p>{task.date}</p>
                                                <button className="btn btn-sm btn-secondary">Cancel</button>
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