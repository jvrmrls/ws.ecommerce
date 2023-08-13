import { Router } from 'express';
import { authentication } from '#src/middlewares/authentication.middleware';
import { find, create } from '#src/services/carousels.service';

const router = Router();

// GET /carousels
router.get('/', authentication, find);

// POST /carousels
router.post('/', authentication, create);

export default router;
