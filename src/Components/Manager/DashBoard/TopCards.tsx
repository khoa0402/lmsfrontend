import React from "react";
import { ThemeIcon } from "@mantine/core";
import { IconFileReport, IconPhoto, IconUsers } from "@tabler/icons-react";
import { AreaChart } from "@mantine/charts";

const TopCards = () => {
  const getSum = (data: any[], key: string) => {
    return data.reduce((sum, item) => sum + item[key], 0);
  };
  const card = (
    name: string,
    id: string,
    color: string,
    bg: string,
    icon: React.ReactNode,
    data: any[]
  ) => {
    return (
      <div className={`${bg} rounded-xl`}>
        <div className="flex justify-between p-5 items-center gap-5">
          <ThemeIcon className="!shadow-lg" size="xl" radius="md" color={color}>
            {icon}
          </ThemeIcon>
          <div className="flex flex-col font-medium items-end">
            <div>{name}</div>
            <div className="text-lg">{getSum(data, id)}</div>
          </div>
        </div>
        <AreaChart
          h={300}
          data={data}
          dataKey="date"
          series={[{ name: id, color: color }]}
          strokeWidth={5}
          withGradient
          fillOpacity={0.7}
          curveType="linear"
          tickLine="none"
          gridAxis="none"
          withXAxis={false}
          withYAxis={false}
          withDots={false}
        />
      </div>
    );
  };
  //   const cards = [
  //     {
  //       name: "Leave Requests",
  //       id: "leave-requests",
  //       color: "violet",
  //       bg: "bg-violet-100",
  //       icon: <IconFileReport />,
  //       data: data,
  //     },
  //     {
  //       name: "Employees",
  //       id: "employees",
  //       color: "orange",
  //       bg: "bg-orange-100",
  //       icon: <IconUsers />,
  //       data: patientData,
  //     },
  //   ];

  return (
    <div className="grid grid-cols-3 gap-5">
      {/* {cards.map((cardData) =>
        card(
          cardData.name,
          cardData.id,
          cardData.color,
          cardData.bg,
          cardData.icon,
          cardData.data
        )
      )} */}
    </div>
  );
};

export default TopCards;
