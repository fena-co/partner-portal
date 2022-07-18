const typeToFormErrors = (err) => {
  const errors = {};
  err.inner.forEach((item) => {
    if (!errors[item.path]) {
      errors[item.path] = [item.message];
    } else {
      errors[item.path].push(item.message);
    }
  });
  return errors;
};

export const runValidation = (schema, values) =>
  new Promise((resolve) => {
    schema.validate(values, { abortEarly: false }).then(
      () => {
        resolve({});
      },
      (err) => {
        resolve(typeToFormErrors(err));
      }
    );
  });
