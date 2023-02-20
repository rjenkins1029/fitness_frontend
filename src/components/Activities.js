import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Paper, TextField } from '@mui/material';


const Activities = ({ activities, token }) => {

    const [searchTerm, setSearchTerm] = useState('');
    function activityMatches(activities, string) {
        const { name, description } = activities;
        if (name.toLowerCase().includes(string.toLowerCase()) || description.toLowerCase().includes(string.toLowerCase())) {
            return activities;
        }
    }
    const filteredActivities = activities.filter(activity => activityMatches(activity, searchTerm));
    const activitiesToDisplay = searchTerm.length ? filteredActivities : activities;

    return (
        <Card style={{ padding: '.5rem', margin: '.5rem', background: '#247BA0' }} elevation={6} >
            <div className="main-activity-div">
                <div >
                    <form onSubmit={(event) => {
                        event.preventDefault();
                    }}>
                        <Card style={{ padding: '.5rem', margin: '.5rem', background: '#C3B299', }} >
                            <TextField style={{ width: '100%', background: '#FFFCFF' }}
                                type='text'
                                label='Search'
                                onChange={(event) => setSearchTerm(event.target.value)}
                            ></TextField>
                        </Card>
                    </form>

                </div>
                <div>
                    {token ? (

                        <Link style={{ textDecoration: 'none' }} to='/activities/create-activity'> <Button
                            style={
                                { height: '4rem', width: '100%', borderRadius: 15, background: '#001242' }
                            } variant='contained'
                            type='submit'>
                            Create Activity
                        </Button></Link>

                    ) : (
                        null
                    )}
                    {
                        activitiesToDisplay.map((activity) => {
                            const { name, description, id } = activity;

                            return (
                                <Card key={id} style={{ padding: '.5rem', margin: '.5rem', background: '#FFFCFF', }}>
                                    <div  >
                                        <Link   style={{
                                                            textDecoration: 'none'
                                                        }}
                                                        to={`/activities/routines/${id}`}><h3>{name}</h3></Link>
                                        <p>Description: {description}</p>

                                        {
                                            (
                                                <div>

                                                    <Link
                                                        style={{
                                                            textDecoration: 'none'
                                                        }}
                                                        to={`/activities/edit-activity/${id}`}
                                                    ><Button
                                                        style={{
                                                            height: '3rem',
                                                            margin: '.25rem', width: '100%', borderRadius: 15, backgroundColor: ' #50514F',
                                                        }}
                                                        variant='contained'
                                                        type='submit'>Edit Activity
                                                        </Button> </Link>

                                                </div>

                                            )
                                        }
                                    </div>
                                </Card>
                            )
                        })
                    }
                </div>
            </div>
        </Card>
    )

}
export default Activities;