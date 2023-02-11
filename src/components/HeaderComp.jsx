import React, { useState } from 'react'
import "./HeaderComp.scss";
import { NavLink } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export default function HeaderComp() {
    const [isLogged, setIsLogged] = useState(false);
    const [profileName, setProfileName] = useState('')
    // const auth = getAuth();

    // useEffect(() => {
    //     onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             setIsLogged(true)

    //             setProfileName(user.displayName)
    //         } else setIsLogged(false)
    //     })
    // }, [auth])

    function onLogout() {
        // auth.signOut();

    }


    return (
        <>

            <Navbar bg="light" expand="sm" className='div-container'>
                <Container fluid >
                    <Navbar.Brand href="#">Get Your Car</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <li > <NavLink to='/' >Home</NavLink> </li>
                            <li > <NavLink to='/offers' >Offers</NavLink> </li>
                            {/* Guest */}
                            {!isLogged && <li ><NavLink to='/sign-in' >Login</NavLink> </li>}
                            {!isLogged && <li ><NavLink to='/sign-up' >Register</NavLink> </li>}
                            {/* Logged User */}
                            {isLogged && <li ><NavLink to='/profile' >Profile</NavLink> </li>}
                            {isLogged && <li ><NavLink to='/create' >Create</NavLink> </li>}
                            {isLogged && <li ><NavLink to='/logout' onClick={onLogout} > Logout</NavLink> </li>}

                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    )
}
