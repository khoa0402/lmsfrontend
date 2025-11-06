import React, { useEffect, useState } from "react";
import {
  getAllEmployees,
  getEmployeesByManager,
} from "../../../Service/EmployeeProfileService";
import EmployeeCard from "./EmployeeCard";
import { useSelector } from "react-redux";
import { Switch } from "@mantine/core";

const Employee = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [viewManagedOnly, setViewManagedOnly] = useState(true);
  const user = useSelector((state: any) => state.user);
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        let data;
        if (viewManagedOnly && user?.profileId) {
          data = await getEmployeesByManager(user.profileId);
        } else {
          data = await getAllEmployees();
        }
        setEmployees(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployees();
  }, [viewManagedOnly, user]);

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <div className="text-xl text-primary-500 font-semibold">Employees</div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            Show only managed employees
          </span>
          <Switch
            checked={viewManagedOnly}
            onChange={(event) =>
              setViewManagedOnly(event.currentTarget.checked)
            }
          />
        </div>
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
