import Docker from 'dockerode';

// Mock the Docker constructor first
jest.mock('dockerode', () => {
  return jest.fn().mockImplementation(() => ({
    listContainers: jest.fn(),
    getContainer: jest.fn().mockReturnValue({
      start: jest.fn(),
      stop: jest.fn(),
      restart: jest.fn(),
      kill: jest.fn(),
    }),
  }));
});

// Export the mock implementations for use in tests
export const mockDockerContainer = {
  start: jest.fn(),
  stop: jest.fn(),
  restart: jest.fn(),
  kill: jest.fn(),
};

export const mockDocker = {
  listContainers: jest.fn(),
  getContainer: jest.fn().mockReturnValue(mockDockerContainer),
};

// Reset all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
  
  // Reset container mock implementations
  mockDockerContainer.start.mockReset();
  mockDockerContainer.stop.mockReset();
  mockDockerContainer.restart.mockReset();
  mockDockerContainer.kill.mockReset();
  
  // Reset Docker mock implementations
  mockDocker.listContainers.mockReset();
  mockDocker.getContainer.mockReset().mockReturnValue(mockDockerContainer);

  // Update the mock implementation to use our mock objects
  (Docker as unknown as jest.Mock).mockImplementation(() => mockDocker);
}); 