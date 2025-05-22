#!/usr/bin/env node
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//get the app name from the command line (default if not provided)
const appName = process.argv[2] || "My App Name";

// Path to the template.sw.js inside your package
const templateDir = path.resolve(__dirname, "../template/sw.template.js");

//Path to write the final sw.js to
const outputPath = path.resolve(process.cwd(), "public/sw.js");

// Create the public/ directory if it doesn't exist
if (!fs.existsSync(path.dirname(outputPath))) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
}

// Read template, replace placeholder with real app name
const template = fs.readFileSync(templateDir, "utf-8");
const customizedTemplate = template.replace(/{{APP_NAME}}/g, appName);

//Write the updated template back to sw.js
fs.writeFileSync(outputPath, customizedTemplate, "utf-8");
