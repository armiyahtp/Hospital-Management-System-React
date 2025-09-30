import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { AuthUser } from "./protectedRouts/AuthUser";
import { SingleDepartment } from "../pages/SingleDepartment";
import { SingleDoctor } from "../pages/SingleDoctor";
import { Doctor } from "../pages/Doctor";
import { Departments } from "../pages/Departments";
import { About } from "../pages/About";
import { Testmonial } from "../pages/Testmonial";
import { Contact } from "../pages/Contact";




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
      {
        path: "doctors",
        element: <Doctor />
      },
      {
        path: "departments",
        element: <Departments />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "testimonials",
        element: <Testmonial />
      },
      {
        path: "contacts",
        element: <Contact />
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