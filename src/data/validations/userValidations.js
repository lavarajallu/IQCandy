// validations/userValidation.js

import { object, string, number } from 'zod';

const UserValidation = object({
  id: number(),
  name: string(),
  email: string().email(),
});

export default UserValidation;
