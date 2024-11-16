export const validationMiddleware = (schema, property = "body") => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property], { abortEarly: false });

    if (error) {
      return res.status(400).json({
        status: "error",
        message: "Validation error",
        details: error.details.map((err) => err.message),
      });
    }
    next();
  };
};
