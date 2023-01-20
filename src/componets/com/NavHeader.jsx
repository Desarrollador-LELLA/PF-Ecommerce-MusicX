import React, { useEffect } from 'react';
import { Navbar, Container, Image, Button, ButtonGroup, NavDropdown, Nav, Dropdown } from 'react-bootstrap';
import icLogo from '../images/ic_logo_tester.png';
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
// import { loadingAction, needVerificationAction, getUserById } from '../../redux/actions/authAction';
import icUsuario from '../images/ic_usuario.svg';
import icCarro from '../images/ic_carro.svg';

const NavHeader = () => {

    const { loadingAuth, authenticatedAuth } = useSelector((state) => state.auth);

    return (
        <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
            <Container fluid>
                <Navbar.Brand href="/">
                    <img alt="" src={icLogo} width="30" height="30" className="d-inline-block align-top" />{' '}
                    OriOn MusicX
                </Navbar.Brand>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink className='nav-link' to='/aboutus'>
                            About
                        </NavLink>
                        {/* AGREGAR MAS LINK SE LO DECENA COPY PASTE NavLink DE ARRIBA */}
                    </Nav>
                    {
                        loadingAuth ? null : !authenticatedAuth &&
                        <ButtonGroup>
                            <Link className='btn btn-primary' to='/iniciarsesion'>
                                Entrar
                            </Link>
                            <Link className='btn btn-secondary me-3' to='/registro'>
                                Registrar
                            </Link>
                        </ButtonGroup>
                    }
                </Navbar.Collapse>
                <Nav className='d-flex flex-row-reverse ms-auto'>
                    {
                        loadingAuth ? null : authenticatedAuth &&
                        <Dropdown align="end">
                            <Dropdown.Toggle variant="none" id="dropdown-basic">
                                <Image src={icUsuario} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu className='position-absolute'>
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    }
                    <Dropdown align="end">
                        <Dropdown.Toggle variant="none" id="dropdown-basic">
                            <Image src={icCarro} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu className='position-absolute'>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            </Container>
        </Navbar>
    );
};

export default NavHeader;