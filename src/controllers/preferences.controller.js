import { Router } from 'express';
import { authentication } from '#src/middlewares/authentication.middleware';
import { find, addOrRemove } from '#src/services/preferences.service';
import { body, param, validationResult } from 'express-validator';

const router = Router();

// GET /preferences
router.get('/', authentication, find);

// POST /preferences/:action
router.post('/:action', authentication, addOrRemove);

export default router;
