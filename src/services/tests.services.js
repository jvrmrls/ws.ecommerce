import { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } from '#src/utils/response';
import { COMPANY_ID } from '#src/config/index';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';

export const loginWithEmailAndPassword =async (req, res) => {
  try {
    const { email, password } = req.body;
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // Get token
    const token = await userCredential.user.getIdToken();

    return res.status(201).json(OK({token}));
  } catch (error) {
    return res.status(500).json(INTERNAL_SERVER_ERROR(error.message));
  }
};
