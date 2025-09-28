import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDomainConfigSchema } from "@shared/schema";
import OpenAI from "openai";

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

  // Safety event chat route
  app.post("/api/safety/chat", async (req, res) => {
    try {
      const { message, eventContext } = req.body;
      
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      // Initialize OpenAI client
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      if (!process.env.OPENAI_API_KEY) {
        return res.json({
          response: "I need an OpenAI API key to help investigate this event. Please configure the API key and try again."
        });
      }

      // Create a context-aware prompt
      const systemPrompt = `You are an AI safety investigator helping to analyze security and safety events. 
      You are analyzing an event with the following context:
      - Event Type: ${eventContext?.type || 'Unknown'}
      - Location: ${eventContext?.location || 'Unknown'}
      - Time: ${eventContext?.time || 'Unknown'}
      - Description: ${eventContext?.description || 'No description'}
      - Severity: ${eventContext?.severity || 'Unknown'}
      
      Provide helpful, analytical responses about the event. Be specific and detailed in your analysis.
      If asked about how something happened, provide plausible explanations based on the context.
      Focus on safety procedures, potential causes, and recommendations for prevention.`;

      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message }
          ],
          temperature: 0.7,
          max_tokens: 500
        });

        const response = completion.choices[0]?.message?.content || "I couldn't analyze this event at the moment.";
        
        res.json({ response });
      } catch (openaiError) {
        console.error("OpenAI API error:", openaiError);
        res.json({ 
          response: "I'm having trouble connecting to the AI service. Please check the API configuration and try again."
        });
      }
    } catch (error) {
      console.error("Error in safety chat:", error);
      res.status(500).json({ error: "Failed to process chat message" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
