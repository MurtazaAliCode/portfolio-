import { Router } from "express";
import { z } from "zod";
import { insertContactSchema } from "@shared/schema";
import { IStorage } from "./storage";

export function createRoutes(storage: IStorage) {
  const router = Router();

  // Contact form submission
  router.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      
      res.json({
        success: true,
        message: "Thank you for your message! I'll get back to you soon.",
        contact: {
          id: contact.id,
          name: contact.name,
          email: contact.email,
          subject: contact.subject,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Invalid form data",
          errors: error.errors,
        });
      }
      
      console.error("Contact form error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to process your message. Please try again.",
      });
    }
  });

  // Get all contacts (admin endpoint)
  router.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Get contacts error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch contacts",
      });
    }
  });

  // Get single contact by ID
  router.get("/api/contacts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid contact ID",
        });
      }

      const contact = await storage.getContactById(id);
      if (!contact) {
        return res.status(404).json({
          success: false,
          message: "Contact not found",
        });
      }

      res.json(contact);
    } catch (error) {
      console.error("Get contact error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch contact",
      });
    }
  });

  return router;
}