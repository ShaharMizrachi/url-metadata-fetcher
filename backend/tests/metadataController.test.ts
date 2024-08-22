import request from "supertest";
import express from "express";
import { fetchMetadata } from "../services/metadataService";
import { getMetadata } from "../controllers/getMetadata";

jest.mock("../services/metadataService");

const app = express();
app.use(express.json());

app.post("/api/fetch-metadata", getMetadata);

describe("GET /api/fetch-metadata", () => {
  it("should return 400 if no URLs are provided", async () => {
    const response = await request(app).post("/api/fetch-metadata").send({ urls: [] });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid input, please provide an array with at least 3 URLs.");
  });

  it("should return metadata for a valid URL", async () => {
    const mockMetadata = {
      title: "Test Title",
      description: "Test Description",
      image: "Test Image",
    };

    (fetchMetadata as jest.Mock).mockResolvedValue(mockMetadata);

    const response = await request(app)
      .post("/api/fetch-metadata")
      .send({
        urls: ["https://testurl.com"],
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual([mockMetadata]);
  });

  it("should return 500 if fetching metadata fails", async () => {
    (fetchMetadata as jest.Mock).mockRejectedValue(new Error("Failed to fetch metadata"));

    const response = await request(app)
      .post("/api/fetch-metadata")
      .send({
        urls: ["https://testurl.com"],
      });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Error fetching metadata");
  });

  it("should return metadata for multiple URLs", async () => {
    const mockMetadata = {
      title: "Test Title",
      description: "Test Description",
      image: "Test Image",
    };

    (fetchMetadata as jest.Mock).mockResolvedValue(mockMetadata);

    const response = await request(app)
      .post("/api/fetch-metadata")
      .send({
        urls: ["https://shahar-portwwfolio.vercel.app/", "https://shahar-portwwfolio.vercel.app/", "https://shahar-portwwfolio.vercel.app/"],
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual([mockMetadata, mockMetadata, mockMetadata]);
  });

  it("should handle mixed success and failure in fetching metadata", async () => {
    const mockMetadata = {
      title: "Test Title",
      description: "Test Description",
      image: "Test Image",
    };

    (fetchMetadata as jest.Mock).mockResolvedValueOnce(mockMetadata).mockRejectedValueOnce(new Error("Failed to fetch metadata"));

    const response = await request(app)
      .post("/api/fetch-metadata")
      .send({
        urls: ["https://shahar-portfolio.vercel.app/", "https://testFailed.com"],
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual([mockMetadata, { error: "null" }]);
  });
});
