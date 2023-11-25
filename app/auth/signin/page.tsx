import { Metadata } from "next"
import Link from "next/link"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import SignInForm from "@/components/forms/signin-form"
import OAuthSignIn from "@/components/oauth-signin"

export const metadata: Metadata = {
  metadataBase: new URL(process?.env?.NEXT_PUBLIC_SITE_URL ?? "localhost:3000"),
  title: "Sign in",
  description: "Sign into your account",
}

const AwaitingEmailVerification = ({
  emailAddress,
  verificationCode,
}: {
  emailAddress: string
  verificationCode: string
}) => (
  <div>
    <h2>Email Verification</h2>
    <p>
      Keep this window open and in a new tab open the link we just sent to{" "}
      <Link
        href="mail.google.com"
        className="font-bold transition-colors text-blue-500 underline-offset-4 hover:underline"
      >
        {emailAddress}
      </Link>{" "}
      <Link
        href=".."
        className="font-bold transition-colors text-primary underline-offset-4 hover:underline"
      >
        &lpar;undo&rpar;
      </Link>{" "}
      with security code: {verificationCode}
    </p>
  </div>
)

export default function SignInPage() {
  return (
    <Card className="mx-auto" style={{ width: "min(460px, 90vw)" }}>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Sign in</CardTitle>
        <CardDescription>Choose your preferred sign in method</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <OAuthSignIn />
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="px-2 bg-background text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <SignInForm />
      </CardContent>
      <CardFooter className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-sm text-muted-foreground">
          <span className="hidden mr-1 sm:inline-block">
            Don&apos;t have an account?
          </span>
          <Link
            aria-label="Sign up"
            href="/auth/signup"
            className="transition-colors text-primary underline-offset-4 hover:underline"
          >
            Sign up
          </Link>
        </div>

        <Link
          aria-label="Recover account"
          href="/auth/signin/recovery"
          className="text-sm transition-colors text-primary underline-offset-4 hover:underline"
        >
          Can&apos;t sign in?
        </Link>
      </CardFooter>
    </Card>
  )
}
