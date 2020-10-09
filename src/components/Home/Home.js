import React, { useEffect, useState } from 'react';
import Event from '../Event/Event';
import './Home.css';
import Header from '../Header/Header';

const Home = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3360/events')
            .then(res => res.json())
            .then(data => setEvents(data))
    }, [])
    return (
        <div className='home-bg'>
            <div className="blur">
                <Header />
                <div className="container text-center">
                    <h2 className="mt-5 mb-3">I Grow By Helping People In Need</h2>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Search..." aria-label="Recipient's username" aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                            <span className="input-group-text" id="basic-addon2">Search</span>
                        </div>
                    </div>
                    <div className="row py-5">
                        {
                            events.map(event => <Event key={event._id} event={event}></Event>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;