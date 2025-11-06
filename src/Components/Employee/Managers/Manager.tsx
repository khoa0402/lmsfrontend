import React, { useEffect, useState } from "react";
import EmployeeCard from "./ManagerCard";
import { useSelector } from "react-redux";
import { Switch } from "@mantine/core";
import {
  getAllManagers,
  getManagerByEmployee,
} from "../../../Service/ManagerProfileService";
import ManagerCard from "./ManagerCard";

const Manager = () => {
  const [allManagers, setAllManagers] = useState<any[]>([]);
  const [myManager, setMyManager] = useState<any | null>(null);
  const [viewManagedOnly, setViewManagedOnly] = useState(true);
  const user = useSelector((state: any) => state.user);
  useEffect(() => {
    if (viewManagedOnly && user?.profileId) {
      getManagerByEmployee(user.profileId).then(setMyManager);
    } else {
      getAllManagers().then(setAllManagers);
    }
  }, [viewManagedOnly, user]);

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <div className="text-xl text-primary-500 font-semibold">Managers</div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Show only your manager</span>
          <Switch
            checked={viewManagedOnly}
            onChange={(event) =>
              setViewManagedOnly(event.currentTarget.checked)
            }
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {viewManagedOnly && myManager ? (
          <ManagerCard {...myManager} />
        ) : (
          allManagers.map((manager) => (
            <ManagerCard key={manager.id} {...manager} />
          ))
        )}
      </div>
    </div>
  );
};

export default Manager;
