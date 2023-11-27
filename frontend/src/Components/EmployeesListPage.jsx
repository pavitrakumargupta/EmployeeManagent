import { Link } from "react-router-dom";
import { useHomeContext } from "../ContextApi/Context/HomeContext";
import { IoAddCircleSharp } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import AddEmployee from "./AddEmployee";
import { MdOutlineModeEdit } from "react-icons/md";

const EmployeesListPage = () => {
  const { employees, authStatus } = useHomeContext();
  const [ismanager, setIsmanager] = useState(false);
  const [isAddEmployeeBtnClicked, setIsAddEmployeeBtnClicked] = useState(false);
  const [editId, setEditId] = useState("");


  useEffect(() => {
    localStorage.getItem("user") &&
      setIsmanager(
        JSON.parse(localStorage.getItem("user")).position === "manager"
      );
  }, []);


  function handleAddNewEmployee() {
    setIsAddEmployeeBtnClicked((prev) => !prev);
  }


  const changeToEdit = (_id) => {
    setEditId(_id);
  };

  return (
    <div className="container mx-auto mt-5">
        <h2 className="text-2xl font-bold mb-4">Employees List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {employees.map((employee) => (
          <div
            key={employee._id}
            className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
           
              {/* <h3 className="text-lg font-semibold mb-2">{employee.name}</h3> */}
              <div className="flex items-center justify-between ">
                <input
                  className={`text-lg font-semibold mb-2 ${(ismanager &&editId === employee._id)?'border-b-2 border-black':''}`}
                  readOnly={ismanager &&editId !== employee._id}
                  type="text"
                  // ref={isManager && editId === employee._id ? nameRef : unusableRef}
                  autoFocus={ismanager &&editId === employee._id}
                  defaultValue={employee.name}
                />
                {ismanager&&<MdOutlineModeEdit
                  className="text-lg border"
                  onClick={() => changeToEdit(employee._id)}
                />}
              </div>
              <div className="flex items-center justify-between">
                <div >
                  <p className="text-gray-600">
                    <span className="font-bold">Department:</span>{" "}
                    {employee.department ? employee.department : "Not Assigned"}
                  </p>
                  <input
                    className="text-gray-600"
                    readOnly={ismanager &&editId !== employee._id}
                    type="text"
                    defaultValue={employee.email}
                  />
                </div>
                <Link to={`employee/${employee._id}`}>
                <button className="bg-blue-400 p-2 rounded-md text-white">View</button>
                </Link>
              </div>
            
          </div>
        ))}

        {isAddEmployeeBtnClicked && (
          <AddEmployee
            setIsAddEmployeeBtnClicked={setIsAddEmployeeBtnClicked}
          />
        )}

        {ismanager  && !isAddEmployeeBtnClicked && (
          <button
            className="flex items-center gap-2 h-fit"
            onClick={handleAddNewEmployee}
          >
            <p className="text-2xl">Add Employee</p>
            <IoAddCircleSharp className="text-4xl" />
          </button>
        )}
      </div>
    </div>
  );
};

export default EmployeesListPage;
