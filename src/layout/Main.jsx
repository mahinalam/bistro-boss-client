import React from 'react';
import Navbar from '../shared/Navbar/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../shared/Footer/Footer';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

const Main = () => {
    const {loading} = useContext(AuthContext)
    const location = useLocation()
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signup')
    return (
        <div>
            {noHeaderFooter || <Navbar></Navbar>}
            <Outlet></Outlet>
            {noHeaderFooter || <Footer></Footer>}

        </div>
    );
};

export default Main;