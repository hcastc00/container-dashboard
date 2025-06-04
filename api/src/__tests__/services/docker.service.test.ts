import Docker, { ContainerInfo } from 'dockerode';
import { DockerService } from '../../services/docker.service';

// Mock dockerode
jest.mock('dockerode');

describe('DockerService', () => {
  let dockerService: DockerService;
  let mockDocker: jest.Mocked<Docker>;
  let mockContainer: any;

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();

    // Setup container mock
    mockContainer = {
      start: jest.fn(),
      stop: jest.fn(),
      restart: jest.fn(),
      kill: jest.fn(),
    };

    // Setup docker mock
    mockDocker = {
      listContainers: jest.fn(),
      getContainer: jest.fn().mockReturnValue(mockContainer),
    } as any;

    // Setup Docker constructor mock
    (Docker as unknown as jest.Mock).mockImplementation(() => mockDocker);

    // Create service instance
    dockerService = new DockerService();
  });

  describe('listContainers', () => {
    it('should return list of containers', async () => {
      const mockContainers: ContainerInfo[] = [
        {
          Id: 'abc123',
          Names: ['/test1'],
          Image: 'test-image:latest',
          ImageID: 'sha256:abc123',
          Command: 'test command',
          Created: 1234567890,
          State: 'running',
          Status: 'Up 2 hours',
          Ports: [],
          Labels: {},
          HostConfig: { NetworkMode: 'bridge' },
          NetworkSettings: { Networks: {} },
          Mounts: []
        },
        {
          Id: 'def456',
          Names: ['/test2'],
          Image: 'test-image:latest',
          ImageID: 'sha256:def456',
          Command: 'test command',
          Created: 1234567890,
          State: 'running',
          Status: 'Up 2 hours',
          Ports: [],
          Labels: {},
          HostConfig: { NetworkMode: 'bridge' },
          NetworkSettings: { Networks: {} },
          Mounts: []
        }
      ];
      mockDocker.listContainers.mockResolvedValue(mockContainers);

      const result = await dockerService.listContainers();
      expect(result).toEqual(mockContainers);
      expect(mockDocker.listContainers).toHaveBeenCalledWith({ all: true });
    });

    it('should throw error when listContainers fails', async () => {
      const error = new Error('Docker error');
      mockDocker.listContainers.mockRejectedValue(error);

      await expect(dockerService.listContainers()).rejects.toThrow('Docker error');
    });
  });

  describe('startContainer', () => {
    it('should start container successfully', async () => {
      mockContainer.start.mockResolvedValue(undefined);

      const result = await dockerService.startContainer('abc123');
      expect(result).toEqual({ message: 'Container started successfully' });
      expect(mockDocker.getContainer).toHaveBeenCalledWith('abc123');
      expect(mockContainer.start).toHaveBeenCalled();
    });

    it('should throw 404 error when container not found', async () => {
      const error = new Error('Container not found') as any;
      error.statusCode = 404;
      mockContainer.start.mockRejectedValue(error);

      await expect(dockerService.startContainer('invalid-id')).rejects.toThrow('Container not found');
      expect(mockContainer.start).toHaveBeenCalled();
    });

    it('should throw 304 error when container already running', async () => {
      const error = new Error('Container already running') as any;
      error.statusCode = 304;
      mockContainer.start.mockRejectedValue(error);

      await expect(dockerService.startContainer('abc123')).rejects.toThrow('Container already running');
      expect(mockContainer.start).toHaveBeenCalled();
    });
  });

  describe('stopContainer', () => {
    it('should stop container successfully', async () => {
      mockContainer.stop.mockResolvedValue(undefined);

      const result = await dockerService.stopContainer('abc123');
      expect(result).toEqual({ message: 'Container stopped successfully' });
      expect(mockDocker.getContainer).toHaveBeenCalledWith('abc123');
      expect(mockContainer.stop).toHaveBeenCalled();
    });

    it('should throw 404 error when container not found', async () => {
      const error = new Error('Container not found') as any;
      error.statusCode = 404;
      mockContainer.stop.mockRejectedValue(error);

      await expect(dockerService.stopContainer('invalid-id')).rejects.toThrow('Container not found');
      expect(mockContainer.stop).toHaveBeenCalled();
    });

    it('should throw 304 error when container already stopped', async () => {
      const error = new Error('Container already stopped') as any;
      error.statusCode = 304;
      mockContainer.stop.mockRejectedValue(error);

      await expect(dockerService.stopContainer('abc123')).rejects.toThrow('Container already stopped');
      expect(mockContainer.stop).toHaveBeenCalled();
    });
  });

  describe('restartContainer', () => {
    it('should restart container successfully', async () => {
      mockContainer.restart.mockResolvedValue(undefined);

      const result = await dockerService.restartContainer('abc123');
      expect(result).toEqual({ message: 'Container restarted successfully' });
      expect(mockDocker.getContainer).toHaveBeenCalledWith('abc123');
      expect(mockContainer.restart).toHaveBeenCalled();
    });

    it('should throw 404 error when container not found', async () => {
      const error = new Error('Container not found') as any;
      error.statusCode = 404;
      mockContainer.restart.mockRejectedValue(error);

      await expect(dockerService.restartContainer('invalid-id')).rejects.toThrow('Container not found');
      expect(mockContainer.restart).toHaveBeenCalled();
    });
  });

  describe('killContainer', () => {
    it('should kill container successfully', async () => {
      mockContainer.kill.mockResolvedValue(undefined);

      const result = await dockerService.killContainer('abc123');
      expect(result).toEqual({ message: 'Container killed successfully' });
      expect(mockDocker.getContainer).toHaveBeenCalledWith('abc123');
      expect(mockContainer.kill).toHaveBeenCalled();
    });

    it('should throw 404 error when container not found', async () => {
      const error = new Error('Container not found') as any;
      error.statusCode = 404;
      mockContainer.kill.mockRejectedValue(error);

      await expect(dockerService.killContainer('invalid-id')).rejects.toThrow('Container not found');
      expect(mockContainer.kill).toHaveBeenCalled();
    });

    it('should throw 304 error when container already stopped', async () => {
      const error = new Error('Container already stopped') as any;
      error.statusCode = 304;
      mockContainer.kill.mockRejectedValue(error);

      await expect(dockerService.killContainer('abc123')).rejects.toThrow('Container already stopped');
      expect(mockContainer.kill).toHaveBeenCalled();
    });
  });
});
