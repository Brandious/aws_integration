import { ECS } from "aws-sdk";
import { NextResponse } from "next/server";

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

const maskAccountId = (imageUrl: string): string => {
  //TODO: FIXTHIS
  return imageUrl.replace(
    /(\d{12})\.dkr\.ecr\.eu-central-1\.amazonaws\.com/,
    "XXXXXXXXXXXX.dkr.ecr.eu-central-1.amazonaws.com"
  );
};

const extractTaskData = (data: any): ExtractedTaskData[] => {
  if (!data?.tasks) return [];

  return data.tasks.map((task: any) => ({
    availabilityZone: task.availabilityZone,
    connectivity: task.connectivity,
    connectivityAt: task.connectivityAt,
    containers: task.containers.map((container: any) => ({
      name: container.name,
      image: maskAccountId(container.image),
      lastStatus: container.lastStatus,
      cpu: container.cpu,
      memory: container.memory,
    })),
    cpu: task.cpu,
    memory: task.memory,
    launchType: task.launchType,
  }));
};

export async function GET() {
  const ecs = new ECS({ region: "eu-central-1" });
  const data = await ecs.listTasks({ cluster: "nextjs-cluster" }).promise();

  if (!data.taskArns || data.taskArns.length === 0)
    throw new Error("No tasks for specified cluster");

  const rawTaskDetails = await ecs
    .describeTasks({ cluster: "nextjs-cluster", tasks: data.taskArns })
    .promise();

  const sanitizedData = extractTaskData(rawTaskDetails);

  return NextResponse.json(sanitizedData);
}
