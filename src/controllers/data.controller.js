import { Router } from 'express';
import { getData } from '#src/services/data.service';

const router = Router();

// GET /data
router.get('/', getData);

export default router;
