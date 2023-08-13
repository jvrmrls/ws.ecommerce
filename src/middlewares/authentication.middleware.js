import { UNAUTHORIZED, INTERNAL_SERVER_ERROR } from '#src/utils/response';
import admin from 'firebase-admin';
const uid = 'u7jFg1ExaVPH3zapa4HmlshCKCj2';

export const authentication = async (req, res, next) => {
  try {
    // const { authorization } = req.headers;
    // if (!authorization) {
    //   return res
    //     .status(401)
    //     .json(UNAUTHORIZED('Authorization header is required'));
    // }
    // const token = authorization.split(' ')[1];
    // if (!token) {
    //   return res.status(401).json(UNAUTHORIZED('Token is required'));
    // }
    // const { email, uid } = await admin.auth().verifyIdToken(token);
    // req.user = { email, uid };
    req.user = { uid };
    return next();
  } catch (error) {
    if (error.code && error.code.includes('auth')) {
      return res.status(401).json(UNAUTHORIZED(error.message));
    }
    return res.status(500).json(INTERNAL_SERVER_ERROR(error.message));
  }
};
