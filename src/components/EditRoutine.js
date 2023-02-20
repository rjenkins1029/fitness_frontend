import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'
import { attachRoutineActivity, deleteRoutineActivity } from '../api'
import { EditRoutineActivity } from '../components'
import {
    Button,
    Typography,
    TextField,
    Card,
} from "@mui/material";


const AddActivityToRoutine = ({ routineId, fetchMyRoutines, filteredActivities, setAddActivity, token }) => {
    const [activityId, setActivityId] = useState(undefined)
    const [count, setCount] = useState(0)
    const [duration, setDuration] = useState(0)

    async function addActivity() {
        const newRoutineActivity = {
            routineId,
            count,
            duration,
            activityId
        }
        console.log(newRoutineActivity)
        const response = await attachRoutineActivity(token, newRoutineActivity)
        console.log(response)
    }


    return (
        <Card elevation={6} style={{
            background: '#50514F', margin: '2rem 4rem ',
            background: '#50514F',
            color: '#FFFCFF',
            textAlign: 'center',
            alignContent: 'center'

        }}>
            <form onSubmit={(event) => {
                event.preventDefault();
                setAddActivity(false)
                addActivity();
                fetchMyRoutines();
            }}>
                <select
                    name="activities"
                    id="select-activity"
                    value={activityId}
                    onChange={(event) => setActivityId(event.target.value * 1)}>
                    <option value="">select an option</option>
                    {
                        filteredActivities.map((activity, idx) => {
                            return <option key={idx} value={activity.id}>{activity.name}</option>
                        })
                    }
                </select>
                <TextField style={{
                    flexWrap: 'center',
                    margin: '.25rem',
                    width: '100%',
                    backgroundColor: '#FFFCFF',

                }}
                    className='textInput'
                    type='text'
                    placeholder='duration'
                    onChange={(event) => setDuration(event.target.value * 1)}
                />
                <TextField style={{
                    flexWrap: 'center',
                    margin: '.25rem',
                    width: '100%',
                    backgroundColor: '#FFFCFF',

                }}
                    className='textInput'
                    type='text'

                    placeholder='count'
                    onChange={(event) => setCount(event.target.value * 1)}
                />
                <Button style={{
                    marginTop: "2%",
                    width: "100%",
                    borderRadius: 35,
                    background: "#001242",
                    opacity: "70%",
                    color: "#FFFCFF",
                    borderColor: "#24A6D1",
                }} type='submit'>Add Activity</Button>
                <Button style={{
                    marginTop: "2%",
                    width: "100%",
                    borderRadius: 35,
                    background: "#001242",
                    opacity: "70%",
                    color: "#FFFCFF",
                    borderColor: "#24A6D1",
                }} onClick={() => setAddActivity(false)}>Cancel Action</Button>
            </form>
        </Card>
    )
}

const EditRoutine = ({ myRoutines, navigate, fetchMyRoutines, updateRoutine, token, allActivities }) => {
    const { _id } = useParams();

    const [currentRoutine] = myRoutines.filter(routine => routine.id === _id * 1);
    const { activities, creatorId, creatorName, goal, id, isPublic, name } = currentRoutine;

    const [addActivity, setAddActivity] = useState(false)

    const [newName, setNewName] = useState(name)
    const [newGoal, setNewGoal] = useState(goal)
    const [newIsPublic, setNewIsPublic] = useState(isPublic)


    const activityMatches = (activity, activities) => {
        let i = 0
        while (i < activities.length) {
            if (activities[i].id === activity.id) return false
            else {
                i++
            }
        }
        return true
    }
    const filteredActivities = allActivities.filter(activity => activityMatches(activity, activities))

    async function deleteActivity(token, id) {
        const response = await deleteRoutineActivity(token, id)
    }

    async function editRoutine() {
        const updatedRoutine = {
            name: newName,
            goal: newGoal,
            isPublic: newIsPublic,
            id,
        }
        const response = await updateRoutine(token, updatedRoutine)
    }
    return (
        <Card elevation={6} style={{
            background: '#247BA0', margin: '2rem 4rem ',
           
            color: '#FFFCFF',
            textAlign: 'center',
            alignContent: 'center'

        }}>
            <div className='editRoutineDiv'>
                <form onSubmit={(event) => {
                    event.preventDefault();
                    editRoutine();
                    fetchMyRoutines();
                    navigate('/myroutines')
                }}>
                    <TextField style={{
                        flexWrap: 'center',
                        margin: '.25rem',
                        width: '100%',
                        backgroundColor: '#FFFCFF',

                    }}
                        className='textInput'
                        type='text'
                        placeholder={name}
                        onChange={(event) => setNewName(event.target.value)}
                    />
                    <TextField style={{
                        flexWrap: 'center',
                        margin: '.25rem',
                        width: '100%',
                        backgroundColor: '#FFFCFF',

                    }}
                        className='textInput'
                        type='text'
                        placeholder={goal}
                        onChange={(event) => setNewGoal(event.target.value)}
                    />
                    <span>isPublic
                        <input
                            type='checkbox'
                            onChange={(event) => setNewIsPublic(event.target.checked)}
                        />
                    </span>

                    <Button style={{
                        
                        width: "100%",
                        borderRadius: 35,
                        background: "#001242",
                        opacity: "70%",
                        color: "#FFFCFF",
                        
                    }} type='submit'>Edit Routine</Button>
                </form>
                <h4>Activities</h4>
                {addActivity
                    ? <AddActivityToRoutine routineId={_id} fetchMyRoutines={fetchMyRoutines} filteredActivities={filteredActivities} setAddActivity={setAddActivity} token={token} />
                    :  <Button style={{
                       
                        width: "99%",
                        borderRadius: 35,
                        background: "#001242",
                        opacity: "70%",
                        color: "#FFFCFF",
                        borderColor: "#24A6D1",
                      }} onClick={() => setAddActivity(true)}>add an activity</Button>

                }

                {
                    activities.map((activity) => {
                        const { name, description, duration, count, id, routineActivityId } = activity;
                        return (
                            <Card elevation={6} style={{
                                background: '#C3B299', margin: '2rem 4rem ',
                               
                                color: '#FFFCFF',
                                textAlign: 'center',
                                alignContent: 'center'

                            }}>
                                <li key={id}>
                                    <h5>{name}</h5>
                                    <p>Description: {description}</p>
                                    <p>Duration: {duration}</p>
                                    <p>Count: {count}</p>
                                    <EditRoutineActivity
                                        count={count}
                                        duration={duration}
                                        routineActivityId={routineActivityId}
                                        token={token}
                                        fetchMyRoutines={fetchMyRoutines} />
                                    <Button style={{
                                       margin:'.5rem',
                                       padding:'1em',
                                        borderRadius: 35,
                                        background: "#001242",
                                        opacity: "70%",
                                        color: "#FFFCFF",
                                        width:'94%'
                                      
                                    }} className='Buttons' onClick={() => {
                                        deleteActivity(token, routineActivityId)
                                        fetchMyRoutines();
                                    }}>Delete</Button>
                                </li>
                            </Card>)
                    })
                }
            </div>
        </Card>
    )
}

export default EditRoutine;