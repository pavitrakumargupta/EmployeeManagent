import { useParams } from "react-router-dom";
import { useHomeContext } from "../ContextApi/Context/HomeContext";

const Employee = () => {
  const { id } = useParams();
  const { employees } = useHomeContext();

  const filteredEmployee = employees.find((employee) => employee._id === id);
  console.log(filteredEmployee);

  return (
    <div>
          <div
            key={filteredEmployee._id}
            className="bg-white p-4 rounded-md"
          >
            <h3 className="text-lg font-semibold mb-2">{filteredEmployee.name}</h3>
            <p className="text-gray-600">
              <span className="font-bold">Role:</span> {filteredEmployee.role}
            </p>
            <p className="text-gray-600">
              <span className="font-bold">Department:</span> {filteredEmployee.department}
            </p>
            <p className="text-gray-600">{filteredEmployee.email}</p>
          </div>
    </div>
  );
};

export default Employee;
