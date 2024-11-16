export const validateWsMessage = (schema, data) => {
  const { error } = schema.validate(data, { abortEarly: false });
  if (error) {
    throw new Error(
      `Validation error: ${error.details.map((err) => err.message).join(", ")}`,
    );
  }
};
