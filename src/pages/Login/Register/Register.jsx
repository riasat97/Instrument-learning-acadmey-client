import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';
import { useState } from 'react';
import useTitle from '../../../utilities/useTitle';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import SocialMediaLogin from '../../../Shared/SocialMediaLogin';

const Register = () => {
    useTitle();
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const { createUser, updateUserData, logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const onSubmit = data => {
        //by default all registered users are students
        data.role = 'student';
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserData(data.name, data.photoURL)
                    .then(() => {
                        //const saveUser = { name: data.name, email: data.email }
                        fetch('https://instrumental-learning-academy-server.vercel.app/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(data)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    reset();
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'User created successfully.',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    logOut();
                                    navigate('/login');
                                }
                            })
                    })
                    .catch(error => {
                        console.log(error.message)
                        setError(error.message);
                    })
            })
            .catch(error => {
                console.log(error.message)
                setError(error.message);
            })
    };

    return (
        <div>
            <div className="hero min-h-screen bg-base-300 py-3 rounded-lg">
                <div className="hero-content flex-col ">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign up now!</h1>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100 rounded-lg">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className='md:grid grid-cols-2 gap-5 '>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text"  {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />
                                    {errors.name && <span className="text-red-600">Name is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Photo URL</span>
                                    </label>
                                    <input type="text"  {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                                    {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email"  {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" required />
                                    {errors.email && <span className="text-red-600">Email is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Gender</span>
                                    </label>
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            {...register("gender")}
                                            value="male"
                                            className="form-radio"
                                        />
                                        <span className="ml-2">Male</span>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            {...register("gender")}
                                            value="female"
                                            className="form-radio"
                                        />
                                        <span className="ml-2">Female</span>
                                    </div>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password"  {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[a-z])/
                                    })} placeholder="password" className="input input-bordered" required />
                                    {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                                    {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                                    {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case and one special character.</p>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Confirm Password</span>
                                    </label>
                                    <input
                                        type="password"
                                        {...register("confirmPassword", {
                                            validate: (value) => value === watch("password"),
                                        })}
                                        placeholder="Confirm Password"
                                        className="input input-bordered"
                                    />
                                    {errors.confirmPassword && <p className="text-red-600">Passwords must match</p>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Phone Number</span>
                                    </label>
                                    <input
                                        type="tel"
                                        {...register("phoneNumber")}
                                        placeholder="Phone Number"
                                        className="input input-bordered"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Address</span>
                                    </label>
                                    <textarea
                                        {...register("address")}
                                        placeholder="Address"
                                        className="input input-bordered"
                                    />
                                </div>
                            </div>

                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Sign Up" />
                            </div>
                            <p><small>Already have an account <Link className='text-blue-500' to="/login">Login</Link></small></p>
                        </form>
                        <div className='flex flex-col md:flex-row gap-2 justify-center items-center'>
                            <SocialMediaLogin setSuccess={setSuccess} setError={setError}></SocialMediaLogin>
                        </div>
                        <p className='mt-6 text-error'>{error}</p>
                        <p className="mt-6 text-success">{success}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;