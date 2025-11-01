import React, { useEffect, useState } from "react";
import { getAllEmployees } from "../../../Service/EmployeeProfileService";
import EmployeeCard from "./EmployeeCard";

const Employee = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  useEffect(() => {
    getAllEmployees()
      .then((data) => {
        console.log(data);
        setEmployees(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div className="text-xl text-primary-500 font-semibold mb-5">
        Employees
      </div>
      <div className="grid grid-cols-3 gap-5">
        {employees.map((employee) => (
          <EmployeeCard key={employee.id} {...employee} />
        ))}
      </div>
    </div>
  );
};

export default Employee;
