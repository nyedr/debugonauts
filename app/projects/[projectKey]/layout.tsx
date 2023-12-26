// import { cookies } from "next/headers"
"use client"

import { createContext } from "react"
import { queryOptions, useQuery } from "@tanstack/react-query"
import type { Session } from "next-auth"
import { useSession } from "next-auth/react"

import { useToast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { SidebarNav } from "@/components/sidebar-nav"
import { FullProject } from "@/app/api/projects/key/[projectKey]/route"
import Loading from "@/app/loading"

interface ProjectLayoutProps {
  children: React.ReactNode
  params: { projectKey: string }
}

export interface ProjectAndSession {
  projectData: FullProject | null
  session: Session | null
}

export const ProjectContext = createContext<ProjectAndSession>({
  projectData: null,
  session: null,
})

const fetchProjectData = async (projectKey: string) => {
  const projectRes = await fetch(`/api/projects/key/${projectKey}`)
  if (!projectRes.ok) throw new Error("Failed to fetch project")
  const projectData = await projectRes.json()
  return projectData.project
}

export const getProjectDataQueryOptions = (projectKey: string) =>
  queryOptions<FullProject>({
    queryKey: ["project", projectKey],
    queryFn: () => fetchProjectData(projectKey),
    enabled: !!projectKey,
    staleTime: 60000,
  })

export default function ProjectLayout({
  children,
  params: { projectKey },
}: ProjectLayoutProps) {
  const { data: session } = useSession()
  const { toast } = useToast()
  const {
    data: projectData,
    error,
    status,
  } = useQuery<FullProject>(getProjectDataQueryOptions(projectKey))

  if (error) {
    toast({
      title: error.name,
      description: error.message,
    })
  }

  const sidebarNavProjectItems = [
    {
      title: "Board",
      Icon: Icons.board,
      href: `/projects/${projectKey}`,
    },
    {
      title: "Teams",
      Icon: Icons.users,
      href: `/projects/${projectKey}/teams`,
    },
    {
      title: "Issues",
      Icon: Icons.details,
      href: `/projects/${projectKey}/issues`,
    },
    {
      title: "Timeline",
      Icon: Icons.calendar,
      href: `/projects/${projectKey}/timeline`,
    },
    {
      title: "Settings",
      Icon: Icons.settings,
      href: `/projects/${projectKey}/settings`,
    },
  ]

  return (
    <ProjectContext.Provider
      value={{ projectData: projectData ?? null, session }}
    >
      <div className="px-[calc(10vw/2)] pt-4 pb-8 w-full space-y-6 sm:p-10 sm:pb-16">
        <div className="flex flex-col items-start w-full gap-6 lg:gap-16 lg:flex-row">
          <aside className="w-full sm:-mx-4 lg:w-1/5 sm:px-0">
            <SidebarNav items={sidebarNavProjectItems} />
          </aside>
          <div className="flex items-center flex-1 flex-grow w-full">
            {status === "pending" ? <Loading /> : children}
          </div>
        </div>
      </div>
    </ProjectContext.Provider>
  )
}
