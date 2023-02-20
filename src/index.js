import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter, Routes, useNavigate } from 'react-router-dom';
import './style.css';
import { CssBaseline, Paper } from '@mui/material';
import {
  Navbar,
  Home,
  Register,
  Login,
  Activities,
  CreateAnActivity,
  EditAnActivity,
  ActivityRoutines,
  MyRoutines,
  Routines,
  EditRoutine,
  UserRoutines
} from './components';

import {
  getActivities,
  getUserDetails,
  getRoutines,
  createRoutine,
  getMyRoutines,
  updateRoutine
} from './api';




const App = () => {
  const [activities, setActivities] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [myRoutines, setMyRoutines] = useState([]);
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});


  const navigate = useNavigate();

  function logout() {
    window.localStorage.removeItem('token');
    setToken('');
    setUser({});
  }

  async function fetchMyRoutines() {
    const results = await getMyRoutines(token, user.username)
    setMyRoutines(results)
  }

  async function fetchActivities() {
    const results = await getActivities()
    setActivities(results);

  }

  async function fetchRoutines() {
    const results = await getRoutines()
    setRoutines(results)
  }

  async function getMe() {
    const storedToken = window.localStorage.getItem('token');

    if (!token) {
      if (storedToken) {
        setToken(storedToken);
      }
      return;
    }

    const results = await getUserDetails(token);
    if (results) {
      setUser(results);
    } else {
      console.log('failed to get user details', results);
    }
  }

  useEffect(() => {
    fetchActivities()
  }, [])


  useEffect(() => {
    fetchRoutines()
  }, [token])

  useEffect(() => {
    getMe();
  }, [token])

  useEffect(() => {
    fetchMyRoutines()
  }, [user])

  return (
    <React.Fragment>
      <CssBaseline />
      <Paper  elevation={16} 
      style={{
        background:'#CBD4C2',
        width:'100%',
        height: '100%'
         }}>
      <header>
        <nav>
          <Navbar
            logout={logout} token={token}
          />
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route
              path='/myroutines'
              element={<MyRoutines
                navigate={navigate}
                myRoutines={myRoutines}
                createRoutine={createRoutine}
                token={token}
                getMe={getMe}
                fetchMyRoutines={fetchMyRoutines}
              />}
            />
            <Route
              path='/routines'
              element={<Routines
                user={user}
                navigate={navigate}
                routines={routines} />}
            />
            <Route
              path='/routines/:username'
              element={<UserRoutines
                navigate={navigate}
                token={token}
              />}
            />
            <Route
              path='/myroutines/editroutine/:_id'
              element={<EditRoutine
                myRoutines={myRoutines}
                user={user}
                navigate={navigate}
                fetchMyRoutines={fetchMyRoutines}
                updateRoutine={updateRoutine}
                token={token}
                allActivities={activities}
              />}
            />
            <Route
              path='/activities'
              element={<Activities
                activities={activities}
                token={token}
                navigate={navigate}
              />}
            />


            <Route
              path='/activities/create-activity'
              element={<CreateAnActivity
                fetchActivities={fetchActivities}
                token={token}
                navigate={navigate} />}
            />
            <Route
              path='/activities/edit-activity/:activityID'
              element={<EditAnActivity
                fetchActivities={fetchActivities}
                navigate={navigate}
                activities={activities}
                token={token}
              />}
            />
                <Route
              path='/activities/routines/:activityId'
              element={<ActivityRoutines
                fetchActivities={fetchActivities}
                fetchRoutines={fetchRoutines}
                navigate={navigate}
                activities={activities}                
              />}
            />
            <Route
              path='/login'
              element={<Login
                setToken={setToken}
                navigate={navigate} />} />
            <Route
              path='/register'
              element={<Register
                setToken={setToken}
                token={token}
                navigate={navigate} />} />
          </Routes>
        </nav>
      </header>
      </Paper>
    </React.Fragment>
  )
}


const container = document.querySelector('#root');
const root = ReactDOM.createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);