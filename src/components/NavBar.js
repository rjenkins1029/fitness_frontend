import React from 'react';
import { Link } from 'react-router-dom';



const Navbar = ({ logout, token }) => {
  return (

    <header>
      
      <nav className='Navbar'>

        <h1 >Fitness Trac.kr</h1>

        <Link style={{ textDecoration: 'none' }} to='/'><button
          style={{
            borderColor: '#CBD4C2',
            backgroundColor: '#247BA0', color: '#FFFCFF', width: '100%', borderRadius: 15
          }}>Home</button></Link>


        <Link style={{ textDecoration: 'none' }} to='/activities'><button style={{
            borderColor: '#CBD4C2',
            backgroundColor: '#247BA0', color: '#FFFCFF', width: '100%', borderRadius: 15}}>Activities</button></Link>

        <Link style={{ textDecoration: 'none' }} to='/routines'><button style={{
            borderColor: '#CBD4C2',
            backgroundColor: '#247BA0', color: '#FFFCFF', width: '100%', borderRadius: 15}}>Routines</button></Link>
        {
          token ? (
            <>

              <Link style={{ textDecoration: 'none' }} to='/myroutines'><button style={{
            borderColor: '#CBD4C2',
            backgroundColor: '#247BA0', color: '#FFFCFF', width: '100%', borderRadius: 15}}>MyRoutines</button></Link>


              <Link style={{ textDecoration: 'none' }} to='/' onClick={() => logout()}><button style={{
            borderColor: '#247BA0',
            backgroundColor: '#C3B299', color: '#000000', width: '100%', borderRadius: 15}}>Logout</button></Link>

            </>
          ) : (

            <Link style={{ textDecoration: 'none' }} to='/login'><button style={{
            borderColor: '#247BA0',
            backgroundColor: '#CBD4C2', color: '#000000', width: '100%', borderRadius: 15}}>Login</button></Link>

          )
        }

      </nav>
    </header>

  )
}

export default Navbar;