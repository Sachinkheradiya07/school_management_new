import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 20 * 60 * 1000, // 20 minutes
  max: 500,
  message: "Too many requests, please try again later.",
});
