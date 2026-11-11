import { object, string } from 'yup';
import { validate } from "../shared/validation/validate"



let createUserSchema = object({
  firstName: string().required(),
  lastName: string().required(),
  email: string().email().required(),
  //password: string(),
  role: string().required(),
});


export const createUserValidate = (obj) => {
  return validate(createUserSchema, obj);
}
