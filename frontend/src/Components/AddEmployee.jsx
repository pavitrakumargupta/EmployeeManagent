import { useState } from "react";
import { useHomeContext } from "../ContextApi/Context/HomeContext";
import axios from "axios";

const AddEmployee = ({ setIsAddEmployeeBtnClicked }) => {
    const { employees, setEmployees } = useHomeContext();
    const [newEmployeeDetails, setNewEmployeeDetails] = useState({
        name: "",
        email: "",
    });
    const [error, setError] = useState(false);

    async function handleAddEmployee(e) {
        e.preventDefault();
        if (newEmployeeDetails.name === "" || newEmployeeDetails.email === "") {
            setError('Please fill all the fields')
        }
        else {
            const {data}=await axios.post("http://localhost:5000/Signup",newEmployeeDetails);
            setEmployees([...employees, data])
            setIsAddEmployeeBtnClicked(prev => !prev)
        }
    }

    return (
        <form onSubmit={handleAddEmployee}>
            <div className="bg-white px-4 rounded-md shadow-md w-fit">
                <h3 className="text-lg font-semibold mb-2">
                    <label htmlFor="name">
                        Name:
                        <input
                            type="text"
                            className="border-b-2 rounded-md ml-3"
                            id="name"
                            name="name"
                            value={newEmployeeDetails.name}
                            onChange={(e) =>
                                setNewEmployeeDetails({
                                    ...newEmployeeDetails,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                    </label>
                </h3>
                
               
               
                <p className="text-gray-600">
                    <label className="flex">
                        Email:
                        <input
                            type="text"
                            className="border-b-2 rounded-md ml-3"
                            name="email"
                            value={newEmployeeDetails.email}
                            onChange={(e) =>
                                setNewEmployeeDetails({
                                    ...newEmployeeDetails,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                    </label>
                </p>
                <p className="text-bold text-red-500">{error}</p>
                <button className="inline-flex w-fit items-center justify-center rounded-md bg-primary px-3.5 py-2 font-semibold leading-7 bg-blue-600 text-white hover:bg-blue-800">
                    Save
                </button>
            </div>
        </form>
    );
};

export default AddEmployee;
