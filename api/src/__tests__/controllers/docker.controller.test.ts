import request from 'supertest';
import express from 'express';
import { RegisterRoutes } from '../../routes/routes'; // tsoa generates this
import bodyParser from 'body-parser';

var dockerServiceInstanceMock: any; // 👈 Declarar antes del mock

// Mock DockerService
jest.mock('../../services/docker.service', () => {
  dockerServiceInstanceMock = {
    listContainers: jest.fn().mockResolvedValue([{ Id: 'abc123', Names: ['/test'] }]),
    startContainer: jest.fn().mockResolvedValue({ message: 'Container started successfully' }),
    stopContainer: jest.fn().mockResolvedValue({ message: 'Container stopped successfully' }),
    restartContainer: jest.fn().mockResolvedValue({ message: 'Container restarted successfully' }),
    killContainer: jest.fn().mockResolvedValue({ message: 'Container killed successfully' }),
  };

  return {
    DockerService: jest.fn().mockImplementation(() => dockerServiceInstanceMock),
  };
});

// Set up app
const app = express();
app.use(bodyParser.json());
RegisterRoutes(app);

describe('ContainerController', () => {
  it('GET /containers should return list of containers', async () => {
    const res = await request(app).get('/containers');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.arrayContaining([{ Id: expect.any(String), Names: expect.any(Array) }]));
  });

  it('POST /containers/:id/start should return success message', async () => {
    const res = await request(app).post('/containers/abc123/start');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Container started successfully' });
  });

  it('POST /containers/:id/stop should return success message', async () => {
    const res = await request(app).post('/containers/abc123/stop');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Container stopped successfully' });
  });

  it('POST /containers/:id/restart should return success message', async () => {
    const res = await request(app).post('/containers/abc123/restart');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Container restarted successfully' });
  });

  it('POST /containers/:id/kill should return success message', async () => {
    const res = await request(app).post('/containers/abc123/kill');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Container killed successfully' });
  });

  it('GET /containers/health should return OK status', async () => {
    const res = await request(app).get('/containers/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'OK' });
  });
});

describe('ContainerController - error handling', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // listContainers errors
  it('should return 500 when listContainers throws unknown error', async () => {
    dockerServiceInstanceMock.listContainers.mockRejectedValueOnce(new Error('List failure'));
    const res = await request(app).get('/containers');
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ message: 'Internal Server Error' });
  });

  // startContainer errors
  it('should return 404 when starting a non-existent container', async () => {
    dockerServiceInstanceMock.startContainer.mockRejectedValueOnce({ statusCode: 404 });

    const res = await request(app).post('/containers/invalid-id/start');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'Container not found' });
  });

  it('should return 409 when starting an already running container', async () => {
    dockerServiceInstanceMock.startContainer.mockRejectedValueOnce({ statusCode: 304 });

    const res = await request(app).post('/containers/abc123/start');
    expect(res.status).toBe(409);
    expect(res.body).toEqual({ message: 'Container is already running' });
  });

  it('should return 500 when startContainer throws unknown error', async () => {
    dockerServiceInstanceMock.startContainer.mockRejectedValueOnce(new Error('Unknown error'));
    const res = await request(app).post('/containers/abc123/start');
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ message: 'Internal Server Error' });
  });

  // stopContainer errors
  it('should return 404 when stopping a non-existent container', async () => {
    dockerServiceInstanceMock.stopContainer.mockRejectedValueOnce({ statusCode: 404 });

    const res = await request(app).post('/containers/invalid-id/stop');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'Container not found' });
  });

  it('should return 409 when stopping an already stopped container', async () => {
    dockerServiceInstanceMock.stopContainer.mockRejectedValueOnce({ statusCode: 304 });

    const res = await request(app).post('/containers/abc123/stop');
    expect(res.status).toBe(409);
    expect(res.body).toEqual({ message: 'Container is already stopped' });
  });

  it('should return 500 when stopContainer throws unknown error', async () => {
    dockerServiceInstanceMock.stopContainer.mockRejectedValueOnce(new Error('Unexpected failure'));
    const res = await request(app).post('/containers/abc123/stop');
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ message: 'Internal Server Error' });
  });

  // restartContainer errors
  it('should return 404 when restarting non-existent container', async () => {
    dockerServiceInstanceMock.restartContainer.mockRejectedValueOnce({ statusCode: 404 });

    const res = await request(app).post('/containers/invalid-id/restart');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'Container not found' });
  });

  it('should return 500 when restartContainer throws unknown error', async () => {
    dockerServiceInstanceMock.restartContainer.mockRejectedValueOnce(new Error('Unexpected error'));
    const res = await request(app).post('/containers/abc123/restart');
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ message: 'Internal Server Error' });
  });

  // killContainer errors
  it('should return 404 when killing a non-existent container', async () => {
    dockerServiceInstanceMock.killContainer.mockRejectedValueOnce({ statusCode: 404 });

    const res = await request(app).post('/containers/invalid-id/kill');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'Container not found' });
  });

  it('should return 409 when killing an already stopped container', async () => {
    dockerServiceInstanceMock.killContainer.mockRejectedValueOnce({ statusCode: 304 });

    const res = await request(app).post('/containers/abc123/kill');
    expect(res.status).toBe(409);
    expect(res.body).toEqual({ message: 'Container is already stopped' });
  });

  it('should return 500 when killContainer throws unknown error', async () => {
    dockerServiceInstanceMock.killContainer.mockRejectedValueOnce(new Error('Unexpected kill error'));
    const res = await request(app).post('/containers/abc123/kill');
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ message: 'Internal Server Error' });
  });
});
