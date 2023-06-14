import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';
import { FaGoogle } from 'react-icons/fa';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useTitle from '../../../utilities/useTitle';
import { useForm } from 'react-hook-form';
import SocialMediaLogin from '../../../Shared/SocialMediaLogin';

const Login = () => {
    useTitle()
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    //console.log('login page location', location)
    const from = location.state?.from?.pathname || '/home'

    const handleLogin = data => {

        signIn(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                setSuccess('User login successful.');
                setError('');
                navigate(from, { replace: true })
            })
            .catch(error => {
                setError(error.message);
            })
    }

    return (
        <div>
            <div className="hero min-h-screen bg-base-200 rounded-lg">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Best place to Learn Instrumental</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <form onSubmit={handleSubmit(handleLogin)}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        {...register('email', { required: true })}
                                        placeholder="Email"
                                        className="input input-bordered"
                                        required />
                                    {errors.email && <span className="text-red-600">Email is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label flex justify-start gap-3">
                                        <span className="label-text">Password</span>
                                        <span
                                        className="cursor-pointer text-gray-500 hover:text-gray-700"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ?  <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                                    </span>
                                    </label>
                                    
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        {...register('password', { required: true })}
                                        placeholder="Password"
                                        className="input input-bordered"
                                        required />
                                    {errors.password && <span className="text-red-600">Password is required</span>}
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Login</button>
                                </div>
                                <div className="mt-6 text-secondary-focus">
                                    Don't Have an Account? <Link className="link link-hover text-blue-700" to="/register">Register</Link>
                                </div>
                                {/* Display error and success messages if needed */}
                                <p className="mt-6 text-error">{error}</p>
                                <p className="mt-6 text-success">{success}</p>
                            </form>
                            <div className='flex flex-col md:flex-row gap-2'>
                                <SocialMediaLogin setSuccess={setSuccess} setError={setError}></SocialMediaLogin>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;