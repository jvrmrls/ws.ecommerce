import { Router } from 'express';
import { authentication } from '#src/middlewares/authentication.middleware';
import {
  find,
  create,
  update,
  remove
} from '#src/services/preferences.service';

const router = Router();

// GET /preferences
router.get('/', authentication, find);

// POST /preferences
router.post('/', authentication, create);

// PUT /preferences/:id
router.put('/:id', authentication, update);

// DELETE /preferences/:id
router.delete('/:id', authentication, remove);

export default router;
