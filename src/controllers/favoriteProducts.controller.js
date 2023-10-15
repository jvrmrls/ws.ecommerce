import { Router } from 'express';
import { authentication } from '#src/middlewares/authentication.middleware';
import { find, create, remove } from '#src/services/favoriteProducts.service';

const router = Router();

// GET /favorite-products
router.get('/', authentication, find);

// POST /favorite-products
router.post('/', authentication, create);

// DELETE /favorite-products/:id
router.delete('/:id', authentication, remove);

export default router;
