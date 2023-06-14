import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Spiner from "../../../Shared/Spiner";
import useAxios from "../../../hooks/useAxios";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
    const { classId } = useParams();
    console.log(classId);

    const [viaAxios] = useAxios();

    const { data: selectedClass = {}, isLoading, refetch } = useQuery({
        queryKey: ['classId', classId],
        queryFn: async () => {
            const res = await viaAxios.get(`/classes/${classId}`);
            return res.data;
        }
    });
    if (isLoading) {
        return <Spiner loading={isLoading}></Spiner>;
    }
    const price = parseFloat(selectedClass.price.toFixed(2));
    return (
        <div>
            <div className="divider mx-4 my-4 md:my-12 text-2xl md:text-3xl font-extrabold">Payment</div>
            <h2 className="text-2xl text-center"> Please use our secure payment method</h2>
            <div className="checkout">
                <Elements stripe={stripePromise}>
                    <CheckoutForm selectedClass={selectedClass} price={price}></CheckoutForm>
                </Elements>
            </div>

        </div>
    );
};

export default Payment;