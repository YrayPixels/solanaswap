import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/homepage";
import ErrorPage from "../pages/errorpages";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
        errorElement: <ErrorPage />,
    },
])