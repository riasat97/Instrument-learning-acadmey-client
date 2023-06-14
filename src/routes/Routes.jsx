import { Navigate, createBrowserRouter } from "react-router-dom";
import LoginLayout from "../layouts/LoginLayout";
import Login from "../pages/Login/Login/Login";
import Register from "../pages/Login/Register/Register";
import Main from "../layouts/Main";
import NotFound from "../Shared/NotFound";
import PrivateRoute from "./PrivateRoutes";
import ErrorElement from "../Shared/ErrorElement";
import Dashboard from "../layouts/Dashboard";
import AdminRoute from "./AdminRoutes";
import Users from "../pages/Dashboard/Admin/Users";
import InstructorRoutes from "./InstructorRoutes";
import CreateClass from "../pages/Dashboard/Instructor/CreateClass";
import ManageClasses from "../pages/Dashboard/Admin/ManageClasses";
import Classes from "../pages/Classes/Classes";
import StudentRoutes from "./StudentRoutes";
import SelectedClasses from "../pages/Dashboard/Student/SelectedClasses";
import Payment from "../pages/Dashboard/Payment/Payment";
import MyClasses from "../pages/Dashboard/Instructor/MyClasses";
import PaymentHistories from "../pages/Dashboard/Student/PaymentHistories";
import Home from "../pages/Home/Home";
import Instructors from "../pages/Instructors/Instructors";

const router = createBrowserRouter([
    {
        path: '/',
        element: <LoginLayout></LoginLayout>,
        errorElement: <ErrorElement></ErrorElement>,
        children: [
            {
                path: '/',
                element: <Navigate to="/home"></Navigate>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'register',
                element: <Register></Register>
            }
        ]
    },
    {
        path: 'home',
        element: <Main></Main>,
        errorElement: <ErrorElement></ErrorElement>,
        children: [
            {
                path: '',
                element: <Home></Home>,
            }
        ]
    },
    {
        path: 'classes',
        element: <Main></Main>,
        errorElement: <ErrorElement></ErrorElement>,
        children: [
            {
                path: '',
                element: <Classes></Classes>,
            }
        ]
    },
    {
        path: 'instructors',
        element: <Main></Main>,
        errorElement: <ErrorElement></ErrorElement>,
        children: [
            {
                path: '',
                element: <Instructors></Instructors>,
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute> <Dashboard></Dashboard> </PrivateRoute>,
        children: [
            {
                path: 'admin/users',
                element: <AdminRoute> <Users></Users> </AdminRoute>
            },
            {
                path: 'admin/manage/classes',
                element: <AdminRoute> <ManageClasses></ManageClasses> </AdminRoute>
            },
            {
                path: 'instructor/create/classes',
                element: <InstructorRoutes> <CreateClass></CreateClass> </InstructorRoutes>
            },
            {
                path: 'instructor/classes',
                element: <InstructorRoutes> <MyClasses></MyClasses> </InstructorRoutes>
            },
            {
                path: 'student/classes',
                element: <StudentRoutes> <SelectedClasses></SelectedClasses> </StudentRoutes>
            },
            {
                path: 'student/enrolled/classes',
                element: <StudentRoutes> <SelectedClasses></SelectedClasses> </StudentRoutes>
            },
            {
                path: 'student/payments',
                element: <StudentRoutes> <PaymentHistories></PaymentHistories> </StudentRoutes>
            },
            {
                path: 'classes/:classId/payment',
                element: <Payment></Payment>
            }
        ]
    },
    {
        path: "*",
        element: <NotFound></NotFound>
    }
])

export default router;