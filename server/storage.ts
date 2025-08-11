import { InsertContact, SelectContact } from "@shared/schema";

export interface IStorage {
  // Contact operations
  createContact(contact: InsertContact): Promise<SelectContact>;
  getContacts(): Promise<SelectContact[]>;
  getContactById(id: number): Promise<SelectContact | null>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private contacts: SelectContact[] = [];
  private nextContactId = 1;

  async createContact(contact: InsertContact): Promise<SelectContact> {
    const newContact: SelectContact = {
      id: this.nextContactId++,
      ...contact,
      createdAt: new Date(),
    };
    this.contacts.push(newContact);
    return newContact;
  }

  async getContacts(): Promise<SelectContact[]> {
    return [...this.contacts].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getContactById(id: number): Promise<SelectContact | null> {
    return this.contacts.find(contact => contact.id === id) || null;
  }
}