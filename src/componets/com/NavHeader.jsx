import React, { useEffect } from 'react';
import { Navbar, Container, Image, Button, ButtonGroup, NavDropdown, Nav, Dropdown, Badge } from 'react-bootstrap';
import icLogo from '../images/ic_logo_tester.png';
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signOutAction } from '../../redux/actions/authAction';
import icUsuario from '../images/ic_usuario.svg';
import icCarro from '../images/ic_carro.svg';
import icSalir from '../images/ic_salir.svg';

const NavHeader = () => {

    const dispatch = useDispatch();
    const { loadingAuth, authenticatedAuth } = useSelector((state) => state.auth);

    const cerrarSesion = () => {
        dispatch(signOutAction());
    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
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
                        <NavLink className='nav-link' to='/iniciarsesion'>
                            Entrar
                        </NavLink>
                        <NavLink className='nav-link' to='/registro'>
                            Registro
                        </NavLink>
                        <NavLink className='nav-link' to='/PerfilUsuario'>
                            Perfil Usu
                        </NavLink>
                        <NavLink className='nav-link' to='/producto_create'>
                            Prod Add
                        </NavLink>
                        <NavLink className='nav-link' to='/perfiladmin'>
                            Perfil Ad
                        </NavLink>
                        <NavLink className='nav-link' to='/generos'>
                            Generos
                        </NavLink>
                        <NavLink className='nav-link' to='/producto_lista'>
                            Prod Lista
                        </NavLink>
                        <NavLink className='nav-link' to='/producto_detalle/xOu9LtSarGtxqXdILyxf'>
                            Prod ID
                        </NavLink>
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
                                    <Dropdown.Item href="#/action-1">Opcion 1</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Opcion 2</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Opcion 3</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={cerrarSesion}><Image src={icSalir} width='24px' />{'   '}Cerrar Sesion</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                    }
                    <Dropdown align="end">
                        <Dropdown.Toggle variant="none" id="dropdown-basic">
                            <Image src={icCarro} />
                            <Badge bg="success position-absolute">
                                0
                            </Badge>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className='position-absolute'>
                            <Dropdown.Item href="#/action-1">Opcion 1</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Opcion 2</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Opcion 3</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            </Container>
        </Navbar>
    );
};
// hola
export default NavHeader;