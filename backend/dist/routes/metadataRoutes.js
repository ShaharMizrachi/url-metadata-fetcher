"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getMetadata_1 = require("../controllers/getMetadata");
const router = (0, express_1.Router)();
router.post("/fetch-metadata", getMetadata_1.getMetadata);
exports.default = router;
