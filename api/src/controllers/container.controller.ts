import { Controller, Get, Post, Route, Path, Response } from 'tsoa';
import { DockerService } from '../services/docker.service';
import Docker, { ContainerInfo } from 'dockerode';

interface ContainerResponse {
  message: string;
}

@Route("containers")
export class ContainerController extends Controller {
  private dockerService = new DockerService();

  @Get()
  public async listContainers(): Promise<ContainerInfo[]> {
    return this.dockerService.listContainers();
  }

  @Post("{id}/start")
  @Response(404, "Container not found")
  public async startContainer(@Path() id: string): Promise<ContainerResponse> {
    return this.dockerService.startContainer(id);
  }

  @Post("{id}/stop")
  public async stopContainer(@Path() id: string): Promise<ContainerResponse> {
    return this.dockerService.stopContainer(id);
  }

  @Post("{id}/restart")
  public async restartContainer(@Path() id: string): Promise<ContainerResponse> {
    return this.dockerService.restartContainer(id);
  }

  @Post("{id}/kill")
  public async killContainer(@Path() id: string): Promise<ContainerResponse> {
    return this.dockerService.killContainer(id);
  }
}
