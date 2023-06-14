import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useInstructor from "../hooks/useInstructor";
import useStudent from "../hooks/useStudent";
import Spiner from "../Shared/Spiner";

const StudentRoutes = ({children}) => {
    const { user, loading } = useAuth();
    const [isStudent, isStudentLoading] = useStudent();
    const location = useLocation();

    console.log('isStudent',isStudent);
    
    if(loading || isStudentLoading){
        return <Spiner loading={isStudentLoading}></Spiner>
    }

    if (user && isStudent) {
        return children;
    }
    return <Navigate to="/" state={{from: location}} replace></Navigate>
};

export default StudentRoutes;