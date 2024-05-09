import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Pages/Error/Error.page.jsx";
import RegisterPage from "../Pages/Register/Register.page.jsx";
import LoginPage from "../Pages/Login/Login.page.jsx";
import HomePage from "../Pages/Home/Home.page.jsx";
import { Protected } from "../components/Protected/Protected.js";

const Router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Protected>
                <HomePage />
            </Protected>
        ),
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        path: "*",
        element: <ErrorPage />,
    },
]);

export default Router;
