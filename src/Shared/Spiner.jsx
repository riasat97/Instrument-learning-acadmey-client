import React from 'react';
import { ClipLoader } from 'react-spinners';
const Spiner = ({loading}) => {
    return (
        <div className='text-center'>
            <ClipLoader
                color='maroon'
                loading={loading}
                cssOverride={''}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
};

export default Spiner;