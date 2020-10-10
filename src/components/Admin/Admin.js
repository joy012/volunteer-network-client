import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import logo from '../../logos/Group 1329.png';
import './Admin.css';
import DatePicker from "react-datepicker";

const Admin = () => {
    const [allVolunteer, setAllVolunteer] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [formData, setFormData] = useState({
        name: '',
        date: startDate,
        img: '',
        desc: ''
    });
    const location = useLocation();
    const history = useHistory();

    const loadAll = () => {
        fetch('https://volunteer-network-spa.herokuapp.com/allVolunteer')
            .then(res => res.json())
            .then(data => {
                setAllVolunteer(data);
            })
    }
    if (allVolunteer.length === 0) {
        loadAll();
    }
    const goHome = () => {
        history.push('/');
        window.location.reload();
    }

    const deleteTask = id => {
        fetch(`https://volunteer-network-spa.herokuapp.com/deleteTask/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    loadAll();
                }
            })
    }

    const handleBlur = (e) => {
        const newEventInfo = { ...formData };
        newEventInfo[e.target.name] = e.target.value;
        newEventInfo.date = startDate.toDateString();
        setFormData(newEventInfo);
    }

    const handleSubmit = (e) => {
        fetch("https://volunteer-network-spa.herokuapp.com/addEvent", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    alert(`One Event Added Successfully`);
                    history.push('/admin');
                }
            })
        e.target.reset();
        e.preventDefault();
    }

    return (
        <div className='container px-0 mx-auto'>
            <div className='row mt-3 align-items-center justify-content-center'>
                <div className="col-sm-5 px-4">
                    <img src={logo} className="d-block mr-auto w-50" alt="" />
                </div>
                <div className='col-sm-7 mt-4 mt-sm-0 text-center text-sm-left'>
                    <h3>Volunteer Register List</h3>
                </div>
            </div>
            <div className="row full-height">
                <div className="col-md-3">
                    <nav className="nav flex-column my-5 text-center">
                        <Link className="mt-4" to='admin'><i className="fas fa-user-friends"></i> Volunteer Register List</Link>
                        <Link to='/addEvent' className="my-4"><i className="fas fa-plus"></i> Add Event</Link>
                        <Link onClick={goHome}><i className="fas fa-arrow-left"></i> Back To Home</Link>
                    </nav>
                </div>
                <div className="col-md-9 p-0 p-md-3" style={{ backgroundColor: "#F5F6FA" }}>
                    <div className="table-container table-responsive  mt-3 mb-5 mr-4 p-3">
                        {
                            location.pathname === '/admin' &&
                            <table className="table">
                                <thead id='thead' className="bg-light">
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email ID</th>
                                        <th scope="col">Registration Date</th>
                                        <th scope="col">Task List</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allVolunteer.map(volunteer =>
                                            <tr key={volunteer._id}>
                                                <td>{volunteer.name}</td>
                                                <td>{volunteer.email}</td>
                                                <td>{volunteer.date}</td>
                                                <td>{volunteer.task.name}</td>
                                                <td>
                                                    <button onClick={() => deleteTask(`${volunteer._id}`)} className="p-1 p-sm-2 btn btn-danger">
                                                        <i className="far fa-trash-alt"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        }
                        {
                            location.pathname === '/addEvent' &&
                            <form className="p-5" onSubmit={handleSubmit} action="/upload"
                                method="POST"
                                enctype="multipart/form-data">
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <label htmlFor="title">Event Title</label>
                                            <input onBlur={handleBlur} type="text" name='name' className="form-control" id="title" placeholder="Enter Title.." required />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <label htmlFor="date">Event Date</label>
                                            <DatePicker className="form-control" id="date" selected={startDate} onChange={date => setStartDate(date)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <label htmlFor="desc">Description</label>
                                            <textarea onBlur={handleBlur} className="form-control" id="desc" rows="3" placeholder="Event Description.."></textarea>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <label htmlFor="img">Banner</label>
                                            <input type="file" name="file" className="form-control-file" id="img" />
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <input type="submit" className="btn btn-success" value="Add Event" />
                                </div>
                            </form>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;