import { createContext, useContext, useEffect, useState } from "react";
// import reducer from "../Reducer/HomeReducer";

import axios from "axios"

const HomeContext = createContext();

// const initialState = {
// };

const HomeContextProvider = ({ children }) => {
  //   const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(()=>{
    getAllEmployee()
  },[])

  const getAllEmployee=async()=>{
    const {data}=await axios.get("https://employee-management-g816.onrender.com/getAllUsers")
    setEmployees(data)
  }

  const [authStatus, setAuthStatus] = useState(false);
  const [employees, setEmployees] = useState([
    {
      _id: 1,
      name: "Rohan",
      email: "rohan@gmail.com",
      department: "IT",
      role: "App Developer",
      position: 'Employee'
    },
    {
      _id: 2,
      name: "John",
      email: "john@gmail.com",
      department: "IT",
      role: "Web Developer",
      position: 'Employee'
    },
    {
      _id: 3,
      name: "Rahul",
      email: "rahul@gmail.com",
      department: "Design",
      role: "Designer",
      position: 'Employee'
    },
    {
      _id: 4,
      name: "Sameer",
      email: "sameer@gmail.com",
      department: "Sales",
      role: "Salesman",
      position: 'manager'
    },
  ]);

  return (
    <HomeContext.Provider value={{ employees, setEmployees, authStatus, setAuthStatus }}>
      {children}
    </HomeContext.Provider>
  );
};

const useHomeContext = () => {
  return useContext(HomeContext);
};

export { HomeContext, HomeContextProvider, useHomeContext };
