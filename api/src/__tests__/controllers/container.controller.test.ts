import { mockDockerService } from '../mocks/docker.service.mock';

// 👇 Esto es clave: mock antes del import del controller
jest.mock('../../services/docker.service', () => ({
  DockerService: jest.fn().mockImplementation(() => mockDockerService),
}));

import { Request, Response } from 'express';
import { ContainerController } from '../../controllers/container.controller';

describe('ContainerController', () => {
  let containerController: ContainerController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject: any;

  beforeEach(() => {
    containerController = new ContainerController();
    responseObject = {};
    mockRequest = {
      params: {
        id: 'test-container',
      },
    };
    mockResponse = {
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
        return mockResponse;
      }),
      status: jest.fn().mockReturnThis(),
    };
  });

  describe('listContainers', () => {
    it('should return list of containers', async () => {
      const mockContainers = [{ id: '1', name: 'container1' }];
      mockDockerService.listContainers.mockResolvedValueOnce(mockContainers);

      await containerController.listContainers(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.json).toHaveBeenCalledWith(mockContainers);
    });

    it('should handle errors when listing containers', async () => {
      mockDockerService.listContainers.mockRejectedValueOnce(new Error('Docker error'));

      await containerController.listContainers(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Internal Server Error',
      });
    });
  });

  describe('startContainer', () => {
    it('should start container successfully', async () => {
      mockDockerService.startContainer.mockResolvedValueOnce({
        message: 'Container started successfully',
      });

      await containerController.startContainer(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Container started successfully',
      });
    });

    it('should handle 404 error', async () => {
      const error: any = new Error('Container not found');
      error.statusCode = 404;
      mockDockerService.startContainer.mockRejectedValueOnce(error);

      await containerController.startContainer(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Container not found',
      });
    });

    it('should handle 409 error', async () => {
      const error: any = new Error('Container already running');
      error.statusCode = 304;
      mockDockerService.startContainer.mockRejectedValueOnce(error);

      await containerController.startContainer(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(409);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Container is already running',
      });
    });
    
    it('should handle unexpected error in startContainer', async () => {
      const error: any = new Error('Unexpected error');
      mockDockerService.startContainer.mockRejectedValueOnce(error);
    
      await containerController.startContainer(
        mockRequest as Request,
        mockResponse as Response
      );
    
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Internal Server Error',
      });
    });
    
  });

  describe('stopContainer', () => {
    it('should stop container successfully', async () => {
      mockDockerService.stopContainer.mockResolvedValueOnce({
        message: 'Container stopped successfully',
      });

      await containerController.stopContainer(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Container stopped successfully',
      });
    });

    it('should handle 404 error', async () => {
      const error: any = new Error('Container not found');
      error.statusCode = 404;
      mockDockerService.stopContainer.mockRejectedValueOnce(error);

      await containerController.stopContainer(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Container not found',
      });
    });

    it('should handle unexpected error in stopContainer', async () => {
      const error: any = new Error('Unexpected error');
      mockDockerService.stopContainer.mockRejectedValueOnce(error);
    
      await containerController.stopContainer(
        mockRequest as Request,
        mockResponse as Response
      );
    
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Internal Server Error',
      });
    });
    
  });

  describe('restartContainer', () => {
    it('should restart container successfully', async () => {
      mockDockerService.restartContainer.mockResolvedValueOnce({
        message: 'Container restarted successfully',
      });

      await containerController.restartContainer(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Container restarted successfully',
      });
    });

    it('should handle 404 error', async () => {
      const error: any = new Error('Container not found');
      error.statusCode = 404;
      mockDockerService.restartContainer.mockRejectedValueOnce(error);

      await containerController.restartContainer(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Container not found',
      });
    });

    it('should handle unexpected error in restartContainer', async () => {
      const error: any = new Error('Unexpected error');
      mockDockerService.restartContainer.mockRejectedValueOnce(error);
    
      await containerController.restartContainer(
        mockRequest as Request,
        mockResponse as Response
      );
    
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Internal Server Error',
      });
    });    
  });

  describe('killContainer', () => {
    it('should kill container successfully', async () => {
      mockDockerService.killContainer.mockResolvedValueOnce({
        message: 'Container killed successfully',
      });

      await containerController.killContainer(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Container killed successfully',
      });
    });

    it('should handle 404 error', async () => {
      const error: any = new Error('Container not found');
      error.statusCode = 404;
      mockDockerService.killContainer.mockRejectedValueOnce(error);

      await containerController.killContainer(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Container not found',
      });
    });

    it('should handle unexpected error in killContainer', async () => {
      const error: any = new Error('Unexpected error');
      mockDockerService.killContainer.mockRejectedValueOnce(error);
    
      await containerController.killContainer(
        mockRequest as Request,
        mockResponse as Response
      );
    
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Internal Server Error',
      });
    });    
  });
}); 