import { object, string, number } from 'yup';
import { validate } from "../shared/validation/validate";

let createItemSchema = object({
  itemNumber: string().required(),
  quantity: number().required(),
  description: string(), // Optional description field
});

export const createItemValidate = (obj) => {
  return validate(createItemSchema, obj);
};