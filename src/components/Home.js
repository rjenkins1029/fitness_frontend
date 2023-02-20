import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Typography,
   Card,
    CardContent,
     CardMedia,
      Button,
       CardActionArea,
        CardActions 
      } from '@mui/material';
import navPIC from "./images/Home.png"

const Home = () => {
  return (

    <Card elevation={6}style={{ background: '#247BA0'}} >
      <CardContent>
      <Typography variant='h1' component='h3' style={{ color: '#C3B299'}}>
        Welcome to Fitness Trac.kr!
      </Typography>
      </CardContent>
      <CardMedia>
      <img style={{
        backgroundImage: `url(${navPIC})`,
        backgroundPosition: 'center',
        backgroundSize: '100%',
        width:'100%',
        height:'100%',
        backgroundRepeat: 'no-repeat'}} src={navPIC}/>       
        </CardMedia>
        <CardActionArea>
          <CardActions>
          <Link style={{ textDecoration: 'none' }} to='/register'>
          <Button style={{ height: '3rem', margin: '.25rem' }}  variant="contained" >             
              Sign Up!
              </Button>
             </Link>
          </CardActions>
        </CardActionArea>
    </Card>
  )
}

export default Home;