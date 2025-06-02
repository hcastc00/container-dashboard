# Container Dashboard API Documentation

## Technologies Used

### Backend Stack
- **Node.js**: Runtime environment
- **Express**: Web framework
- **TypeScript**: Programming language
- **TSOA**: TypeScript OpenAPI - For API documentation and type safety
- **Dockerode**: Node.js Docker API client
- **Jest**: Testing framework

## API Overview

### Base URL
```
http://localhost:3000
```

### Available Endpoints

#### Container Management
- `GET /containers` - List all containers
- `POST /containers/{id}/start` - Start a container
- `POST /containers/{id}/stop` - Stop a container
- `POST /containers/{id}/restart` - Restart a container
- `POST /containers/{id}/kill` - Force stop a container

#### Health Check
- `GET /health` - API health status

> **Note**: For detailed API documentation including request/response schemas, examples, and testing interface, visit the Swagger UI at `http://localhost:3000/api-docs`

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Docker
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd container-dashboard
```

2. Install dependencies:
```bash
cd api
npm install
```

3. Configure TSOA:
The project uses TSOA for API documentation and type safety. The configuration is in `tsoa.json`:
```json
{
  "entryFile": "src/server.ts",
  "noImplicitAdditionalProperties": "throw-on-extras",
  "controllerPathGlobs": ["src/controllers/*.ts"],
  "spec": {
    "outputDirectory": "dist",
    "specVersion": 3,
    "basePath": "/",
    "securityDefinitions": {},
    "specFileBaseName": "swagger"
  },
  "routes": {
    "routesDir": "src/routes"
  }
}
```

4. Generate API documentation and routes:
```bash
npm run tsoa:spec
npm run tsoa:routes
```

5. Start the development server:
```bash
npm run dev
```

### Docker Compose Setup
```bash
docker-compose up
```

## Development

### Project Structure
```
api/
├── src/
│   ├── controllers/     # API controllers
│   ├── services/       # Business logic
│   ├── routes/         # Generated routes
│   ├── middlewares/    # Express middlewares
│   └── server.ts       # Application entry point
├── dist/               # Compiled files
├── tsoa.json          # TSOA configuration
└── package.json
```

### Adding New Endpoints
1. Create a new controller in `src/controllers/`
2. Define your routes using TSOA decorators
3. Run TSOA generation commands
4. The new endpoints will be automatically documented in Swagger

### Testing
```bash
npm test
```

## Error Handling
The API uses a centralized error handling middleware that returns errors in the following format:
```json
{
  "error": {
    "message": "Error message",
    "status": 400
  }
}
```

## License
ISC
