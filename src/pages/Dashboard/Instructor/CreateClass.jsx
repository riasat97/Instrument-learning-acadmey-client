import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import Swal from 'sweetalert2';

const img_token = import.meta.env.VITE_Image_Upload_token;

const CreateClass = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [viaAxios] = useAxios();
    const { user } = useAuth();
    const img_hosting = `https://api.imgbb.com/1/upload?key=${img_token}`
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
                    const { className, price, availableSeats } = data;
                    const newClass = {
                        className, classImage: imgURL, instructorName: user.displayName, instructorEmail: user.email, availableSeats:  parseInt(availableSeats),
                        price: parseFloat(price), status: 'pending'
                    }
                    console.log(newClass)
                    viaAxios.post('/classes', newClass)
                        .then(data => {
                            console.log('after posting new classes item', data.data)
                            if (data.data.insertedId) {
                                reset();
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Class added successfully',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        })
                }
            })

    };

    return (
        <div>
            <div className="divider mx-4 my-4 md:my-12 text-2xl md:text-3xl font-extrabold">Create Class</div>

            <div className="w-full max-w-md mx-auto">
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
                            {...register('classImage', { required: true })}
                        />
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
                        />
                        {errors.price && <span className="text-red-600">price is required</span>}
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Add Class
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default CreateClass;