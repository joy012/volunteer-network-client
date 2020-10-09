import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Events.css';

const Event = ({ event }) => {
    const [user, setUser] = useContext(UserContext);
    const { name, img } = event;
    const color = ['#FFBD3E', '#3F90FC', '#FF7044', '#421FCF', '#6c757d', '#dc3545'];
    const randomColor = Math.round(Math.random() * 5);
    const handleTask = e => {
        const updatedUser = {...user};
        updatedUser.task = event;
        setUser(updatedUser);
    }

    return (
        <div className='col-6 col-md-4 col-lg-3'>
            <Link to='/register'>
                <div onClick={handleTask} className="card my-3" style={{ width: '18rem' }}>
                    <img src={img} className="card-img-top" alt="..." />
                    <div className="card-body text-center" style={{ backgroundColor: color[randomColor] }}>
                        <h5 className="text-white h5">{name}</h5>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Event;