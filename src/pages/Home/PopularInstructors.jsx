import React from 'react';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import Aos from 'aos';

const PopularInstructors = () => {
    const [viaAxios] = useAxios();
    const { data: instructors = [], refetch } = useQuery(['popular-instructors'], async () => {
        const res = await viaAxios.get(`instructors`)
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
        <div data-aos="fade-up" data-aos-anchor-placement="top-center" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 my-7">
      {instructors.slice(0,6).map((instructor) => (
        <div className="card w-full md:w-96 bg-base-100 shadow-xl" key={instructor._id}>
          <figure>
            <img className="h-40 w-40 rounded-lg" src={instructor.photoURL} alt={instructor.name} />
          </figure>
          <div className="card-body">
            <h2 className="card-title stat-title">
              {instructor.name}
            </h2>
            <p className="stat-title">Email: {instructor.email}</p>
            <p className="stat-title">Number of Classes taken: {instructor.numberOfClasses}</p>
            <div className="mb-4">
              <p className="font-bold stat-title">Classes Taken:</p>
              <ul className="list-disc pl-6 stat-title">
                {instructor.classesTaken.map((className) => (
                  <li key={className}>{className}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
    );
};

export default PopularInstructors;