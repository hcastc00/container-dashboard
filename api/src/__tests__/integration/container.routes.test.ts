import { mockDockerService } from '../mocks/docker.service.mock';

jest.mock('../../services/docker.service', () => ({
  DockerService: jest.fn().mockImplementation(() => mockDockerService),
}));

import request from 'supertest';
import app from '../../app';


describe('Container Routes Integration Tests', () => {
  

  describe('GET /containers', () => {
    it('should return list of containers', async () => {
      const mockContainers = [{ id: '1', name: 'container1' }];
      mockDockerService.listContainers.mockResolvedValueOnce(mockContainers);

      const response = await request(app).get('/containers');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockContainers);
    });

    it('should handle errors when listing containers', async () => {
      mockDockerService.listContainers.mockRejectedValueOnce(new Error('Docker error'));

      const response = await request(app).get('/containers');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
  });

  describe('POST /containers/:id/start', () => {
    it('should start container successfully', async () => {
      mockDockerService.startContainer.mockResolvedValueOnce({
        message: 'Container started successfully',
      });

      const response = await request(app).post('/containers/test-container/start');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'Container started successfully',
      });
    });

    it('should handle 404 error', async () => {
      const error: any = new Error('Container not found');
      error.statusCode = 404;
      mockDockerService.startContainer.mockRejectedValueOnce(error);

      const response = await request(app).post('/containers/non-existent/start');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        error: 'Container not found',
      });
    });
  });

  describe('POST /containers/:id/stop', () => {
    it('should stop container successfully', async () => {
      mockDockerService.stopContainer.mockResolvedValueOnce({
        message: 'Container stopped successfully',
      });

      const response = await request(app).post('/containers/test-container/stop');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'Container stopped successfully',
      });
    });

    it('should handle 404 error', async () => {
      const error: any = new Error('Container not found');
      error.statusCode = 404;
      mockDockerService.stopContainer.mockRejectedValueOnce(error);

      const response = await request(app).post('/containers/non-existent/stop');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        error: 'Container not found',
      });
    });
  });

  describe('POST /containers/:id/restart', () => {
    it('should restart container successfully', async () => {
      mockDockerService.restartContainer.mockResolvedValueOnce({
        message: 'Container restarted successfully',
      });

      const response = await request(app).post('/containers/test-container/restart');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'Container restarted successfully',
      });
    });

    it('should handle 404 error', async () => {
      const error: any = new Error('Container not found');
      error.statusCode = 404;
      mockDockerService.restartContainer.mockRejectedValueOnce(error);

      const response = await request(app).post('/containers/non-existent/restart');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        error: 'Container not found',
      });
    });
  });

  describe('POST /containers/:id/kill', () => {
    it('should kill container successfully', async () => {
      mockDockerService.killContainer.mockResolvedValueOnce({
        message: 'Container killed successfully',
      });

      const response = await request(app).post('/containers/test-container/kill');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'Container killed successfully',
      });
    });

    it('should handle 404 error', async () => {
      const error: any = new Error('Container not found');
      error.statusCode = 404;
      mockDockerService.killContainer.mockRejectedValueOnce(error);

      const response = await request(app).post('/containers/non-existent/kill');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        error: 'Container not found',
      });
    });
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: 'OK',
      });
    });
  });
}); 