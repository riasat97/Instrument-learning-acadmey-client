import React, { useState } from 'react';
import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { FaCheckCircle, FaTimesCircle, FaPencilAlt } from 'react-icons/fa';
import { Dialog } from '@headlessui/react';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const ManageClasses = () => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);
    const { register, reset, handleSubmit } = useForm();

    const [viaAxios] = useAxios();
    //get all classes created by instructors
    const { data: classes = [], refetch } = useQuery(['classes'], async () => {
        const res = await viaAxios.get('classes');
        return res.data;
    });
    //console.log(classes);
    const handleSetClasssStatus = (selectedClass, status) => {
        viaAxios.patch(`classes/${selectedClass._id}/statuses/${status}`, {
            method: 'PATCH'
        })
            .then(data => {
                console.log(data)
                if (data.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${selectedClass.className} is ${status}!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    };

    const openFeedbackModal = (selectedClass) => {
        setSelectedClass(selectedClass);
        console.log(selectedClass);
        setOpenModal(true);
    };

    const closeFeedbackModal = () => {
        setSelectedClass(null);
        setOpenModal(false);
    };

    const sendFeedback = async (data) => {
        const feedback = data.feedback;
        const classId = data.classId;
      
        try {
          // Make the PATCH request to update the class with feedback
          const response = await viaAxios.patch(`classes/${classId}/feedback`, { feedback });
      
          if (response.data.modifiedCount) {
            reset();
            refetch();
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `Your feedback have been sent for ${selectedClass.className} class!`,
                showConfirmButton: false,
                timer: 1500
            })
        }
          closeFeedbackModal();
        } catch (error) {
          // Handle the error
          console.error(error);
        }
      };

    return (
        <div className="container mx-auto px-4">
            <div className="divider mx-4 my-4 md:my-12 text-2xl md:text-3xl font-extrabold">Manage Classes</div>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="px-6 py-3 bg-gray-100">Class Image</th>
                        <th className="px-6 py-3 bg-gray-100">Class name</th>
                        <th className="px-6 py-3 bg-gray-100">Instructor name</th>
                        <th className="px-6 py-3 bg-gray-100">Instructor email</th>
                        <th className="px-6 py-3 bg-gray-100">Available seats</th>
                        <th className="px-6 py-3 bg-gray-100">Price</th>
                        <th className="px-6 py-3 bg-gray-100">Status</th>
                        <th className="px-6 py-3 bg-gray-100">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.map((classItem) => (
                        <tr key={classItem.id}>
                            <td className="px-6 py-4">
                                <img src={classItem.classImage} alt={classItem.className} className="h-10 w-10 rounded-full" />
                            </td>
                            <td className="px-6 py-4">{classItem.className}</td>
                            <td className="px-6 py-4">{classItem.instructorName}</td>
                            <td className="px-6 py-4">{classItem.instructorEmail}</td>
                            <td className="px-6 py-4">{classItem.availableSeats}</td>
                            <td className="px-6 py-4">${classItem.price}</td>
                            <td className="px-6 py-4">
                                <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${classItem.status === 'approved'
                                        ? 'bg-green-100 text-green-800'
                                        : classItem.status === 'denied'
                                            ? 'bg-red-100 text-red-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                        }`}
                                >
                                    {classItem.status}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <button
                                    className="text-green-600 hover:text-green-800 mr-2 tooltip-left" data-tip="Approve!!!"
                                    onClick={() => handleSetClasssStatus(classItem, 'approved')}
                                    disabled={classItem.status === 'approved' || classItem.status === 'denied'}
                                >
                                    <FaCheckCircle className="h-5 w-5" />
                                </button>
                                <button
                                    className="text-red-600 hover:text-red-800 mr-2 tooltip-left" data-tip="Deny!!!"
                                    onClick={() => handleSetClasssStatus(classItem, 'denied')}
                                    disabled={classItem.status === 'approved' || classItem.status === 'denied'}
                                >
                                    <FaTimesCircle className="h-5 w-5" />
                                </button>
                                <button
                                    className="text-indigo-600 hover:text-indigo-800 tooltip tooltip-left" data-tip="send feedback if denied"
                                    onClick={() => openFeedbackModal(classItem)}
                                    disabled={classItem.status === 'approved' || classItem.status === 'pending'}
                                >
                                    <FaPencilAlt className="h-5 w-5" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Dialog open={openModal} onClose={closeFeedbackModal} className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen px-4 text-center">
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

                    <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                Send Feedback
                            </Dialog.Title>
                            <form onSubmit={handleSubmit(sendFeedback)}>
                                <div className="mt-2">
                                    <textarea
                                        name="feedback"
                                        {...register("feedback", { required: true })}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        rows="4"
                                        placeholder="Enter feedback"
                                    />
                                </div>
                                <input type="hidden" name="classId" value={selectedClass?._id} {...register("classId")} />
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="submit"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        Send
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={closeFeedbackModal}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default ManageClasses;