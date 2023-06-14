import { FaTrash, FaMoneyBill } from 'react-icons/fa';
import useAxios from '../../../hooks/useAxios';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

const PaymentHistories = () => {

    const [viaAxios] = useAxios();
    const { user, loading } = useAuth();
    
    const { data: payments = [], refetch } = useQuery({
        queryKey: ['payments', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await viaAxios.get(`/students/${user?.email}/payments`);
            return res.data;
        }
    })
    
    return (
        <div>
            <div className="divider mx-4 my-4 md:my-12 text-2xl md:text-3xl font-extrabold">My Payments</div>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="px-6 py-3 bg-gray-100">SL.</th>
                        <th className="px-6 py-3 bg-gray-100">Class Name</th>
                        <th className="px-6 py-3 bg-gray-100">Price</th>
                        <th className="px-6 py-3 bg-gray-100">transactionId</th>
                        <th className="px-6 py-3 bg-gray-100">date</th>
                        <th className="px-6 py-3 bg-gray-100">status</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((classItem,index) => (
                        <tr key={classItem.id}>
                            <td className="px-6 py-4">{index+1}</td>
                            <td className="px-6 py-4">{classItem.className}</td>
                            <td className="px-6 py-4">${classItem.price}</td>
                            <td className="px-6 py-4">${classItem.transactionId}</td>
                            <td className="px-6 py-4">${classItem.date}</td>
                            <td className="px-6 py-4">
                                <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${classItem.status === 'paid'
                                        ? 'bg-green-100 text-green-800'
                                        : classItem.status === 'unpaid'
                                            ? 'bg-red-100 text-red-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                        }`}
                                >
                                    {classItem.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentHistories;