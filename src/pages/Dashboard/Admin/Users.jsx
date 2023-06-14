import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt, FaUserShield, FaUserTie, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxios from "../../../hooks/useAxios";


const Users = () => {
    const [viaAxios] = useAxios();
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await viaAxios.get('/users')
        return res.data;
    })

    const handleSetRole = (user, role) => {
        viaAxios.patch(`users/admin/${user._id}?role=${role}`)
            .then(data => {
                console.log(data)
                if (data.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is an ${role} Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    const handleDelete = user => {
        const email = user.email;
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await viaAxios.delete(`/users/${email}`)
                        .then(res => {
                            console.log('deleted res', res.data);
                            if (res.data.deletedCount > 0) {
                                refetch();
                                Swal.fire(
                                    'Deleted!',
                                    'Your file has been deleted.',
                                    'success'
                                )
                            }
                        });
                } catch (error) {
                    console.error('Error deleting selected user:', error);
                }
            }
        })
    }

    return (
        <div className="w-full">
            <div className="divider mx-4 my-4 md:my-12 text-2xl md:text-3xl font-extrabold">Manage Users</div>
            <h3 className="text-3xl font-semibold my-4 text-center">Total Users: {users.length}</h3>
            <div className="overflow-x-auto mx-4">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role === 'admin' ? 'admin' :
                                        <button onClick={() => handleSetRole(user, 'admin')}
                                            className="btn btn-ghost  text-black bg-active mx-1 tooltip tooltip-up" data-tip="Make Admin">
                                            <FaUserShield></FaUserShield>
                                        </button>
                                    }
                                    {user.role === 'instructor' ? 'instructor' :
                                        <button onClick={() => handleSetRole(user, 'instructor')}
                                            className="btn btn-ghost   text-black bg-active mx-1 tooltip tooltip-up" data-tip="Make Instructor">
                                            <FaUserTie></FaUserTie>
                                        </button>
                                    }
                                </td>
                                <td>
                                    <button
                                        className="text-red-600 hover:text-red-800 ml-3"
                                        onClick={() => handleDelete(user)}
                                    >
                                        <FaTrash className="h-5 w-5" />
                                    </button>
                                </td>

                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;