import React from 'react';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import Aos from 'aos';

const PopularClasses = () => {

    const [viaAxios] = useAxios();
    const { data: popularClasses = [], refetch } = useQuery(['popular-classes'], async () => {
        const res = await viaAxios.get(`top-classes`)
        return res.data;
    });
    useEffect(() => {
        Aos.init({
            duration: 800,
            once: true,
            easing: 'ease-in-out',
        });
    }, []);
    return (
        <div data-aos="fade-up" data-aos-anchor-placement="top-center" className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-14">
            {popularClasses.map((classItem) => (
                <div
                    key={classItem.id}
                    className={`card md:w-96 bg-base-100 shadow-xl image-full ${classItem.availableSeats === 0 ? 'bg-red-100' : 'bg-white'
                        }`}
                >
                    <figure>
                        <img src={classItem.classImage} alt={classItem.className} />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{classItem.className}</h2>
                        <p className="text-white">Instructor: {classItem.instructorName}</p>
                        <p className="text-white">Email: {classItem.instructorEmail}</p>
                        <p className="text-white">Available Seats: {classItem.availableSeats}</p>
                        <p className="text-white">Price: ${classItem.price}</p>
                        <p className="text-white">Number of students Enrolled: {classItem.numberOfStudents}</p>
                       
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PopularClasses;