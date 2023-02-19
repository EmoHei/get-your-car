import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import "./HeaderComp.scss";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function HeaderComp() {
    const [isLogged, setIsLogged] = useState(false);
    const [profileName, setProfileName] = useState('')
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLogged(true)

                setProfileName(user.displayName)
            } else setIsLogged(false)
        })
    }, [auth])

    function onLogout() {
        auth.signOut();
    }
    return (
        <>
            <Navbar bg="light" expand="sm" className='div-container'>
                <Container fluid className='nav-container'>
                    <Navbar.Brand className='logo' >
                        <span className='get'>Get</span>
                        <span className='your'>Your</span>
                        <span className='car'>Car</span>  </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '200px' }}
                            navbarScroll
                        >

                            <li > <NavLink to='/' >HOME</NavLink> </li>
                            <li > <NavLink to='/offers' >OFFERS</NavLink> </li>
                            {/* Guest */}
                            {!isLogged && <li ><NavLink to='/login' >LOGIN</NavLink> </li>}
                            {!isLogged && <li ><NavLink to='/register' >REGISTER</NavLink> </li>}
                            {/* Logged User */}
                            {isLogged && <li ><NavLink to='/profile' >PROFILE</NavLink> </li>}
                            {isLogged && <li ><NavLink to='/create' >CREATE</NavLink> </li>}
                            {isLogged && <li ><NavLink to='/logout' onClick={onLogout} > Logout</NavLink> </li>}

                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    )
}