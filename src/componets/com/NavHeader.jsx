import React from 'react';
import { Navbar, Container, Image, ButtonGroup, Nav, Dropdown, Badge, Card, Row, Col, Button } from 'react-bootstrap';
import icLogo from '../images/ic_logo_tester.png';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signOutAction } from '../../redux/actions/authAction';
import icUsuario from '../images/ic_usuario.svg';
import icCarro from '../images/ic_carro.svg';
import icSalir from '../images/ic_salir.svg';
import icPerfil from '../images/ic_perfil.svg';
import icProductos from '../images/ic_productos.svg';
import icGeneros from '../images/ic_generos.svg';
import s from '../../css/navheader.module.css';

const NavHeader = () => {

    const dispatch = useDispatch();
    const navegar = useNavigate();
    const { loadingAuth, authenticatedAuth } = useSelector((state) => state.auth);

    const cerrarSesion = () => {
        dispatch(signOutAction());
    };

    return (
        <Navbar collapseOnSelect expand="lg" variant="dark" className={`${s.navbar}`}>
            <Container fluid>
                <Navbar.Brand className={`${s.navbar_brand}`} href="/">
                    <img alt="" src={icLogo} width="50" height="50" className="d-inline-block align-top" />
                    riOn MusicX
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
                                    <Dropdown.Header>Usuario</Dropdown.Header>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={() => navegar('/PerfilUsuario')}><Image src={icPerfil} width='24px' />{'   '}Mi Perfil Cliente</Dropdown.Item>
                                    <Dropdown.Item onClick={() => navegar('/perfiladmin')}><Image src={icPerfil} width='24px' />{'   '}Mi Perfil Admin</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Header>Administracion</Dropdown.Header>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={() => navegar('/producto_lista')}><Image src={icProductos} width='24px' />{'   '}Administrar Productos</Dropdown.Item>
                                    <Dropdown.Item onClick={() => navegar('/generos')}><Image src={icGeneros} width='24px' />{'   '}Administrar Generos</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={cerrarSesion}><Image src={icSalir} width='24px' />{'   '}Cerrar Sesion</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            //
                    }
                    <Dropdown align="end">
                        <Dropdown.Toggle variant="none" id="dropdown-basic">
                            <Image src={icCarro} />
                            <Badge bg="success position-absolute">
                                0
                            </Badge>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className={`position-absolute ${s.dropdown_menu}`}>
                            <Dropdown.Header>Mi Carro
                            <Button className='float-sm-end' size='sm'>Carro</Button>
                            </Dropdown.Header>
                            <Dropdown.Divider />
                            <div className={`${s.dropdown_contenedor}`}>
                                <Dropdown.ItemText>
                                    <Card>
                                        <Card.Img alt="Card image" src='https://www.univision.com/proxy/api/cached/picture?href=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2Fassets%2Fvixes%2Fm%2Fmusica-amor-coracao-1016-1400x800.jpg&width=0&height=0&ratio_width=1240&ratio_height=698&format=webp' />
                                        <Card.ImgOverlay className={`${s.card_overlay}`}>
                                            <Card.Header className={`${s.card_header}`}>
                                                <Card.Text>Nombre del Producto</Card.Text>
                                            </Card.Header>
                                            <Card.Body className={`${s.card_body}`}></Card.Body>
                                            <Card.Footer className={`${s.card_fooster} text-end`}>
                                                <Card.Text>$ 100.000</Card.Text>
                                            </Card.Footer>
                                        </Card.ImgOverlay>
                                    </Card>
                                </Dropdown.ItemText>
                                <Dropdown.ItemText>
                                    <Card>
                                        <Card.Img alt="Card image" src='https://www.univision.com/proxy/api/cached/picture?href=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2Fassets%2Fvixes%2Fm%2Fmusica-amor-coracao-1016-1400x800.jpg&width=0&height=0&ratio_width=1240&ratio_height=698&format=webp' />
                                        <Card.ImgOverlay className={`${s.card_overlay}`}>
                                            <Card.Header className={`${s.card_header}`}>
                                                <Card.Text>Nombre del Producto</Card.Text>
                                            </Card.Header>
                                            <Card.Body className={`${s.card_body}`}></Card.Body>
                                            <Card.Footer className={`${s.card_fooster} text-end`}>
                                                <Card.Text>$ 100.000</Card.Text>
                                            </Card.Footer>
                                        </Card.ImgOverlay>
                                    </Card>
                                </Dropdown.ItemText>
                                <Dropdown.ItemText>
                                    <Card>
                                        <Card.Img alt="Card image" src='https://www.univision.com/proxy/api/cached/picture?href=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2Fassets%2Fvixes%2Fm%2Fmusica-amor-coracao-1016-1400x800.jpg&width=0&height=0&ratio_width=1240&ratio_height=698&format=webp' />
                                        <Card.ImgOverlay className={`${s.card_overlay}`}>
                                            <Card.Header className={`${s.card_header}`}>
                                                <Card.Text>Nombre del Producto</Card.Text>
                                            </Card.Header>
                                            <Card.Body className={`${s.card_body}`}></Card.Body>
                                            <Card.Footer className={`${s.card_fooster} text-end`}>
                                                <Card.Text>$ 100.000</Card.Text>
                                            </Card.Footer>
                                        </Card.ImgOverlay>
                                    </Card>
                                </Dropdown.ItemText>
                                <Dropdown.ItemText>
                                    <Card>
                                        <Card.Img alt="Card image" src='https://www.univision.com/proxy/api/cached/picture?href=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2Fassets%2Fvixes%2Fm%2Fmusica-amor-coracao-1016-1400x800.jpg&width=0&height=0&ratio_width=1240&ratio_height=698&format=webp' />
                                        <Card.ImgOverlay className={`${s.card_overlay}`}>
                                            <Card.Header className={`${s.card_header}`}>
                                                <Card.Text>Nombre del Producto</Card.Text>
                                            </Card.Header>
                                            <Card.Body className={`${s.card_body}`}></Card.Body>
                                            <Card.Footer className={`${s.card_fooster} text-end`}>
                                                <Card.Text>$ 100.000</Card.Text>
                                            </Card.Footer>
                                        </Card.ImgOverlay>
                                    </Card>
                                </Dropdown.ItemText>
                                <Dropdown.ItemText>
                                    <Card>
                                        <Card.Img alt="Card image" src='https://www.univision.com/proxy/api/cached/picture?href=https%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2Fassets%2Fvixes%2Fm%2Fmusica-amor-coracao-1016-1400x800.jpg&width=0&height=0&ratio_width=1240&ratio_height=698&format=webp' />
                                        <Card.ImgOverlay className={`${s.card_overlay}`}>
                                            <Card.Header className={`${s.card_header}`}>
                                                <Card.Text>Nombre del Producto</Card.Text>
                                            </Card.Header>
                                            <Card.Body className={`${s.card_body}`}></Card.Body>
                                            <Card.Footer className={`${s.card_fooster} text-end`}>
                                                <Card.Text>$ 100.000</Card.Text>
                                            </Card.Footer>
                                        </Card.ImgOverlay>
                                    </Card>
                                </Dropdown.ItemText>
                            </div>

                            <Dropdown.Divider />
                            <Dropdown.ItemText>Total $ 100.000</Dropdown.ItemText>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            </Container>
        </Navbar>
    );
};

export default NavHeader;