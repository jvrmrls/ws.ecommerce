import { Router } from 'express';
import { getImages } from '#src/services/images.service';

const router = Router();

// GET /images
router.get('/', getImages);

export default router;
