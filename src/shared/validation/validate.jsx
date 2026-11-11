

export const validate = async (schema, obj) => {
  try {
    const value = await schema.validate(obj);
    return [value, null];
  } catch (err) {
    return [null, { path: err.path, message: err.message, type: err.type }];
  }
}
