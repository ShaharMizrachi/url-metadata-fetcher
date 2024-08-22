import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 1000, // 1 second window
  max: 5, // limit each IP to 5
});
