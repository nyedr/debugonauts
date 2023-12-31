import { Metadata } from "next"
import Link from "next/link"

import { siteConfig } from "@/lib/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Shell } from "@/components/shell"

export const metadata: Metadata = {
  title: "Debugonauts | Issue tracking software",
  description:
    "Debugonauts is a simple issue tracking software that helps you to manage your projects and tasks.",
}

const HomePage = () => {
  return (
    <Shell as="section" className="grid items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Beautifully designed components <br className="hidden sm:inline" />
          built with Radix UI and Tailwind CSS.
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Accessible and customizable components that you can copy and paste
          into your apps. Free. Open Source. And Next.js 13 Ready.
        </p>
      </div>
      <div className="flex gap-4">
        <Link
          href={siteConfig.links.docs}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants()}
        >
          Documentation
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.github}
          className={buttonVariants({ variant: "outline" })}
        >
          GitHub
        </Link>
      </div>
    </Shell>
  )
}

export default HomePage
