import Docker from 'dockerode';

interface ContainerResponse {
  message: string;
}

export class DockerService {
  private docker: Docker;

  constructor() {
    this.docker = new Docker();
  }

  async listContainers(): Promise<Docker.ContainerInfo[]> {
    return await this.docker.listContainers({ all: true });
  }

  async startContainer(id: string): Promise<ContainerResponse> {
    const container = this.docker.getContainer(id);
    await container.start();
    return { message: 'Container started successfully' };
  }

  async stopContainer(id: string): Promise<ContainerResponse> {
    const container = this.docker.getContainer(id);
    await container.stop();
    return { message: 'Container stopped successfully' };
  }

  async restartContainer(id: string): Promise<ContainerResponse> {
    const container = this.docker.getContainer(id);
    await container.restart();
    return { message: 'Container restarted successfully' };
  }

  async killContainer(id: string): Promise<ContainerResponse> {
    const container = this.docker.getContainer(id);
    await container.kill();
    return { message: 'Container killed successfully' };
  }
} 