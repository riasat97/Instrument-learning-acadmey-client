import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

const useAdmin = () => {
    const {user, loading} = useAuth();
    const [viaAxios] = useAxios();
    // use axios secure with react query
    const {data: isAdmin, isLoading: isAdminLoading} = useQuery({
        queryKey: ['isAdmin', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await viaAxios.get(`/users/has-role/${user?.email}?role=admin`);
            return res.data.role;
        }
    })
    return [isAdmin, isAdminLoading]
}
export default useAdmin;