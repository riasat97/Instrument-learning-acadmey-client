import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useInstructor from "../hooks/useInstructor";
import Spiner from "../Shared/Spiner";

const InstructorRoutes = ({children}) => {
    const { user, loading } = useAuth();
    const [isInstructor, isInstructorLoading] = useInstructor();
    const location = useLocation();

    console.log('isInstructor',isInstructor);
    
    if(loading || isInstructorLoading){
        return <Spiner loading={isInstructorLoading}></Spiner>
    }

    if (user && isInstructor) {
        return children;
    }
    return <Navigate to="/" state={{from: location}} replace></Navigate>
};

export default InstructorRoutes;