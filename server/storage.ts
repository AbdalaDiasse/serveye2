import { 
  users, type User, type InsertUser,
  domainConfigs, type DomainConfig, type InsertDomainConfig 
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getDomainConfig(userId: number): Promise<DomainConfig | undefined>;
  saveDomainConfig(config: InsertDomainConfig): Promise<DomainConfig>;
  updateDomainConfig(id: number, config: Partial<DomainConfig>): Promise<DomainConfig | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private domainConfigs: Map<number, DomainConfig>;
  currentUserId: number;
  currentConfigId: number;

  constructor() {
    this.users = new Map();
    this.domainConfigs = new Map();
    this.currentUserId = 1;
    this.currentConfigId = 1;
    
    // Initialize with default configuration for demo purposes
    this.domainConfigs.set(1, {
      id: 1,
      userId: 1,
      domain: "industrial_safety",
      sections: ["safety_equipment", "zone_monitoring", "behavior_analysis", "person_recognition", "people_counting", "vehicles", "recent_activity"],
      isActive: true
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getDomainConfig(userId: number): Promise<DomainConfig | undefined> {
    // For demo purposes, return config for any user, in real app would filter by userId
    return Array.from(this.domainConfigs.values()).find(
      (config) => config.isActive
    ) || Array.from(this.domainConfigs.values())[0];
  }

  async saveDomainConfig(config: InsertDomainConfig): Promise<DomainConfig> {
    // Deactivate existing configs for this user
    Array.from(this.domainConfigs.entries()).forEach(([id, existingConfig]) => {
      if (existingConfig.userId === config.userId) {
        this.domainConfigs.set(id, { ...existingConfig, isActive: false });
      }
    });

    // Create new active config
    const id = this.currentConfigId++;
    const newConfig: DomainConfig = { 
      id,
      userId: config.userId || null,
      domain: config.domain,
      sections: config.sections,
      isActive: config.isActive || true
    };
    this.domainConfigs.set(id, newConfig);
    return newConfig;
  }

  async updateDomainConfig(id: number, updates: Partial<DomainConfig>): Promise<DomainConfig | undefined> {
    const config = this.domainConfigs.get(id);
    if (!config) return undefined;
    
    const updatedConfig = { ...config, ...updates };
    this.domainConfigs.set(id, updatedConfig);
    return updatedConfig;
  }
}

export const storage = new MemStorage();
