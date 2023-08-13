import { Router } from 'express';

import { find, create, remove } from '#src/services/categories.service';

const router = Router();

// GET /categories
router.get('/', find);

// POST /categories
router.post('/', create);

// DELETE /categories/:id
router.delete('/:id', remove);

export default router;
