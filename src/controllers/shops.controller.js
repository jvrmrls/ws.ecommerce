import { Router } from 'express';
import { find, create, remove } from '#src/services/shop.service';

const router = Router();

// GET /shops
router.get('/', find);

export default router;
