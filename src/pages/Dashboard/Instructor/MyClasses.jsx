import React from 'react';
import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { FaCheckCircle, FaTimesCircle, FaPencilAlt } from 'react-icons/fa';
import { Dialog } from '@headlessui/react';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import Spiner from '../../../Shared/Spiner';
import { useState } from 'react';
const img_token = import.meta.env.VITE_Image_Upload_token;

const MyClasses = () => {
    const img_hosting = `https://api.imgbb.com/1/upload?key=${img_token}`
    const [openModal, setOpenModal] = useState(false);
    const [selectedClass, setSelectedClass] = useState({});

    const { user, loading } = useAuth();
    const { register, reset, handleSubmit, formState: { errors } } = useForm({ selectedClass });

    const [viaAxios] = useAxios();
    const { data: instructorClasses = [], isLoading, refetch } = useQuery({
        queryKey: ['instructorClasses', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await viaAxios.get(`/instructors/${user?.email}/classes`);
            return res.data;
        }
    });

    const openClassModal = async (classItem) => {

        const classId = classItem._id;
        const res = await viaAxios.get(`/classes/${classId}`);
        if (Object.keys(res.data).length) {
            setSelectedClass(res.data);
            setOpenModal(true);
        }

    };

    const closeClassModal = () => {
        setSelectedClass(null);
        setOpenModal(false);
    };

    const postUpdate = async (data) => {
        const feedback = data.feedback;
        const classId = data.classId;

        try {
            // Make the PATCH request to update the class with feedback
            const response = await viaAxios.patch(`classes/${classId}`, { feedback });

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
            closeClassModal();
        } catch (error) {
            // Handle the error
            console.error(error);
        }
    };
    const onSubmit = (data) => {
        // Add your logic here to submit the form data to the database
        console.log(data);

        const formData = new FormData();
        formData.append('image', data.classImage[0])
        //console.log(formData);

        fetch(img_hosting, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                console.log(imgResponse);
                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;
                    const { classId, className, price, availableSeats } = data;
                    const newClass = {
                        className, classImage: imgURL, availableSeats: parseInt(availableSeats),
                        price: parseFloat(price), status: 'pending'
                    }
                    console.log(newClass)
                    viaAxios.patch(`/classes/${classId}`, newClass)
                        .then(data => {
                            console.log('after updating new classes item', data.data)
                            if (data.data.modifiedCount) {
                                reset();
                                refetch();
                                closeClassModal();
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Class updated successfully',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        })
                }
            })

    };
    return (
        <div className="container mx-auto px-4">
             <div className="divider mx-4 my-4 md:my-12 text-2xl md:text-3xl font-extrabold">My Classes</div>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="px-6 py-3 bg-gray-100">Class Image</th>
                        <th className="px-6 py-3 bg-gray-100">Class name</th>
                        <th className="px-6 py-3 bg-gray-100">Instructor name</th>
                        
                        <th className="px-6 py-3 bg-gray-100">Available seats</th>
                        <th className="px-6 py-3 bg-gray-100">Price</th>
                        <th className="px-6 py-3 bg-gray-100">Status</th>
                        <th className="px-6 py-3 bg-gray-100">Total Enrolled</th>
                        <th className="px-6 py-3 bg-gray-100">Feedback </th>
                        <th className="px-6 py-3 bg-gray-100">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {instructorClasses.map((classItem) => (
                        <tr key={classItem.id}>
                            <td className="px-6 py-4">
                                <img src={classItem.classImage} alt={classItem.className} className="h-10 w-10 rounded-full" />
                            </td>
                            <td className="px-6 py-4">{classItem.className}</td>
                            <td className="px-6 py-4">{classItem.instructorName}</td>
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
                            <td className="px-6 py-4">{classItem.totalEnrollment}</td>
                            <td className="px-6 py-4">{classItem?.feedback}</td>
                            <td className="px-6 py-4">
                                <button
                                    className="text-indigo-600 hover:text-indigo-800 tooltip tooltip-up" data-tip="Update Class"
                                    onClick={() => { openClassModal(classItem) }}
                                >
                                    <FaPencilAlt className="h-5 w-5" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {(openModal && Object.keys(selectedClass).length > 0) &&
                <Dialog open={openModal} onClose={closeClassModal} className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4 text-center">
                        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                        <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                    Update Class
                                </Dialog.Title>
                                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="className">
                                            Class name
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="text"
                                            name="className"
                                            id="className"
                                            placeholder="Enter class name"
                                            {...register('className', { required: true })}
                                            defaultValue={selectedClass.className}
                                        />
                                        {errors.className && <span className="text-red-600">className is required</span>}
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="classImage">
                                            Class Image
                                        </label>
                                        <input
                                            className="file-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="file"
                                            name="classImage"
                                            id="classImage"
                                            placeholder="Enter class image URL"
                                            {...register('classImage', { required: false })}

                                        />
                                        <img src={selectedClass.classImage} alt={selectedClass.className} className="h-16 w-16 rounded-lg my-1" />
                                        {errors.classImage && <span className="text-red-600">classImage is required</span>}
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="instructorName">
                                            Instructor name
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="text"
                                            name="instructorName"
                                            id="instructorName"
                                            readOnly
                                            value={user.displayName}
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="instructorEmail">
                                            Instructor email
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="email"
                                            name="instructorEmail"
                                            id="instructorEmail"
                                            readOnly
                                            value={user.email}
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="availableSeats">
                                            Available seats
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="number"
                                            name="availableSeats"
                                            id="availableSeats"
                                            placeholder="Enter available seats"
                                            {...register('availableSeats', { required: true })}
                                            defaultValue={selectedClass.availableSeats}
                                        />
                                        {errors.availableSeats && <span className="text-red-600">availableSeats is required</span>}
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                                            Price
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="number"
                                            name="price"
                                            id="price"
                                            placeholder="Enter price"
                                            {...register('price', { required: true })}
                                            defaultValue={selectedClass.price}
                                        />
                                        {errors.price && <span className="text-red-600">price is required</span>}
                                    </div>
                                    <input type="hidden" name="classId" value={selectedClass?._id} {...register("classId")} />
                                    <div className="flex items-center justify-between">
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            type="submit"
                                        >
                                            Update Class
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Dialog>}

        </div>
    );
};

export default MyClasses;