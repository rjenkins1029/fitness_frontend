import React from 'react';
import { Link } from 'react-router-dom';



const Navbar = ({ logout, token }) => {
  return (

    <header>
      
      <nav className='Navbar'>

        <h1 >Fitness Trac.kr</h1>

        <Link style={{ textDecoration: 'none' }} to='/'><button
          style={{
            fontSize: '20pt',
            borderColor: '#CBD4C2',
            backgroundColor: 'black', color: '#FFFCFF', width: '100%', borderRadius: 15
          }}>Home</button></Link>


        <Link style={{ textDecoration: 'none' }} to='/activities'><button style={{
          fontSize: '20pt',
            borderColor: '#CBD4C2',
            backgroundColor: 'black', color: '#FFFCFF', width: '100%', borderRadius: 15}}>Activities</button></Link>

        <Link style={{ textDecoration: 'none' }} to='/routines'><button style={{
          fontSize: '20pt',
            borderColor: '#CBD4C2',
            backgroundColor: 'black', color: '#FFFCFF', width: '100%', borderRadius: 15}}>Routines</button></Link>
        {
          token ? (
            <>

              <Link style={{ textDecoration: 'none' }} to='/myroutines'><button style={{
                fontSize: '20pt',
            borderColor: '#CBD4C2',
            backgroundColor: 'black', color: '#FFFCFF', width: '100%', borderRadius: 15}}>MyRoutines</button></Link>


              <Link style={{ textDecoration: 'none' }} to='/' onClick={() => logout()}><button style={{
                fontSize: '13pt',
            borderColor: 'black',
            backgroundColor: 'white', color: '#000000', width: '100%', borderRadius: 15}}>Logout</button></Link>

            </>
          ) : (

            <Link style={{ textDecoration: 'none' }} to='/login'><button style={{
            borderColor: 'black',
            backgroundColor: '#CBD4C2', color: '#000000', width: '100%', borderRadius: 15}}>Login</button></Link>

          )
        }

      </nav>
    </header>

  )
}

export default Navbar;