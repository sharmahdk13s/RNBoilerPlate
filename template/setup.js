#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const projectName = process.argv[2];
const bundleId = process.argv[3];

if (!projectName || !bundleId) {
  console.error("Project name and bundle ID must be provided.");
  console.log("Usage: npm run setup -- <projectName> <bundleId>");
  process.exit(1);
}

const projectPath = path.join(process.cwd(), projectName);

// Check if the project directory exists
if (!fs.existsSync(projectPath)) {
  console.error(`Error: Directory not found at ${projectPath}.`);
  console.log(
    "Please ensure you have initialized the project before running the setup script."
  );
  process.exit(1);
}

try {
  console.log(`Renaming project in ${projectPath}...`);
  execSync(
    `npx react-native-rename "${projectName}" -b ${bundleId} --skipGitStatusCheck`,
    {
      cwd: projectPath,
      stdio: "inherit",
    }
  );

  console.log("Project setup complete!");
} catch (error) {
  console.error(`An error occurred: ${error.message}`);
  process.exit(1);
}
