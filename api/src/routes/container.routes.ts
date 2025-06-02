import { Router } from 'express';
import { ContainerController } from '../controllers/container.controller';

const router = Router();
const containerController = new ContainerController();

// GET /containers
router.get('/', containerController.listContainers.bind(containerController));

// POST /containers/:id/start
router.post('/:id/start', containerController.startContainer.bind(containerController));

// POST /containers/:id/stop
router.post('/:id/stop', containerController.stopContainer.bind(containerController));

// POST /containers/:id/restart
router.post('/:id/restart', containerController.restartContainer.bind(containerController));

// POST /containers/:id/kill
router.post('/:id/kill', containerController.killContainer.bind(containerController));

export default router; 