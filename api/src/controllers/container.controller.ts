import { Request, Response } from 'express';
import { DockerService } from '../services/docker.service';

export class ContainerController {
  private dockerService: DockerService;

  constructor() {
    this.dockerService = new DockerService();
  }

  async listContainers(req: Request, res: Response) {
    try {
      const containers = await this.dockerService.listContainers();
      res.json(containers);
    } catch (error) {
      console.error('Error listing containers:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async startContainer(req: Request, res: Response) {
    try {
      const result = await this.dockerService.startContainer(req.params.id);
      res.json(result);
    } catch (error: any) {
      if (error.statusCode === 404) {
        res.status(404).json({ error: 'Container not found' });
      } else if (error.statusCode === 304) {
        res.status(409).json({ error: 'Container is already running' });
      } else {
        console.error('Error starting container:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }

  async stopContainer(req: Request, res: Response) {
    try {
      const result = await this.dockerService.stopContainer(req.params.id);
      res.json(result);
    } catch (error: any) {
      if (error.statusCode === 404) {
        res.status(404).json({ error: 'Container not found' });
      } else if (error.statusCode === 304) {
        res.status(409).json({ error: 'Container is already stopped' });
      } else {
        console.error('Error stopping container:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }

  async restartContainer(req: Request, res: Response) {
    try {
      const result = await this.dockerService.restartContainer(req.params.id);
      res.json(result);
    } catch (error: any) {
      if (error.statusCode === 404) {
        res.status(404).json({ error: 'Container not found' });
      } else {
        console.error('Error restarting container:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }

  async killContainer(req: Request, res: Response) {
    try {
      const result = await this.dockerService.killContainer(req.params.id);
      res.json(result);
    } catch (error: any) {
      if (error.statusCode === 404) {
        res.status(404).json({ error: 'Container not found' });
      } else if (error.statusCode === 304) {
        res.status(409).json({ error: 'Container is already stopped' });
      } else {
        console.error('Error killing container:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }
} 