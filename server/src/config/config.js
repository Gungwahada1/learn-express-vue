module.exports = {
  port: 8000,
  db: {
    database: process.env.DB_NAME || "learnExpressVue",
    user: process.env.DB_USER || "learnExpressVue",
    password: process.env.DB_PASS || "learnExpressVue",
    options: {
      dialect: process.env.DIALECT || "sqlite",
      host: process.env.HOST || "localhost",
      storage: "./learnExpressVue.sqlite",
    },
  },
};
