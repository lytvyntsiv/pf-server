const config = {
  nodeEnv: process.env["NODE_ENV"] ?? "development",
  port: process.env["PORT"] ?? 3001,
  mongoUri: process.env["MONGO_URI"] || "mongodb://localhost:27017",
  jwtSecret: process.env["JWT_SECRET"] || "jwtSecret",
  clientOrigins: {
    test: process.env["DEV_ORIGIN"] ?? "*",
    development: process.env["DEV_ORIGIN"] ?? "*",
    production: process.env["PROD_ORIGIN"] ?? "none",
  },
};

export default config;
