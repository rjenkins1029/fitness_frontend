import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import {activityRoutines} from '../api';
import { Button, Card, TextField } from '@mui/material';


const ActivityRoutines = ({ activities }) => {
    const { activityId } = useParams();
    const [routines,setRoutines] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    async function fetchActivityRoutines() {        
        const results = await activityRoutines(activityId)
        setRoutines(results);
    
      }
useEffect(()=>{
    fetchActivityRoutines()
},[activityId])
const routineMatches = (routine, text) => {
    if(routine.name.toUpperCase().includes(text.toUpperCase())) return true
}
    const filteredRoutines = routines.filter(routine => routineMatches(routine, searchTerm))
    const RoutinesToDisplay = searchTerm.length ? filteredRoutines : routines;
    return(
        <div className='routinesDiv'>
            <form>
            <Card style={{ padding: '.5rem', margin: '.5rem', background: '#C3B299'}} >
            <TextField style={{ width: '100%', background: '#FFFCFF' }}
                                type='text'
                                label='Search'
                                onChange={(event) => setSearchTerm(event.target.value)}
                            ></TextField>
                            </Card>
            </form>
       {
        RoutinesToDisplay.map((routine) => {
            const {activities, creatorId, creatorName, goal, id, isPublic, name} = routine;
            return (
                <Card style={{ padding: '.5rem', margin: '.5rem', background: '#FFFCFF', width:'94%%' }} elevation={6} >
                <div className='routine' key={id}>
                    <h3>{name}</h3>
                    <p>Goal: {goal}</p>
                    <p>Creator: {creatorName}</p>
                    <h4>Activities</h4>
                    <ul>
                    {
                        activities.map((activity) => {
                            const {name, description, duration, count, id} = activity;
                            return (
                                <Card style={{ padding: '.5rem', margin: '.5rem', background: '#247BA0',width:'98%' , color:'#FFFCFF'}} elevation={6} >
                                <li key={id}>
                                    <Link   style={{
                                                            textDecoration: 'none'
                                                        }}
                                                        to={`/activities/routines/${id}`}><Button
                                                        style={
                                                            { height: '4rem', width: '100%', borderRadius: 15, background: '#001242', color:'#FFFCFF' }
                                                        }><h5>{name}</h5></Button></Link>
                                    <p>Description: {description}</p>
                                    <p>Duration: {duration}</p>
                                    <p>Count: {count}</p>
                                </li>
                                </Card>
                            )
                        })
                    }
                    </ul>
                </div>
                </Card>

            )
        })
       }
       </div>
       
    )
}






export default ActivityRoutines;