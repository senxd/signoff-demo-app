export function GET() {
  return Response.json({
    app: "signoff-demo-app",
    git: {
      sha: process.env.NEXT_PUBLIC_APP_GIT_SHA ?? "unknown",
      ref: process.env.NEXT_PUBLIC_APP_GIT_REF ?? "unknown",
    },
    builtAt: process.env.NEXT_PUBLIC_APP_BUILD_TIME ?? null,
  });
}

