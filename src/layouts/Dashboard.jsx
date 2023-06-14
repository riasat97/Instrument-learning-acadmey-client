import React from 'react';
import { FaSignOutAlt, FaWallet, FaCalendarAlt, FaHome, FaUtensils, FaBook, FaUsers,FaUserTie,FaMusic,FaCreativeCommonsBy,FaEdit,FaCheck, FaCheckDouble } from 'react-icons/fa';
import { Link, NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';
import useInstructor from '../hooks/useInstructor';
import useStudent from '../hooks/useStudent';
import useAuth from '../hooks/useAuth';
const Dashboard = () => {
    const { user, logOut } = useAuth();
    const [isAdmin] = useAdmin();
    const [IsInstructor] = useInstructor();
    const [isStudent] = useStudent();
    const handleLogOut = () => {
        logOut()
            .then()
            .catch(error => console.log(error));
    }
    return (
        <div className="drawer drawer-mobile ">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                <Outlet></Outlet>

            </div>
            <div className="drawer-side bg-black text-white">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-10 w-80">

                    {
                        isAdmin ?
                            <>
                                <li><NavLink to="/dashboard/admin/manage/classes" className={({ isActive }) => isActive ? 'bg-active' : ''}><FaBook></FaBook> Manage Classes</NavLink></li>
                                <li><NavLink to="/dashboard/admin/users" className={({ isActive }) => isActive ? 'bg-active' : ''}><FaUsers></FaUsers> Manage Users</NavLink></li>
                            </> :
                            IsInstructor ?
                                <>
                                    <li><NavLink to="/dashboard/instructor/classes" className={({ isActive }) => isActive ? 'bg-active' : ''}><FaCreativeCommonsBy></FaCreativeCommonsBy> My Classes</NavLink></li>
                                    <li><NavLink to="/dashboard/instructor/create/classes" className={({ isActive }) => isActive ? 'bg-active' : ''}> <FaEdit></FaEdit> Add a Class</NavLink></li>
                                </>
                                :
                                <>
                                    <li><NavLink to="/dashboard/student/classes" className={({ isActive }) => isActive ? 'bg-active' : ''}><FaCheck></FaCheck> My Selected Classes</NavLink></li>
                                    <li><NavLink to="/dashboard/student/enrolled/classes?enrolled=true" className={({ isActive }) => isActive ? 'bg-active' : ''}><FaCheckDouble></FaCheckDouble> My Enrolled Classes</NavLink></li>
                                    <li><NavLink to="/dashboard/student/payments" className={({ isActive }) => isActive ? 'bg-active' : ''}><FaWallet></FaWallet> Payment History</NavLink></li>
                                </>
                    }
                    <div className="divider"></div>
                    <li><NavLink to="/" className={({ isActive }) => isActive ? 'bg-active' : ''}><FaHome></FaHome> Home</NavLink> </li>
                    <li><NavLink to="/classes" className={({ isActive }) => isActive ? 'bg-active' : ''}><FaMusic></FaMusic>Classes</NavLink></li>
                    <li><NavLink to="/instructors" className={({ isActive }) => isActive ? 'bg-active' : ''}><FaUserTie></FaUserTie> Instructors</NavLink></li>
                    <li><Link onClick={handleLogOut} className={({ isActive }) => isActive ? 'bg-active' : ''}><FaSignOutAlt></FaSignOutAlt> Logout</Link></li>
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;