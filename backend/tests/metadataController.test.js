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
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const metadataService_1 = require("../services/metadataService");
const getMetadata_1 = require("../controllers/getMetadata");
jest.mock("../services/metadataService");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/api/fetch-metadata", getMetadata_1.getMetadata);
describe("GET /api/fetch-metadata", () => {
    it("should return 400 if no URLs are provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/api/fetch-metadata").send({ urls: [] });
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Invalid input, please provide an array with at least 3 URLs.");
    }));
    it("should return metadata for a valid URL", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockMetadata = {
            title: "Test Title",
            description: "Test Description",
            image: "Test Image",
        };
        metadataService_1.fetchMetadata.mockResolvedValue(mockMetadata);
        const response = yield (0, supertest_1.default)(app)
            .post("/api/fetch-metadata")
            .send({
            urls: ["https://testurl.com"],
        });
        expect(response.status).toBe(200);
        expect(response.body).toEqual([mockMetadata]);
    }));
    it("should return 500 if fetching metadata fails", () => __awaiter(void 0, void 0, void 0, function* () {
        metadataService_1.fetchMetadata.mockRejectedValue(new Error("Failed to fetch metadata"));
        const response = yield (0, supertest_1.default)(app)
            .post("/api/fetch-metadata")
            .send({
            urls: ["https://testurl.com"],
        });
        expect(response.status).toBe(500);
        expect(response.body.error).toBe("Error fetching metadata");
    }));
    it("should return metadata for multiple URLs", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockMetadata = {
            title: "Test Title",
            description: "Test Description",
            image: "Test Image",
        };
        metadataService_1.fetchMetadata.mockResolvedValue(mockMetadata);
        const response = yield (0, supertest_1.default)(app)
            .post("/api/fetch-metadata")
            .send({
            urls: ["https://shahar-portwwfolio.vercel.app/", "https://shahar-portwwfolio.vercel.app/", "https://shahar-portwwfolio.vercel.app/"],
        });
        expect(response.status).toBe(200);
        expect(response.body).toEqual([mockMetadata, mockMetadata, mockMetadata]);
    }));
    it("should handle mixed success and failure in fetching metadata", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockMetadata = {
            title: "Test Title",
            description: "Test Description",
            image: "Test Image",
        };
        metadataService_1.fetchMetadata.mockResolvedValueOnce(mockMetadata).mockRejectedValueOnce(new Error("Failed to fetch metadata"));
        const response = yield (0, supertest_1.default)(app)
            .post("/api/fetch-metadata")
            .send({
            urls: ["https://shahar-portfolio.vercel.app/", "https://testFailed.com"],
        });
        expect(response.status).toBe(200);
        expect(response.body).toEqual([mockMetadata, { error: "null" }]);
    }));
});
