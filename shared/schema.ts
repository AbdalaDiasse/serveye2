import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Domain configuration schema
export const domainConfigs = pgTable("domain_configs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  domain: text("domain").notNull(), // 'industrial_safety', 'smart_city', 'smart_retail', 'education'
  sections: jsonb("sections").$type<string[]>().notNull(), // Array of enabled section names
  isActive: boolean("is_active").default(false).notNull(),
});

export const insertDomainConfigSchema = createInsertSchema(domainConfigs).pick({
  userId: true,
  domain: true,
  sections: true,
  isActive: true,
});

export type InsertDomainConfig = z.infer<typeof insertDomainConfigSchema>;
export type DomainConfig = typeof domainConfigs.$inferSelect;

// Domain and section definitions
export const DOMAINS = {
  industrial_safety: {
    name: "Sécurité Industrielle",
    icon: "🏭",
    sections: [
      { id: "safety_equipment", name: "Équipements de Sécurité", description: "Casques, vestes, harnais" },
      { id: "zone_monitoring", name: "Surveillance des Zones", description: "Zones autorisées/interdites" },
      { id: "behavior_analysis", name: "Analyse des Comportements", description: "Détection de comportements dangereux" },
      { id: "person_recognition", name: "Reconnaissance Personnes", description: "Identification du personnel" },
      { id: "people_counting", name: "Comptage de Personnes", description: "Nombre de personnes par zone" },
      { id: "vehicles", name: "Véhicules", description: "Surveillance véhicules industriels" },
      { id: "recent_activity", name: "Activité Récente", description: "Événements récents" }
    ]
  },
  smart_city: {
    name: "Ville Intelligente",
    icon: "🏙️",
    sections: [
      { id: "zone_monitoring", name: "Surveillance des Zones", description: "Surveillance urbaine par zones" },
      { id: "personnes", name: "Personnes", description: "Analyse et comptage des piétons" },
      { id: "traffic", name: "Traffic", description: "Surveillance véhicules et densité" },
      { id: "behavior", name: "Analyse Comportementale", description: "Détection d'incidents urbains" }
    ]
  },
  smart_retail: {
    name: "Commerce Intelligent",
    icon: "🛒",
    sections: [
      { id: "anomalies", name: "Anomalies", description: "Manger, Vol, Trajectoires" },
      { id: "service_quality", name: "Qualité de Service", description: "Temps moyen, Alertes attente" },
      { id: "customer_analysis", name: "Analyse Client", description: "Visiteurs, Temps séjour, Distribution" },
      { id: "persons", name: "Personnes", description: "VIP, Liste noire" },
      { id: "area_analysis", name: "Analyse Zone", description: "Heatmap, Trajectoires, Rayons" }
    ]
  }
} as const;

export type DomainType = keyof typeof DOMAINS;
