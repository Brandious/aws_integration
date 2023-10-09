import React from "react";
import { FaServer, FaMemory, FaMicrochip, FaDocker } from "react-icons/fa";
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

export default function TaskCard({ task }: { task: ExtractedTaskData }) {
  return (
    <div className="bg-white p-6 m-4 rounded-lg shadow-md w-96">
      <h2 className="text-xl font-bold mb-4 text-gray-700">
        <FaServer className="inline-block mr-2" /> Task Details
      </h2>

      <div className="mb-4 text-gray-600">
        <span className="font-bold text-gray-600">Availability Zone:</span>{" "}
        {task.availabilityZone}
      </div>

      <div className="mb-4 text-gray-600">
        <span className="font-bold">Connectivity:</span> {task.connectivity}
      </div>

      <div className="mb-4 text-gray-600">
        <span className="font-bold">Connectivity At:</span>{" "}
        {task.connectivityAt}
      </div>

      <div className="mb-4 text-gray-600">
        <span className="font-bold">
          <FaDocker className="inline-block mr-2" /> Launch Type:
        </span>{" "}
        {task.launchType}
      </div>

      <div className="mb-4 text-gray-600">
        <span className="font-bold">
          <FaMicrochip className="inline-block mr-2" /> CPU:
        </span>{" "}
        {task.cpu}
      </div>

      <div className="mb-4 text-gray-600">
        <span className="font-bold">
          <FaMemory className="inline-block mr-2" /> Memory:
        </span>{" "}
        {task.memory}
      </div>

      {task.containers.map((container, index) => (
        <div key={index} className="mb-4 border-t pt-4 text-gray-600">
          <h3 className="font-semibold text-md mb-2">{container.name}</h3>
          <p>
            <span className="font-bold">
              <FaDocker className="inline-block mr-2" /> Image:
            </span>{" "}
            {container.image}
          </p>
          <p>
            <span className="font-bold">Status:</span> {container.lastStatus}
          </p>
          <p>
            <span className="font-bold">
              <FaMicrochip className="inline-block mr-2" /> CPU:
            </span>{" "}
            {container.cpu}
          </p>
          <p>
            <span className="font-bold">
              <FaMemory className="inline-block mr-2" /> Memory:
            </span>{" "}
            {container.memory}
          </p>
        </div>
      ))}
    </div>
  );
}
