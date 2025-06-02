import { DockerService } from '../../services/docker.service';

const mockDockerService = {
  listContainers: jest.fn(),
  startContainer: jest.fn(),
  stopContainer: jest.fn(),
  restartContainer: jest.fn(),
  killContainer: jest.fn(),
};

// Mock the entire DockerService module
jest.mock('../../services/docker.service', () => ({
  DockerService: jest.fn().mockImplementation(() => mockDockerService),
}));

export { mockDockerService };

// Reset all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
  mockDockerService.listContainers.mockReset();
  mockDockerService.startContainer.mockReset();
  mockDockerService.stopContainer.mockReset();
  mockDockerService.restartContainer.mockReset();
  mockDockerService.killContainer.mockReset();
}); 