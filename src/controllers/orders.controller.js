import { Router } from 'express';
import { findById, save } from '#src/services/orders.service';
import {authenticationOrAnonymously} from '#src/middlewares/authentication.middleware';
import { body, param, validationResult } from 'express-validator';

const router = Router();

// GET /orders/:id
router.get('/:_id', param('_id').isMongoId().withMessage("El id es inválido"), findById);

// POST /orders
router.post(
  '/',
  authenticationOrAnonymously,
  body('address').trim().notEmpty().withMessage("La dirección es requerida"),
  body('email').isEmail().withMessage("El correo electrónico es inválido"),
  body('name').trim().notEmpty().withMessage("El nombre es requerido"),
  body('menu')
    .isArray({ min: 1 })
    .withMessage("El pedido debe contener al menos un producto"),
  save);

export default router;