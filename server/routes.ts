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

  // Safety event chat route (Mock implementation)
  app.post("/api/safety/chat", async (req, res) => {
    try {
      const { message, eventContext } = req.body;
      
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      // Mock responses based on message content
      const lowerMessage = message.toLowerCase();
      let response = "";
      
      if (lowerMessage.includes('fire') && lowerMessage.includes('start')) {
        response = "Based on the thermal imaging data and smoke detection patterns, the fire appears to have originated from the electrical panel in Zone B. The rapid temperature increase suggests an electrical short circuit as the likely cause.";
      } else if (lowerMessage.includes('safety') && lowerMessage.includes('measure')) {
        response = "Several safety measures were triggered: Automatic fire suppression system activated, emergency evacuation alerts sent to all personnel, and zone isolation protocols engaged.";
      } else if (lowerMessage.includes('witness')) {
        response = "According to access logs, 3 personnel were in the vicinity during the incident. All personnel were safely evacuated and their statements have been logged.";
      } else {
        response = `I've analyzed the ${eventContext?.type || 'event'} that occurred at ${eventContext?.time || 'the reported time'} in ${eventContext?.location || 'the monitored area'}. This incident requires immediate attention and follow-up investigation.`;
      }
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      res.json({ response });
    } catch (error) {
      console.error("Error in safety chat:", error);
      res.status(500).json({ error: "Failed to process chat message" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
