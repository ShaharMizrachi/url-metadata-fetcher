import express from "express";
import helmet from "helmet";
import metadataRoutes from "./routes/metadataRoutes";
import { limiter } from "./middlewares/rateLimiter";
import cors from "cors";
import corsOptions from "./middlewares/corsOptions";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet());

//rate limiting
app.use(limiter);

app.use("/api", metadataRoutes);

app.listen(5000, () => {
  console.log("server is up with port 5000");
});
