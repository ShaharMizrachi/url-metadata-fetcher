import React from "react";
import axios, { AxiosResponse } from "axios";

const url = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "/api",
  headers: {
    "Content-type": "Application/json",
    // "Access-Control-Allow-Origin": "*",
  },
});

export const makeRequest = async (callback: () => Promise<any>, functionName: string) => {
  try {
    return await callback();
  } catch (e) {
    console.log(`[${functionName}]: ${e}`);
  }
};

export const fetchMetadata = async (urls: string[]) => {
  return makeRequest(async () => {
    const response = await url.post("/fetch-metadata", { urls });
    return response.data;
  }, "metaDataPull");
};
