import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Components/Layout.jsx";
import Login from "./Components/Login.jsx";
import Signup from "./Components/Signup.jsx";
import EmployeesListPage from "./Components/EmployeesListPage.jsx";
import Employee from "./Components/Employee.jsx";
import { HomeContextProvider } from "./ContextApi/Context/HomeContext.jsx";
import Department from "./Components/department.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<EmployeesListPage />} />
      <Route path="department" element={<Department />} />
      <Route path="employee/:id" element={<Employee />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HomeContextProvider>
      <RouterProvider router={router} />
    </HomeContextProvider>
  </React.StrictMode>
);
