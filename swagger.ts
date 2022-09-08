module.exports = {
  openapi: "3.0.1",
  info: {
    title: "Pizzy",
    version: "1.0.0",
    description: "Pizzy is an online pizza delivering application",
  },
  servers: [
    {
      url: "http://localhost:3000/",
      description: "Local server",
    },
    {
      url: "https://api_url_testing",
      description: "Testing server",
    },
    {
      url: "https://api_url_production",
      description: "Production server",
    },
  ],
  security: [
    {
      ApiKeyAuth: [],
    },
  ],
  tags: [
    {
      name: "CRUD operations",
    },
  ],
  paths: {
    "/users": {
      get: {
        summary: "Returns a list of all Pizzy users",
        description: "This is within admin authority",
        responses: {
          "200": {
            description: "all users successfully retrieved",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/models/users/users",
                },
              },
            },
          },
        },
      },
    },
  },
};
