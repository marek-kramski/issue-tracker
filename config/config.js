module.exports = {
  database: {
    host: process.env.DATABASE_HOST || 'remotemysql.com',
    port: process.env.DATABASE_PORT || 3306,
    username: process.env.DATABASE_USER || 'CkuvNxRQkJ',
    password: process.env.DATABASE_PASSWORD || 'ZvNY3IFswn',
    databaseName: process.env.DATABASE_PASSWORD || 'CkuvNxRQkJ',
    dialect: process.env.DATABASE_PASSWORD || "mysql"
  },
};