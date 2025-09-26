import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { AuthUser } from "./protectedRouts/AuthUser";
import { SingleDepartment } from "../pages/SingleDepartment";
import { SingleDoctor } from "../pages/SingleDoctor";




export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,

    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "user",
        element: <AuthUser />,

        children: [
          {
            path: "department/:id",
            element: <SingleDepartment />
          },
          {
            path: "doctors/:id",
            element: <SingleDoctor />
          }
        ]
      },
    ]
  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'register',
    element: <Register />
  }
]);