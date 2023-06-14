import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";


const SocialMediaLogin = ({setSuccess,setError}) => {
    const { signInWithProvider } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/home";

    const handleGoogleSignIn = () => {

        signInWithProvider('google')
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                setSuccess('User login successful.');
                setError('');
                const saveUser = { name: loggedInUser.displayName, email: loggedInUser.email, photoURL:loggedInUser.photoURL, role: 'student' }
                fetch('https://instrumental-learning-academy-server.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.insertedId) {
                        console.log(from);
                        navigate(from, { replace: true });
                        }
                        navigate(from, { replace: true });
                    })
                   
            })
            .catch(error => {
                setError(error.message);
            })
    }

    return (        
            <button onClick={handleGoogleSignIn} className='btn btn-outline'> <FaGoogle className='mr-2'></FaGoogle> Google Login</button>
    );
};

export default SocialMediaLogin;