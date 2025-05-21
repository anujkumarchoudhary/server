const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation with Swagger",
    },
    servers: [{ url: "http://localhost:5000" }],
  },
  apis: ["./routes/*.js"], // <- ✅ points to auth.js, article.js, news.js
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
