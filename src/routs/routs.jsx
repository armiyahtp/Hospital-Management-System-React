import {createBrowserRouter} from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";




export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,

    children: [
        {
            path: "/",
            element : <Home />
        }
    ]
  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path : 'register',
    element : <Register />
  }
]);