import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDomainConfigSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Domain configuration routes
  app.get("/api/domain-config", async (req, res) => {
    try {
      // For demo purposes, use userId = 1
      const config = await storage.getDomainConfig(1);
      res.json(config);
    } catch (error) {
      console.error("Error fetching domain config:", error);
      res.status(500).json({ error: "Failed to fetch domain configuration" });
    }
  });

  app.post("/api/domain-config", async (req, res) => {
    try {
      const validatedData = insertDomainConfigSchema.parse({
        ...req.body,
        userId: 1, // For demo purposes
        isActive: true
      });
      
      const config = await storage.saveDomainConfig(validatedData);
      res.json(config);
    } catch (error) {
      console.error("Error saving domain config:", error);
      res.status(500).json({ error: "Failed to save domain configuration" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
