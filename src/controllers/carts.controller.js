import { Router } from 'express';
import { authentication } from '#src/middlewares/authentication.middleware';
import {
  find,
  findByCode,
  save,
  clone,
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
  body('menu').isArray({ min: 0 }).withMessage('El menú debe ser una lista'),
  authentication,
  save
);

// POST /carts/clone/:code
router.post('/clone/:code', authentication, clone);

// DELETE /carts/all
router.delete('/all', authentication, removeAll);

// DELETE /carts/:id
router.delete('/:id', authentication, remove);

export default router;
