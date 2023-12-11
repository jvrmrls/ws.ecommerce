import { Router } from 'express';
import { authentication } from '#src/middlewares/authentication.middleware';
import {
  find,
  findByCode,
  create,
  clone,
  update,
  remove,
  removeAll
} from '#src/services/carts.service';
import { body, param, validationResult } from 'express-validator';

const router = Router();

// GET /carts
router.get('/', authentication, find);

// GET /carts/code/:code
router.get('/code/:code', authentication, findByCode);

// POST /carts
router.post(
  '/',
  body('menu').isArray({ min: 1 }).withMessage('El menú debe ser una lista'),
  authentication,
  create
);

// POST /carts/clone/:code
router.post('/clone/:code', authentication, clone);

// PUT /carts/:id
router.put('/:id', authentication, update);

// DELETE /carts/all
router.delete('/all', authentication, removeAll);

// DELETE /carts/:id
router.delete('/:id', authentication, remove);

export default router;
