// Runs once at server startup - persists across HMR
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
      const { server } = await import("@/mocks/node");
      server.listen({ onUnhandledRequest: "error" });
    }
  }
}