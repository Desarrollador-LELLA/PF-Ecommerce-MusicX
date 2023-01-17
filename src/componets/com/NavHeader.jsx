import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import icLogo from '../images/ic_logo_tester.svg';

const NavHeader = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container fluid>
                <Navbar.Brand href="/">
                    <img alt="" src={icLogo} width="30" height="30" className="d-inline-block align-top" />{' '}
                    OriOn MusicX
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
};

export default NavHeader;