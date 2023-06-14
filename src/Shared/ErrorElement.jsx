import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorElement = () => {
    const error = useRouteError();
    console.log(error)
    return (
        <div className='flex flex-col justify-center items-center m-72 gap-4'>
            <h4 className='font-extrabold text-5xl'>404</h4>
            <p className='font-semibold text-red-700'>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
};

export default ErrorElement;