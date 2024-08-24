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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchMetadata = void 0;
const axios_1 = __importDefault(require("axios"));
const fetchMetadata = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch the HTML content
        const response = yield axios_1.default.get(url);
        // Regular expressions extract
        const titleMatch = response.data.match(/<title>([^<]*)<\/title>/);
        const descriptionMatch = response.data.match(/<meta name="description" content="([^"]*)"/);
        const imageMatch = response.data.match(/<meta property="og:image" content="([^"]*)"/);
        return {
            title: titleMatch ? titleMatch[1] : "No title found",
            description: descriptionMatch ? descriptionMatch[1] : "No description found",
            image: imageMatch ? imageMatch[1] : "No image found",
        };
    }
    catch (error) {
        console.error(`Error fetching metadata from ${url}:`, error);
    }
});
exports.fetchMetadata = fetchMetadata;
