import { Router } from "express";
import { z } from "zod";
import { insertContactSchema } from "@shared/schema";
import { IStorage } from "./storage";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

export function createRoutes(storage: IStorage) {
  const router = Router();

  // Nodemailer transporter setup
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true', // Use 'true' for 465, 'false' for 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Contact form submission
  router.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      
      // Send email
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.RECIPIENT_EMAIL, // User's email where they want to receive messages
        subject: `New Contact Form Submission: ${validatedData.subject}`,
        html: `
          <p>You have received a new message from your portfolio contact form:</p>
          <ul>
            <li><strong>Name:</strong> ${validatedData.name}</li>
            <li><strong>Email:</strong> ${validatedData.email}</li>
            <li><strong>Subject:</strong> ${validatedData.subject}</li>
            <li><strong>Message:</strong> ${validatedData.message}</li>
          </ul>
        `,
      };

      await transporter.sendMail(mailOptions);

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