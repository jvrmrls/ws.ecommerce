import { Router } from 'express';
import { find, create, remove } from '#src/services/products.service';
import { authentication } from '#src/middlewares/authentication.middleware';

const router = Router();

// GET /products
router.get('/', authentication, find);

// POST /products
router.post('/', authentication, create);

// DELETE /products/:id
router.delete('/:id', authentication, remove);

export default router;
