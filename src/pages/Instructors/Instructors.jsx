import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsEye } from 'react-icons/bs';
import axios from 'axios';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

const Instructors = () => {
    const [viaAxios] = useAxios();
    const { data: instructors = [], refetch } = useQuery(['all-instructors'], async () => {
        const res = await viaAxios.get(`instructors`)
        return res.data;
    });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-7">
      {instructors.map((instructor) => (
        <div className="card  bg-base-100 shadow-xl" key={instructor._id}>
          <figure>
            <img className="h-40 w-40 rounded-lg" src={instructor.photoURL} alt={instructor.name} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {instructor.name}
            </h2>
            <p>Email: {instructor.email}</p>
            <p>Number of Classes taken: {instructor.numberOfClasses}</p>
            <div className="mb-4">
              <p className="font-bold">Classes Taken:</p>
              <ul className="list-disc pl-6">
                {instructor.classesTaken.map((className) => (
                  <li key={className}>{className}</li>
                ))}
              </ul>
            </div>
            <div className="card-actions justify-end">
              <Link
                to={`/instructors/${instructor._id}/classes`}
                className="btn btn-primary"
                disabled={true}
              >
                <BsEye className="mr-2" /> See Classes
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Instructors;
