import { FaTrash, FaMoneyBill } from 'react-icons/fa';
import useAxios from '../../../hooks/useAxios';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

const SelectedClasses = () => {

    const [enrolled, setEnrolled] = useState(false);
    const [viaAxios] = useAxios();
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const queryParamValue = searchParams.get('enrolled') || false;
        setEnrolled(queryParamValue)
        console.log(queryParamValue);
    }, [location]);

    const { data: selectedClasses = [], refetch } = useQuery({
        queryKey: ['selectedClasses', user?.uid, enrolled],
        enabled: !loading,
        queryFn: async () => {
            const res = await viaAxios.get(`/students/${user?.uid}/classes?enrolled=${enrolled}`);
            return res.data;
        }
    })
    const deleteSelectedClass = async (classId) => {
        const studentId = user.uid;
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await viaAxios.delete(`/students/${studentId}/classes/${classId}`)
                        .then(res => {
                            console.log('deleted res', res.data);
                            if (res.data.deletedCount > 0) {
                                refetch();
                                Swal.fire(
                                    'Deleted!',
                                    'Your file has been deleted.',
                                    'success'
                                )
                            }
                        });
                } catch (error) {
                    console.error('Error deleting selected class:', error);
                }
            }
        })

    };

    // Function to handle payment
    const handlePayment = (classId) => {
        navigate(`/dashboard/classes/${classId}/payment`)
    };

    return (
        <div>
            <div className="divider mx-4 my-4 md:my-12 text-2xl md:text-3xl font-extrabold">{enrolled ? 'My Enrolled Classes' : 'My Selected Classes'}</div>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="px-6 py-3 bg-gray-100">Class Image</th>
                        <th className="px-6 py-3 bg-gray-100">Class Name</th>
                        <th className="px-6 py-3 bg-gray-100">Instructor Name</th>
                        <th className="px-6 py-3 bg-gray-100">Instructor Email</th>
                        <th className="px-6 py-3 bg-gray-100">Available Seats</th>
                        <th className="px-6 py-3 bg-gray-100">Price</th>
                        {!enrolled && <th className="px-6 py-3 bg-gray-100">Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {selectedClasses.map((classItem) => (
                        <tr key={classItem.id}>
                            <td className="px-6 py-4">
                                <img src={classItem.classImage} alt={classItem.className} className="h-10 w-10 rounded-full" />
                            </td>
                            <td className="px-6 py-4">{classItem.className}</td>
                            <td className="px-6 py-4">{classItem.instructorName}</td>
                            <td className="px-6 py-4">{classItem.instructorEmail}</td>
                            <td className="px-6 py-4">{classItem.availableSeats}</td>
                            <td className="px-6 py-4">${classItem.price}</td>

                            {!enrolled && <td className="px-6 py-4">
                                <button
                                    className="text-indigo-600 hover:text-indigo-800"
                                    onClick={() => handlePayment(classItem._id)}
                                >
                                    <FaMoneyBill className="h-5 w-5" />
                                </button>

                                <button
                                    className="text-red-600 hover:text-red-800 ml-3"
                                    onClick={() => deleteSelectedClass(classItem._id)}
                                >
                                    <FaTrash className="h-5 w-5" />
                                </button>

                            </td>}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SelectedClasses;