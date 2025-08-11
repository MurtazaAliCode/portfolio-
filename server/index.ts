import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { createRoutes } from "./routes";
import { MemStorage } from "./storage";

const app = express();
const PORT = parseInt(process.env.PORT || "5000");

async function startServer() {
  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Initialize storage
  const storage = new MemStorage();

  // API routes (before static serving)
  app.use(createRoutes(storage));

  if (process.env.NODE_ENV === "production") {
    // Serve static files in production
    const distPath = path.resolve(process.cwd(), "dist");
    app.use(express.static(distPath));
    
    // Handle client-side routing
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  } else {
    // Development mode with Vite middleware
    try {
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
        configFile: path.resolve(process.cwd(), "vite.config.ts"),
      });

      // Use vite's connect instance as middleware
      app.use(vite.ssrFixStacktrace);
      app.use(vite.middlewares);
      console.log("Vite middleware loaded successfully");
    } catch (error) {
      console.error("Failed to start Vite server:", error);
      // Fallback without Vite
      app.get("*", (req, res) => {
        res.json({ 
          error: "Vite dev server failed to start",
          message: "API is running, but frontend is not available",
          endpoints: [
            "POST /api/contact - Submit contact form",
            "GET /api/contacts - Get all contacts (admin)",
            "GET /api/contacts/:id - Get contact by ID"
          ]
        });
      });
    }
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    if (process.env.NODE_ENV !== "production") {
      console.log("Frontend served by Vite dev server");
    }
  });
}

startServer().catch(console.error);