import express from 'express';
import Docker from 'dockerode';
import cors from 'cors';

const app = express();
const docker = new Docker();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// GET /containers - List all containers
app.get('/containers', async (req, res) => {
  try {
    const containers = await docker.listContainers({ all: true });
    res.json(containers);
  } catch (error) {
    console.error('Error listing containers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /containers/:id/start - Start a container
app.post('/containers/:id/start', async (req, res) => {
  try {
    const container = docker.getContainer(req.params.id);
    await container.start();
    res.json({ message: 'Container started successfully' });
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
});

// POST /containers/:id/stop - Stop a container
app.post('/containers/:id/stop', async (req, res) => {
  try {
    const container = docker.getContainer(req.params.id);
    await container.stop();
    res.json({ message: 'Container stopped successfully' });
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
});

// POST /containers/:id/restart - Restart a container
app.post('/containers/:id/restart', async (req, res) => {
  try {
    const container = docker.getContainer(req.params.id);
    await container.restart();
    res.json({ message: 'Container restarted successfully' });
  } catch (error: any) {
    if (error.statusCode === 404) {
      res.status(404).json({ error: 'Container not found' });
    } else {
      console.error('Error restarting container:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

// POST /containers/:id/kill - Kill a container
app.post('/containers/:id/kill', async (req, res) => {
  try {
    const container = docker.getContainer(req.params.id);
    await container.kill();
    res.json({ message: 'Container killed successfully' });
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
});

// GET /health - Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
