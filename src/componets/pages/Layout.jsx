import React from 'react';
import { Outlet } from 'react-router-dom';
import NavHeader from '../com/NavHeader';

const Layout = () => {
    return (
        <>
            <NavHeader />
            <Outlet />
        </>
    );
};

export default Layout;