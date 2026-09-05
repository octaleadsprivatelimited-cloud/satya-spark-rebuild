import process from "node:process";

// Legacy placeholder: this Vite SPA has no server runtime. A .server.ts suffix
// alone does not protect secrets. Do not import this module into client code;
// payment secrets belong in a separately deployed backend.

export function getServerConfig() {
  return {
    nodeEnv: process.env.NODE_ENV,
    // Add server-only values here, e.g.:
    //   databaseUrl: process.env.DATABASE_URL,
    //   stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  };
}
