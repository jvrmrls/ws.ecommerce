import { UNAUTHORIZED, INTERNAL_SERVER_ERROR } from '#src/utils/response';
import admin from 'firebase-admin';

export const authentication = async (req, res, next) => {
  try {
    const token = extractAuthorizationHeader(req);
    if (!token) {
      return res.status(401).json(UNAUTHORIZED('Token is required'));
    }
    const userData = await validateToken(token);
    if (!userData) {
      return res.status(401).json(UNAUTHORIZED('Invalid token'));
    }
    req.uid = userData?.uid;
    return next();
  } catch (error) {
    if (error.code && error.code.includes('auth')) {
      return res.status(401).json(UNAUTHORIZED(error.message));
    }
    return res.status(500).json(INTERNAL_SERVER_ERROR(error.message));
  }
};

export const authenticationOrAnonymously = async (req, res, next) => {
  try {
    const token = extractAuthorizationHeader(req);
    if (!token) {
      return next();
    }
    const { uid } = await validateToken(token);
    if (!uid) {
      return next();
    }
    req.uid = uid;
    return next();
  } catch (error) {
    if (error.code && error.code.includes('auth')) {
      return res.status(401).json(UNAUTHORIZED(error.message));
    }
    return res.status(500).json(INTERNAL_SERVER_ERROR(error.message));
  }
};

const extractAuthorizationHeader = (req) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return null;
  }
  return authorization.split(' ')[1];
};

const validateToken = async (token) => {
  try {
    const { email, uid } = await admin.auth().verifyIdToken(token);
    return { email, uid };
  } catch (error) {
    return null;
  }
};
