import { CorsOptions } from "cors";

const corsOptions: CorsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};

export default corsOptions;
