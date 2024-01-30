import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Link, Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';
import Loader from '../components/Loader/Loader';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation()
    const [isAdmin, isAdminLoading] = useAdmin()
    if (loading || isAdminLoading) {
        return <Loader></Loader>
    }
    if (user && isAdmin) {
        return children
    }
    return <Navigate to='/' state={{ from: location }} replace></Navigate>
};

export default AdminRoute;