"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const corsOptions_1 = __importDefault(require("../middlewares/corsOptions"));
const rateLimiter_1 = require("../middlewares/rateLimiter");
const metadataRoutes_1 = __importDefault(require("../routes/metadataRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)(corsOptions_1.default));
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
//rate limiting
app.use(rateLimiter_1.limiter);
app.use("/api", metadataRoutes_1.default);
// app.listen(5000, () => {
//   console.log("server is up with port 5000");
// });
exports.default = app;
