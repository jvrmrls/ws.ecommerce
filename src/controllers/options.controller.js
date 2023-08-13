import { Router } from 'express';
import { create } from '#src/services/options.service';

const router = Router();

// POST /options
router.post('/', create);

export default router;
