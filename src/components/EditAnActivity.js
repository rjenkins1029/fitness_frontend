import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { updateActivity } from '../api';
import {
  Button,
  Typography,
  TextField,
  Card,
} from "@mui/material";


const EditAnActivity = ({ activities, fetchActivities, navigate, token, name, description }) => {
  const { activityID } = useParams();
  const [newName, setNewName] = useState(name);
    const [newDescription, setNewDescription] = useState(description);
  if (activities.length) {
    const currentActivity = activities.filter(activity => activity.id === parseInt(activityID));

    console.log(activities)
    const { name, description } = currentActivity;

    


    async function editActivity() {
      const updatedActivity = {
        name: newName,
        description: newDescription,
        id: activityID
      }

      await updateActivity(updatedActivity, token)
      navigate('/activities')
      fetchActivities()
    }

    return (
      <Card elevation={6} style={{
        background: 'black',
        height:'100%',
        padding: '2rem',
        color: 'white',
        textAlign: 'center',
        alignContent: 'center',
        backgroundColor: 'black'

      }}>
        <div className="edit-main-div" >
          <form onSubmit={(event) => {
            event.preventDefault();
            editActivity();


          }}>
            <h1>Edit Activity</h1>

            <TextField style={{
              flexWrap: 'center',
              margin: '.25rem',
              width: '100%',
              backgroundColor: '#FFFCFF',

            }}
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
              type='text'
              placeholder={description}
              onChange={(event) => setNewDescription(event.target.value)}
            />

            <Button style={{
              marginTop: "2%",
              width: "100%",
              borderRadius: 35,
              background: "black",
              opacity: "70%",
              color: "#FFFCFF",
              borderColor: "black",
            }}
              type="submit"
              variant="outlined"
              onClick={() => {
                editActivity();
              }}>Edit Activity</Button>
          </form>
        </div>
      </Card>
    )
  }
  return <h1>Activities Loading</h1>
}

export default EditAnActivity;
