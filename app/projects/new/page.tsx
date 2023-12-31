import { Metadata } from "next"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Shell } from "@/components/shell"
import CreateProjectForm from "@/app/projects/new/create-project-form"

export const metadata: Metadata = {
  metadataBase: new URL(process?.env?.NEXT_PUBLIC_SITE_URL ?? "localhost:3000"),
  title: "Create new project",
  description: "Create a new project to start working on your next big idea!",
}

const NewProjectPage = () => {
  return (
    <Shell className="py-4 w-full">
      <Card className="mx-auto w-[min(460px,90vw)]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">New Project</CardTitle>
          <CardDescription>
            Create a new project to start working on your next big idea!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateProjectForm />
        </CardContent>
      </Card>
    </Shell>
  )
}

export default NewProjectPage
