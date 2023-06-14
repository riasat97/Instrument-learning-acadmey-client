import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='flex flex-col justify-center items-center my-12'>
            <h3 className='text-5xl font-bold mb-10 text-error'>Page Not Found</h3>
            <Link className='link link-hover text-3xl mb-8 text-primary' to='/home'>Go to Home</Link>
            <img src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=500&t=st=1683185089~exp=1683185689~hmac=1f89cbf1f4e776427ba1dd72b7a29050de5ef5e9eaf981b44ee8a6bcbcd3e469" alt="" />
        </div>
    );
};

export default NotFound;