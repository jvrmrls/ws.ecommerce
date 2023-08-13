import { Router } from 'express';
import { authentication } from '#src/middlewares/authentication.middleware';
import {
  find,
  findByCode,
  create,
  clone,
  remove,
  removeAll
} from '#src/services/carts.service';

const router = Router();

// GET /carts
router.get('/', authentication, find);

// GET /carts/code/:code
router.get('/code/:code', authentication, findByCode);

// POST /carts
router.post('/', authentication, create);

// POST /carts/clone/:code
router.post('/clone/:code', authentication, clone);

// DELETE /carts/all
router.delete('/all', authentication, removeAll);

// DELETE /carts/:id
router.delete('/:id', authentication, remove);

export default router;
