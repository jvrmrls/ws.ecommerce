import { Router } from 'express';
import { authentication } from '#src/middlewares/authentication.middleware';
import {
  find,
  create,
  update,
  remove
} from '#src/services/preferences.service';
import { body, param, validationResult } from 'express-validator';

const router = Router();

// GET /preferences
router.get('/', authentication, find);

// POST /preferences
router.post('/', authentication, create);

// PUT /preferences/:id
router.put('/:id', authentication, update);

// DELETE /preferences/:id/:value
router.delete(
  '/:id/:value',
  authentication,
  param('id').isMongoId().withMessage('El id es inválido'),
  param('value').isMongoId().withMessage('El valor es inválido'),
  remove
);

export default router;
