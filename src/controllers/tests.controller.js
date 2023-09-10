import { Router } from 'express';
import {
  loginWithEmailAndPassword,
} from '#src/services/tests.services';

const router = Router();

// POST /tests/login
router.post('/login', loginWithEmailAndPassword);

export default router;