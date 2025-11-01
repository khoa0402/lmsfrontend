import { Anchor, Breadcrumbs } from "@mantine/core";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { Text } from "@mantine/core";

const LeaveDetails = () => {
  const { id } = useParams();

  const items = [
    { title: "Mantine", href: "#" },
    { title: "Mantine hooks", href: "#" },
    { title: "use-id", href: "#" },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  return (
    <div>
      <Breadcrumbs>
        <Link className="text-cyan-500 hover:underline" to="/manager/dashboard">
          Dashboard
        </Link>
        <Link to="/doctor/appointments">Appointments</Link>
        <Text>Details</Text>
      </Breadcrumbs>
    </div>
  );
};

export default LeaveDetails;
