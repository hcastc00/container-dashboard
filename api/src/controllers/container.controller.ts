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
  @Response(500, "Internal Server Error")
  public async listContainers(): Promise<ContainerInfo[] | ContainerResponse> {
    try {
      return await this.dockerService.listContainers();
    } catch (error) {
      this.setStatus(500);
      return { message: "Internal Server Error" };
    }
  }

  @Post("{id}/start")
  @Response(404, "Container not found")
  @Response(409, "Container already running")
  @Response(500, "Internal Server Error")
  public async startContainer(@Path() id: string): Promise<ContainerResponse> {
    try {
      return await this.dockerService.startContainer(id);
    } catch (error: any) {
      if (error.statusCode === 404) {
        this.setStatus(404);
        return { message: "Container not found" };
      } else if (error.statusCode === 304) {
        this.setStatus(409);
        return { message: "Container is already running" };
      } else {
        this.setStatus(500);
        return { message: "Internal Server Error" };
      }
    }
  }

  @Post("{id}/stop")
  @Response(404, "Container not found")
  @Response(409, "Container already stopped")
  @Response(500, "Internal Server Error")
  public async stopContainer(@Path() id: string): Promise<ContainerResponse> {
    try {
      return await this.dockerService.stopContainer(id);
    } catch (error: any) {
      if (error.statusCode === 404) {
        this.setStatus(404);
        return { message: "Container not found" };
      } else if (error.statusCode === 304) {
        this.setStatus(409);
        return { message: "Container is already stopped" };
      } else {
        this.setStatus(500);
        return { message: "Internal Server Error" };
      }
    }
  }

  @Post("{id}/restart")
  @Response(404, "Container not found")
  @Response(500, "Internal Server Error")
  public async restartContainer(@Path() id: string): Promise<ContainerResponse> {
    try {
      return await this.dockerService.restartContainer(id);
    } catch (error: any) {
      if (error.statusCode === 404) {
        this.setStatus(404);
        return { message: "Container not found" };
      } else {
        this.setStatus(500);
        return { message: "Internal Server Error" };
      }
    }
  }

  @Post("{id}/kill")
  @Response(404, "Container not found")
  @Response(409, "Container already stopped")
  @Response(500, "Internal Server Error")
  public async killContainer(@Path() id: string): Promise<ContainerResponse> {
    try {
      return await this.dockerService.killContainer(id);
    } catch (error: any) {
      if (error.statusCode === 404) {
        this.setStatus(404);
        return { message: "Container not found" };
      } else if (error.statusCode === 304) {
        this.setStatus(409);
        return { message: "Container is already stopped" };
      } else {
        this.setStatus(500);
        return { message: "Internal Server Error" };
      }
    }
  }

  @Get("/health")
  public async health(): Promise<{ status: string }> {
    return { status: "OK" };
  }
}
