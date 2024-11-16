import config from "../config";

const errorHandler = (err, _req, res, _next) => {
  return res.status(500).json({
    message:
      config.nodeEnv === "production" ? "Sometging went wrong" : `${err}`,
  });
};

export default errorHandler;
