import React, { useState } from "react";
import { createActivity } from '../api';
import {
  Popover,
  Button,
  Typography,
  TextField,
  Card,  
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions
} from "@mui/material";
import navPIC from "./images/CreateActivity.png"

const CreateAnActivity = ({ token, fetchActivities, navigate }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const newActivity = {
    name,
    description,
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [error, setError] = useState('')

  const handleClick = async (event) => {
    setAnchorEl(event.currentTarget);
    const results = await createActivity(token, newActivity);
    console.log(results, "TEST")
    if ("error" in results) {

      setError(results.error);

    } else {

      setError('new!');
      fetchActivities();
      navigate('/activities')

    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Card elevation={6} style={{ background: '#50514F',margin:'2rem' }}>
      <form onSubmit={(event) => {
        event.preventDefault();      
      }}>

        <CardContent>
        <CardMedia>
          <img style={{
            backgroundImage: `url(${navPIC})`, height: '25rem', width: '100%',
            backgroundPosition: 'top',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }} src={navPIC} />
        </CardMedia>
          <Typography variant='h1' component='h3' style={{ color: '#C3B299' }}>
            Create An Activity
          </Typography>
          <TextField style={{ background: '#FFFCFF', color: '#000000'}}
            type='text'
            label="Name*"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <TextField style={{ background: '#FFFCFF', color: '#000000'}}
            type='text'
            label="Description*"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </CardContent>

        <CardActionArea>
          <CardActions>
            <Button style={{ height: '3rem', margin: '.25rem' }} aria-describedby={id} variant="contained" onClick={handleClick}>
              Create A New Activity
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <Typography sx={{ p: 2 }}>{error}</Typography>
            </Popover>
          </CardActions>
        </CardActionArea>

      </form>
    </Card>
  )
}

export default CreateAnActivity;