import { useEffect, useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useTitle from '../../utilities/useTitle';

const Classes = () => {
    useTitle();
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [viaAxios] = useAxios();
    const { data: approvedClasses = [], refetch } = useQuery(['approved-classes'], async () => {
        const res = await viaAxios.get(`classes?status=approved`)
        return res.data;
    });

    const { data: isStudentQ = true, isLoading: isStudentLoading } = useQuery({
        queryKey: ['isStudentQ', user?.email],
        enabled: !loading,
        queryFn: async () => {
            if (!user) return true;
            const res = await viaAxios.get(`/users/check-role/${user?.email}?role=student`);
            return res.data.role;
        }
    })
    const handleSelectedClass = (classItem) => {

        if (user && isStudentQ) {
            const bookedClass = { studentId: user.uid, classId: classItem._id, enrolled: false }
            viaAxios.post('/student-classes', bookedClass)
                .then(data => {
                    console.log('after posting student classes', data.data)
                    if (data.data.insertedId) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Class booked successfully',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                    else if(data.data.exists){
                        Swal.fire({
                            position: 'top-end',
                            title: 'You have already booked this class',
                            icon: 'warning',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
        }
        else {
            Swal.fire({
                title: 'Please login to book the class',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login now!'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            })
        }
    };

    return (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-14">
            {approvedClasses.map((classItem) => (
                <div
                    key={classItem.id}
                    className={`card w-96 bg-base-100 shadow-xl image-full ${classItem.availableSeats === 0 ? 'bg-red-100' : 'bg-white'
                        }`}
                >
                    <figure>
                        <img src={classItem.classImage} alt={classItem.className} />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{classItem.className}</h2>
                        <p className="text-white">Instructor: {classItem.instructorName}</p>
                        <p className="text-white">Instructor: {classItem.instructorEmail}</p>
                        <p className="text-white">Available Seats: {classItem.availableSeats}</p>
                        <p className="text-white">Price: ${classItem.price}</p>
                        <div className="card-actions justify-end">
                            <div className="flex items-center ">
                                {classItem.availableSeats === 0 ? (
                                    <FaTimesCircle className="text-red-500 mr-2" />
                                ) : (
                                    <FaCheckCircle className="text-green-500 mr-2" />
                                )}
                                <button
                                    className={`btn ${classItem.availableSeats === 0 || !isStudentQ 
                                        ? 'btn-disabled text-white'
                                        : 'btn-primary'
                                        } text-white disabled:text-white bg-active`}
                                    disabled={classItem.availableSeats === 0 || !isStudentQ }
                                    onClick={() => handleSelectedClass(classItem)}
                                >
                                    Select
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Classes;
