import React, { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
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
        task: ''
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
        <Route exact path='/'>
            <Home/>
        </Route>
      </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
