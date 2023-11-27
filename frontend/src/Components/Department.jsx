import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Department = () => {
  const [isManager, setIsManager] = useState(false);
  const [users, setUsers] = useState([]);
  const [newDepartmentName, setDepartmentName] = useState('');
  const [newInput, setNewInput] = useState(false);
  const [searchEmail, setSearchEmail] = useState('');
  const [allusers,setAllusers]=useState([])
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  let user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    user && setIsManager(user.position === 'manager');
    department();
    getAllUsers()
  }, []);

  const getAllUsers=async()=>{
    try {
        const {data}=await axios.get("https://employee-management-g816.onrender.com/getAllUsers")
        setAllusers(data)
    } catch (error) {
        console.log(error);
    }
  }

  const department = async () => {
    try {
      let array = [];
      let { data } = await axios.post('https://employee-management-g816.onrender.com/getAllDepartment', {
        _id: user._id,
      });
      await Promise.all(
        data.map(async (key) => {
          let department = {
            _id: key._id,
            name: key.name,
            employees: [],
          };
          let { data } = await axios.post('https://employee-management-g816.onrender.com/getAllUsersByDepartment', {
            _id: user._id,
            departmentId: key._id,
          });
          department.employees = data;
          array.push(department);
        })
      );
      await setUsers(array);
    } catch (error) {
      console.log(error);
    }
  };

  const createDepartment = async () => {
    try {
      if (newDepartmentName.trim() !== '') {
        const { data } = await axios.post('https://employee-management-g816.onrender.com/createDepartment', {
          name: newDepartmentName,
          assignedBy: user._id,
        });
        setUsers([...users, { _id: data._id, name: data.name, employees: [] }]);
        setDepartmentName('');
        setNewInput(false);
      } else {
        console.log('Please enter a department name');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addUserToDepartment = async (email, departmentId) => {
    try {
      let user=allusers.find(key=>key.email===email)
      if (user) {
        await axios.post('https://employee-management-g816.onrender.com/updateDetail', { employeeId: user._id, department:departmentId });
        department();
      } else {
        console.log('User not found');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateDepartmentName = async (departmentId, newName) => {
    try {
      await axios.post(`https://employee-management-g816.onrender.com/updateDepartmentName`, {departmentId,departmentName: newName });
      department();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDepartment = async (departmentId) => {
    try {
      await axios.post(`https://employee-management-g816.onrender.com/deleteDepartment`,{departmentId});
      department();
    } catch (error) {
      console.log(error);
    }
  };
  const changeDepartment = async (email, newDepartmentId) => {
    try {
        console.log();
      let user = allusers.find((key) => key.email === email);
      if (user) {
        await axios.post('https://employee-management-g816.onrender.com/updateDetail', {
          employeeId: user._id,
          department: newDepartmentId,
        });
        department();
      } else {
        console.log('User not found');
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Departments</h1>
      {users.map((department, index) => (
        <div key={index}>
          <h2 className="text-xl font-semibold mt-4">{department.name}</h2>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Update Department Name"
              value={department.updatedName || ''}
              onChange={(e) => {
                const updatedUsers = [...users];
                updatedUsers[index].updatedName = e.target.value;
                setUsers(updatedUsers);
              }}
              className="border rounded px-2 py-1 mr-2"
            />
            <button
              onClick={() => updateDepartmentName(department._id, department.updatedName)}
              className="bg-green-500 text-white px-4 py-1 rounded"
            >
              Update Name
            </button>
            <button
              onClick={() => deleteDepartment(department._id)}
              className="bg-red-500 text-white px-4 py-1 rounded ml-2"
            >
              Delete Department
            </button>
          </div>
          {isManager && (
            <div className="mt-4">
              <input
                type="text"
                placeholder="Add user by email"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                className="border rounded px-2 py-1 mr-2"
              />
              <button
                onClick={() => addUserToDepartment(searchEmail, department._id)}
                className="bg-green-500 text-white px-4 py-1 rounded"
              >
                Add User to Department
              </button>
            </div>
          )}
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4">Employee Name</th>
                <th className="py-2 px-4">Change Department</th>
              </tr>
            </thead>
            <tbody>
              {department.employees.map((employee, empIndex) => (
                <tr key={empIndex} className="border-b border-gray-200">
                  <td className="py-2 px-4">{employee.name}</td>
                  <td className="py-2 px-4">
                  <select
                    name={`select-${employee._id}`}
                    id={`select-${employee._id}`}
                    className="border rounded px-2 py-1"
                    onChange={(e) => changeDepartment(employee.email, e.target.value)}
                    >
                    {users.map((department, index) => (
                        <option key={index} value={department._id}>
                        {department.name}
                        </option>
                    ))}
                    </select>

                    <button className="ml-2 bg-blue-500 text-white px-2 py-1 rounded">
                      Change Department
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      {newInput && (
        <div className="mt-4">
          <input
            type="text"
            onChange={(e) => setDepartmentName(e.target.value)}
            placeholder="Enter Department Name"
            className="border rounded px-2 py-1 mr-2"
          />
          <button
            onClick={createDepartment}
            className="bg-green-500 text-white px-4 py-1 rounded"
          >
            Save
          </button>
          <button
            onClick={() => {
              setNewInput(false);
              setDepartmentName('');
            }}
            className="bg-red-500 text-white px-4 py-1 rounded ml-2"
          >
            Cancel
          </button>
        </div>
      )}
      <button
        onClick={() => setNewInput(true)}
        className="bg-blue-500 text-white px-4 py-1 mt-4 rounded"
      >
        + Add Department
      </button>
    </div>
  );
};

export default Department;
