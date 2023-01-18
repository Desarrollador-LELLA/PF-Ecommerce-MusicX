import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import icLogo from '../images/ic_logo_tester.png';
import {Link} from "react-router-dom"

const NavHeader = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container fluid>
                <Navbar.Brand href="/">
                    <img alt="" src={icLogo} width="30" height="30" className="d-inline-block align-top" />{' '}
                    <h1>OriOn MusicX</h1>
                </Navbar.Brand>
                <Link to="/iniciarsesion" className="navbar-brand">Iniciar Sesion</Link>
                    <Link to="/registro" className="navbar-brand">Registro</Link>
            </Container>
        </Navbar>
    );
};

export default NavHeader;