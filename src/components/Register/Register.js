import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Register.css';
import Header from '../Header/Header';
import { UserContext } from "../../App";
import { useHistory } from "react-router-dom";



const Register = () => {
    const [user, setUser] = useContext(UserContext);
    const [startDate, setStartDate] = useState(new Date());
    const history = useHistory();
    const handleBlur = (e) => {
        const newUserInfo = {...user};
        newUserInfo[e.target.name] = e.target.value;
        setUser(newUserInfo);
    }
    const handleSubmit = (e) => {
        const userInfo = {...user};
        userInfo.date = startDate.toDateString();
        setUser(userInfo);
        fetch("http://localhost:3360/addVolunteer", {
            method:'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(result => {
            if(result){
                alert(`You Have Registered Successfully`);
                history.push('/')
            }
        })
        e.target.reset();
        e.preventDefault();
    }
    return (
        <div className="container">
             <Header />
            <div className="login-form">
            <form onSubmit={handleSubmit}>
                <h4>Register As Volunteer</h4>
                <div className="form-group my-4">
                    <input onBlur={handleBlur} type="text" className="form-control" name="name" placeholder="Full Name" required="required" />
                </div>
                <div className="form-group my-4">
                  <input type="email" className="form-control" name="email" value={user.email} readonly />
                </div>
                <div className="form-group my-4">
                    <DatePicker className="form-control" selected={startDate} onChange={date => setStartDate(date)} />
                </div>
                <div className="form-group my-4">
                    <input onBlur={handleBlur} type="text" className="form-control" name="desc" placeholder="About You(In short)" required="required" />
                </div>
                <div className="form-group my-4">
                    <input type="text" className="form-control" name="task" value={user.task.name} readonly />
                </div>
                <div className="form-group mt-4 mb-0">
                   <input type="submit" className="btn btn-primary form-control text-white" id="submit-btn" value="Register"/>    
                </div>
            </form>
        </div>
    </div>
    );
}
export default Register;