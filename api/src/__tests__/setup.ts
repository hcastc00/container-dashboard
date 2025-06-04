import dotenv from 'dotenv';

// Load environment variables from .env.test
dotenv.config({ path: '.env.test' });

// Set default test environment variables
process.env.NODE_ENV = 'test';
process.env.PORT = '3001';
process.env.DOCKER_SOCKET_PATH = '/var/run/docker.sock'; 