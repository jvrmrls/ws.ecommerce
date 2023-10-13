import { Router } from 'express';
import { authentication } from '#src/middlewares/authentication.middleware';
import { find, create, update, remove } from '#src/services/addresses.service';

const router = Router();

// GET /addresses
router.get('/', authentication, find);

// POST /addresses
router.post('/', authentication, create);

// PUT /addresses/:id
router.put('/:id', authentication, update);

// DELETE /addresses/:id
router.delete('/:id', authentication, remove);

export default router;
