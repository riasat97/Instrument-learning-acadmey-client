import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

const useStudent = () => {
    const {user, loading} = useAuth();
    const [viaAxios] = useAxios();
    // use axios secure with react query
    const {data: isStudent, isLoading: isStudentLoading} = useQuery({
        queryKey: ['isStudent', user?.email,user?.role],
        enabled: !loading,
        queryFn: async () => {
            const res = await viaAxios.get(`/users/has-role/${user?.email}?role=student`);
            return res.data.role;
        }
    })
    return [isStudent, isStudentLoading]
};

export default useStudent;