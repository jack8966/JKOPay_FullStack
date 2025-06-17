import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Charity API Documentation',
      version: '1.0.0',
      description: 'API documentation for the Charity Management System',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
      {
        url: 'https://jkopay-fullstack-261573009903.asia-east1.run.app',
        description: 'Production server',
      },
    ],
    components: {
      schemas: {
        Charity: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'The charity ID',
            },
            name: {
              type: 'string',
              description: 'The charity name',
            },
            description: {
              type: 'string',
              description: 'The charity description',
            },
            imageUrl: {
              type: 'string',
              description: 'The charity image URL',
              nullable: true,
            },
            validFlag: {
              type: 'boolean',
              description: 'Whether the charity is active',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'The creation date',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'The last update date',
            },
          },
          required: ['name', 'description'],
        },
        CharityQueryParams: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Filter by charity name',
            },
            orderBy: {
              type: 'string',
              description: 'Field to order by',
              enum: ['id', 'name', 'createdAt', 'updatedAt'],
            },
            order: {
              type: 'string',
              description: 'Order direction',
              enum: ['ASC', 'DESC'],
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Error message',
            },
          },
        },
      },
    },
  },
  apis: ['./src/presentation/routes/*.ts'], // Path to the API routes
};

export const swaggerSpec = swaggerJsdoc(options);
