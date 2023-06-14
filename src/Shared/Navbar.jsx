import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import logo from '../assets/logo.png';
import Spiner from './Spiner';
import useAuth from '../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../hooks/useAxios';
import '../pages/Home/Custom.css';
import { FaSun, FaMoon } from 'react-icons/fa';

const Navbar = ({ darkMode, toggleTheme }) => {
    const { user, logOut } = useAuth();
    const [viaAxios] = useAxios();


    const { data: isAdmin = true, isLoading: isAdminLoading } = useQuery({
        queryKey: ['isAdminQ', user?.email],
        // enabled: !loading,
        queryFn: async () => {
            if (!user) return true;
            const res = await viaAxios.get(`/users/check-role/${user?.email}?role=admin`);
            return res.data.role;
        }
    })

    const { data: isInstructor = true, isLoading: isInstructorLoading } = useQuery({
        queryKey: ['isInstructorQ', user?.email],
        //enabled: !loading,
        queryFn: async () => {
            if (!user) return true;
            const res = await viaAxios.get(`/users/check-role/${user?.email}?role=instructor`);
            return res.data.role;
        }
    })

    const { data: isStudent = true, isLoading: isStudentLoading } = useQuery({
        queryKey: ['isStudentQ', user?.email],
        //enabled: !loading,
        queryFn: async () => {
            if (!user) return true;
            const res = await viaAxios.get(`/users/check-role/${user?.email}?role=student`);
            return res.data.role;
        }
    })


    if (isAdminLoading || isInstructorLoading || isStudentLoading) {
        return <span className="loading loading-spinner text-error"></span>
    }

    const navOptions = <>
        <li>  <NavLink to='/home' className={({ isActive }) => isActive ? 'bg-active' : ''}>Home</NavLink> </li>
        <li> <NavLink to='/instructors' className={({ isActive }) => isActive ? 'bg-active' : ''}>Instructors</NavLink></li>
        <li> <NavLink to='/classes' className={({ isActive }) => isActive ? 'bg-active' : ''}>Classes</NavLink></li>
        <li> {!user && <NavLink to='/register' className={({ isActive }) => isActive ? 'bg-active' : ''}>Register</NavLink>}</li>
        {user &&
            <li>
                {(isAdmin && !isAdminLoading) ?
                    <NavLink to='/dashboard/admin/manage/classes' className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink>
                    : (isInstructor && !isInstructorLoading) ?
                        <NavLink to='/dashboard/instructor/classes' className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink>
                        : (isStudent && !isStudentLoading) ?
                            <NavLink to='/dashboard/student/classes' className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink>
                            : ''
                }
            </li>}

    </>

    const handleLogOut = () => {
        logOut()
            .then()
            .catch(error => console.log(error));
    }
    return (
        <div className='max-w-7xl mx-auto'>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>
                    <img src={logo} alt="Logo" className="w-20 h-auto bg-active rounded-full" />
                    <div className="theme-toggle" onClick={toggleTheme}>
                        {darkMode ? <FaSun /> : <FaMoon />}
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className='flex items-center gap-2'>
                        <Link className=' font-extrabold text-xl hidden sm:block' to="/home"></Link>

                        {user ?
                            <div className='dropdown dropdown-end'>
                                <div className="tooltip tooltip-left" data-tip={user.displayName}>
                                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img src={user.photoURL} />
                                        </div>
                                    </label>
                                </div>
                                <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                                    <li>
                                        <a className="justify-between">
                                            Profile
                                            {/* <span className="badge">New</span> */}
                                        </a>
                                    </li>
                                    <li> <Link onClick={handleLogOut}>Logout</Link></li>
                                </ul>
                            </div>
                            :
                            <NavLink to='/login' className={({ isActive }) => isActive ? 'btn btn-info' : 'btn btn-warning'}>Login</NavLink>
                        }
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Navbar;