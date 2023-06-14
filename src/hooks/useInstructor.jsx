import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

const useInstructor = () => {
    const {user, loading} = useAuth();
    const [viaAxios] = useAxios();
    const {data: isInstructor, isLoading: isInstructorLoading} = useQuery({
        queryKey: ['isInstructor', user?.email,user?.role],
        enabled: !loading,
        queryFn: async () => {
            const res = await viaAxios.get(`/users/has-role/${user?.email}?role=instructor`);
            return res.data.role;
        }
    })
    return [isInstructor, isInstructorLoading]
};

export default useInstructor;