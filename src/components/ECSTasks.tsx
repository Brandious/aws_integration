import * as React from "react";
import TaskCard from "./TaskCard";

export default async function ECSTasks() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

  const data = await fetch(`${BASE_URL}/api/awsservice`, { cache: "no-cache" });
  if (!data.ok) {
    return <div>Failed to load</div>;
  }
  const ecsDetails = await data.json();

  return (
    <div className="flex items-center justify-center min-h-screen  flex-wrap">
      {ecsDetails.map((task: ExtractedTaskData, index: number) => (
        <TaskCard task={task} key={index} />
      ))}
    </div>
  );
}

type ExtractedTaskData = {
  availabilityZone: string;
  connectivity: string;
  connectivityAt: string;
  containers: {
    name: string;
    image: string;
    lastStatus: string;
    cpu: string;
    memory: string;
  }[];
  cpu: string;
  memory: string;
  launchType: string;
};
