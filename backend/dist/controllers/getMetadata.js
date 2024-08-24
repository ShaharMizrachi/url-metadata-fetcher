"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMetadata = void 0;
const metadataService_1 = require("../services/metadataService");
const getMetadata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { urls } = req.body;
    console.log(urls.length);
    if (!Array.isArray(urls) || urls.length < 3) {
        res.status(400).json({ error: "Invalid input, please provide an array with at least 3 URLs." });
        return;
    }
    try {
        const metadata = [];
        for (const url of urls) {
            const data = yield (0, metadataService_1.fetchMetadata)(url);
            metadata.push(data);
        }
        res.json(metadata);
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching metadata" });
    }
});
exports.getMetadata = getMetadata;
