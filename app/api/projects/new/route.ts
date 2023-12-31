import {
  CreateProjectRequest,
  CreateProjectResponse,
  newProjectSchema,
} from "@/prisma/zod/project"

import prisma from "@/lib/db"

export async function POST(req: Request) {
  const { projectLeadId, ...data } = (await req.json()) as CreateProjectRequest

  try {
    newProjectSchema.parse(data)
  } catch (error) {
    if (error instanceof Error) {
      return new Response(
        JSON.stringify({
          isError: true,
          project: null,
          error: {
            title: "Invalid data",
            description: error.message,
          },
        } as CreateProjectResponse),
        {
          status: 400,
        }
      )
    }
  }

  const foundUser = await prisma.user.findUnique({
    where: {
      id: projectLeadId,
    },
  })

  if (!foundUser) {
    return new Response(
      JSON.stringify({
        isError: true,
        project: null,
        error: {
          title: "User not found",
          description: "User not found",
        },
      } as CreateProjectResponse),
      {
        status: 404,
      }
    )
  }

  const project = await prisma.project.create({
    data: {
      ...data,
      projectLeadId,
    },
  })

  // create project member with role of owner

  await prisma.projectMember.create({
    data: {
      role: "OWNER",
      userId: projectLeadId,
      projectId: project.id,
    },
  })

  return new Response(
    JSON.stringify({
      isError: false,
      project,
      error: null,
    } as CreateProjectResponse),
    {
      status: 201,
    }
  )
}
