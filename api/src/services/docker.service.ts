import Docker from 'dockerode';

export class DockerService {
  private docker: Docker;

  constructor() {
    this.docker = new Docker();
  }

  async listContainers() {
    return await this.docker.listContainers({ all: true });
  }

  async startContainer(id: string) {
    const container = this.docker.getContainer(id);
    await container.start();
    return { message: 'Container started successfully' };
  }

  async stopContainer(id: string) {
    const container = this.docker.getContainer(id);
    await container.stop();
    return { message: 'Container stopped successfully' };
  }

  async restartContainer(id: string) {
    const container = this.docker.getContainer(id);
    await container.restart();
    return { message: 'Container restarted successfully' };
  }

  async killContainer(id: string) {
    const container = this.docker.getContainer(id);
    await container.kill();
    return { message: 'Container killed successfully' };
  }
} 