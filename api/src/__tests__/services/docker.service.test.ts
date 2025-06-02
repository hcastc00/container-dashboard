jest.mock('../../services/docker.service', () => ({
  DockerService: jest.fn().mockImplementation(() => mockDockerService),
}));

import { DockerService } from '../../services/docker.service';
import { mockDockerService } from '../mocks/docker.service.mock';

describe('DockerService', () => {
  let dockerService: DockerService;


  jest.mock('../../services/docker.service', () => ({
    DockerService: jest.fn().mockImplementation(() => mockDockerService),
  }));

  beforeEach(() => {
    dockerService = new DockerService();
  });

  describe('listContainers', () => {
    it('should return list of containers', async () => {
      const mockContainers = [{ id: '1', name: 'container1' }];
      mockDockerService.listContainers.mockResolvedValueOnce(mockContainers);

      const result = await dockerService.listContainers();

      expect(result).toEqual(mockContainers);
      expect(mockDockerService.listContainers).toHaveBeenCalled();
    });

    it('should handle errors when listing containers', async () => {
      const error = new Error('Docker error');
      mockDockerService.listContainers.mockRejectedValueOnce(error);

      await expect(dockerService.listContainers()).rejects.toThrow('Docker error');
    });
  });

  describe('startContainer', () => {
    it('should start a container successfully', async () => {
      const containerId = 'test-container';
      mockDockerService.startContainer.mockResolvedValueOnce({
        message: 'Container started successfully',
      });

      const result = await dockerService.startContainer(containerId);

      expect(result).toEqual({ message: 'Container started successfully' });
      expect(mockDockerService.startContainer).toHaveBeenCalledWith(containerId);
    });

    it('should handle errors when starting container', async () => {
      const containerId = 'test-container';
      const error: any = new Error('Container not found');
      error.statusCode = 404;
      mockDockerService.startContainer.mockRejectedValueOnce(error);

      await expect(dockerService.startContainer(containerId)).rejects.toThrow('Container not found');
    });
  });

  describe('stopContainer', () => {
    it('should stop a container successfully', async () => {
      const containerId = 'test-container';
      mockDockerService.stopContainer.mockResolvedValueOnce({
        message: 'Container stopped successfully',
      });

      const result = await dockerService.stopContainer(containerId);

      expect(result).toEqual({ message: 'Container stopped successfully' });
      expect(mockDockerService.stopContainer).toHaveBeenCalledWith(containerId);
    });

    it('should handle errors when stopping container', async () => {
      const containerId = 'test-container';
      const error: any = new Error('Container not found');
      error.statusCode = 404;
      mockDockerService.stopContainer.mockRejectedValueOnce(error);

      await expect(dockerService.stopContainer(containerId)).rejects.toThrow('Container not found');
    });
  });

  describe('restartContainer', () => {
    it('should restart a container successfully', async () => {
      const containerId = 'test-container';
      mockDockerService.restartContainer.mockResolvedValueOnce({
        message: 'Container restarted successfully',
      });

      const result = await dockerService.restartContainer(containerId);

      expect(result).toEqual({ message: 'Container restarted successfully' });
      expect(mockDockerService.restartContainer).toHaveBeenCalledWith(containerId);
    });

    it('should handle errors when restarting container', async () => {
      const containerId = 'test-container';
      const error: any = new Error('Container not found');
      error.statusCode = 404;
      mockDockerService.restartContainer.mockRejectedValueOnce(error);

      await expect(dockerService.restartContainer(containerId)).rejects.toThrow('Container not found');
    });
  });

  describe('killContainer', () => {
    it('should kill a container successfully', async () => {
      const containerId = 'test-container';
      mockDockerService.killContainer.mockResolvedValueOnce({
        message: 'Container killed successfully',
      });

      const result = await dockerService.killContainer(containerId);

      expect(result).toEqual({ message: 'Container killed successfully' });
      expect(mockDockerService.killContainer).toHaveBeenCalledWith(containerId);
    });

    it('should handle errors when killing container', async () => {
      const containerId = 'test-container';
      const error: any = new Error('Container not found');
      error.statusCode = 404;
      mockDockerService.killContainer.mockRejectedValueOnce(error);

      await expect(dockerService.killContainer(containerId)).rejects.toThrow('Container not found');
    });
  });
}); 