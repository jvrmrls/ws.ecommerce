import { Router } from 'express';
import { getData, getDataUser } from '#src/services/data.service';
import {authentication} from '#src/middlewares/authentication.middleware';

const router = Router();

// GET /data
router.get('/', getData);

// GET /data-user
router.get('/user', authentication, getDataUser);


export default router;
