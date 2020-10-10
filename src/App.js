import React, { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Admin from './components/Admin/Admin';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import MyTask from './components/MyTask/MyTask';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Register from './components/Register/Register';


export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({
        name: '',
        email: '',
        desc: '',
        task: '',
        date: ''
    })

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Router>
      <Switch>
        <Route path='/home'>
            <Home/>
        </Route>
        <Route path='/login'>
            <Login/>
        </Route>
        <PrivateRoute path='/register'>
            <Register/>
        </PrivateRoute>
        <PrivateRoute path='/myTask'>
            <MyTask/>
        </PrivateRoute>
        <PrivateRoute path='/admin'>
            <Admin/>
        </PrivateRoute>
        <PrivateRoute path='/addEvent'>
            <Admin/>
        </PrivateRoute>
        <Route exact path='/'>
            <Home/>
        </Route>
      </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
