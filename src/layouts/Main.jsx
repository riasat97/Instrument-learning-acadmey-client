import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useState } from 'react';

const Main = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleTheme = () => {
      setDarkMode(!darkMode);
    };
    return (
        <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
            <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <Navbar darkMode={darkMode} toggleTheme={toggleTheme}></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;