"use client"

import { useEffect, useState } from "react"
import { Project } from "@prisma/client"
import { useSession } from "next-auth/react"

import { Shell } from "@/components/shell"
import Loading from "@/app/loading"

const ProjectPage = async ({
  params: { projectKey },
}: {
  params: { projectKey: string }
}) => {
  const { data: session } = useSession()
  const [projectData, setProjectData] = useState<Project | null>(null)

  useEffect(() => {
    const fetchProject = async () => {
      const projectRes = await fetch(`/api/projects/${projectKey}`)
      const project = await projectRes.json()
      if (!project) return

      setProjectData(project)
    }

    fetchProject()
  }, [projectKey])

  if (!projectData) {
    return <Loading />
  }

  return (
    <Shell as="main" className="flex flex-col gap-5 py-4">
      <h1 className="text-2xl font-medium leading-8 tracking-tighter md:text-4xl">
        {projectKey.slice(0, 3)} board
      </h1>
      <pre className="p-4 rounded-md bg-primary-foreground">
        <code>{JSON.stringify({ projectData, session }, null, 2)}</code>
      </pre>
    </Shell>
  )
}

export default ProjectPage
