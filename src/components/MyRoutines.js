import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { deleteRoutine } from '../api';
import {
    Button,
    Typography,
    TextField,
    Card,
} from "@mui/material";

const myRoutines = ({ myRoutines, token, createRoutine, fetchMyRoutines, getMe }) => {
    const [searchTerm, setSearchTerm] = useState('');


    const routineMatches = (routine, text) => {
        if (routine.name.toUpperCase().includes(text.toUpperCase())) return true
    }
    const filteredRoutines = myRoutines.filter(routine => routineMatches(routine, searchTerm))
    const RoutinesToDisplay = searchTerm.length ? filteredRoutines : myRoutines;
    async function removeRoutine(token, _id) {
        await deleteRoutine(token, _id)
    }


    useEffect(() => {
        getMe();
    }, [token])

    return (

        <div className='myRoutinesDiv'>
            <div className='routinesDiv'>
                <Card elevation={6} style={{
                     margin: '2rem 4rem ',
                    background: '#50514F',
                    color: '#FFFCFF',
                    textAlign: 'center',
                    alignContent: 'center'

                }}>
                    <form>
                        <TextField style={{ width: '100%', background: '#FFFCFF' }}
                            type='text'
                            label='Search'
                            onChange={(event) => setSearchTerm(event.target.value)}
                        ></TextField>
                    </form>
                </Card>
                {
                    RoutinesToDisplay.map((routine) => {
                        const { activities, creatorId, creatorName, goal, id, isPublic, name } = routine;
                        return (
                            <Card style={{ padding: '.5rem', margin: '.5rem', background: '#50514F', width:'100%',color:'#FFFCFF'}} elevation={6} key={id}>

                                <h3>{name}</h3>
                                <p>Goal: {goal}</p>
                                <p>Creator: {creatorName}</p>
                                <Link style={{ textDecoration: 'none' }} className='routineButtons' to={`/myroutines/editroutine/${id}`}><Button
                                                        style={
                                                            { height: '4rem',margin:'.25rem', width: '99%', borderRadius: 15, color: '#FFFCFF', background: '#001242' }
                                                        }>Edit</Button></Link>
                                <Button
                            style={
                                { height: '4rem',margin:'.25rem', width: '99%', borderRadius: 15, color: '#FFFCFF', background: '#001242' }
                            } className='postButtons' onClick={() => {
                                    removeRoutine(token, id)
                                    fetchMyRoutines();
                                }}>Delete</Button>
                                <h4>Activities</h4>
                    {
                        activities.map((activity) => {
                            const { name, description, duration, count, id } = activity;
                            return (
                                <Card style={{ padding: '.5rem', margin: '.5rem', background: 'B4D2E7', }} elevation={6} key={id}>
                                        <li key={id}>
                                            <Link style={{
                                                textDecoration: 'none'
                                            }}
                                            to={`/activities/routines/${id}`}><Button
                                            style={
                                                { height: '4rem', width: '100%', borderRadius: 15, background: '#001242',color:'#FFFCFF' }
                                            }><h5>{name}</h5></Button></Link>
                                            <p>Description: {description}</p>
                                            <p>Duration: {duration}</p>
                                            <p>Count: {count}</p>
                                        </li>
                                        
                                    </Card>
                                )
                            })
                            
                        }
                </Card>  
            )
        })
    }
    </div>
            <Card style={{ padding: '.5rem', margin: '.5rem', background: '#C3B299', }} >
                <div className='createRoutineDiv'>
                    <CreateRoutine
                        createRoutine={createRoutine}
                        token={token}
                        fetchMyRoutines={fetchMyRoutines}
                    />
                </div>
            </Card>
        </div>
    )
}

const CreateRoutine = ({ fetchMyRoutines, token, createRoutine }) => {
    const [name, setName] = useState('');
    const [goal, setGoal] = useState('');
    const [isPublic, setIsPublic] = useState(false);

    const newRoutine = {
        name,
        goal,
        isPublic
    }

    async function addRoutine() {
        const result = await createRoutine(token, newRoutine)
        fetchMyRoutines();
    }
    return (
        <Card elevation={6} style={{
            margin: '2rem 4rem ',
            background: '#50514F',
            color: '#FFFCFF',
            textAlign: 'center',
            alignContent: 'center'

        }}>
            <form onSubmit={(event) => {
                event.preventDefault();
                addRoutine()
                fetchMyRoutines()
            }}>
               <TextField style={{ width: '100%', background: '#FFFCFF' }} className='textInput' type='text' placeholder='name' value={name} onChange={(event) => setName(event.target.value)} />
               <TextField style={{ width: '100%', background: '#FFFCFF' }} className='textInput' type='text' placeholder='goal' value={goal} onChange={(event) => setGoal(event.target.value)} />
                <span>isPublic
                    <input
                        type='checkbox'
                        onChange={(event) => setIsPublic(event.target.checked)}
                    />
                </span>
                <Button
                                            style={
                                                { height: '4rem', width: '100%', borderRadius: 15, background: '#001242' ,color:'#FFFCFF'}
                                            } type='submit'>Confirm Create Routine</Button>

            </form>
        </Card>
    )
}




export default myRoutines;