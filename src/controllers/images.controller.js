import { Router } from 'express';
import { authentication } from '#src/middlewares/authentication.middleware';
import { find, create } from '#src/services/images.service';
import multer from 'multer';

const router = Router();
const upload = multer({});

// GET /images
router.get('/', authentication, find);

// POST /images
router.post('/', upload.single('image'), create);

export default router;
