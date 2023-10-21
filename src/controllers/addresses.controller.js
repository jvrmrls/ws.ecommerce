import { Router } from 'express';
import { authentication } from '#src/middlewares/authentication.middleware';
import { find, create, update, remove } from '#src/services/addresses.service';
import { body, param, validationResult } from 'express-validator';

const router = Router();

// GET /addresses
router.get('/', authentication, find);

// POST /addresses
router.post(
  '/',
  authentication,
  body('name').trim().notEmpty().withMessage('El nombre es requerido'),
  body('longitude').trim().notEmpty().withMessage('La longitud es requerida'),
  body('latitude').trim().notEmpty().withMessage('La latitud es requerida'),
  create
);

// PUT /addresses/:id
router.put(
  '/:id',
  authentication,
  param('id').isMongoId().withMessage('El id es inválido'),
  body('name').trim().notEmpty().withMessage('El nombre es requerido'),
  body('longitude').trim().notEmpty().withMessage('La longitud es requerida'),
  body('latitude').trim().notEmpty().withMessage('La latitud es requerida'),
  update
);

// DELETE /addresses/:id
router.delete(
  '/:id',
  authentication,
  param('id').isMongoId().withMessage('El id es inválido'),
  remove
);

export default router;
