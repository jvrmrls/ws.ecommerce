import { Router } from 'express';
import { getData } from '#src/services/data.service';

const router = Router();

// GET /data.http
router.get('/', getData);


export default router;
