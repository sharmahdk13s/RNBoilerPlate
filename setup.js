#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const projectName = process.argv[2];
const bundleId = process.argv[3];

if (!projectName || !bundleId) {
  console.error("Project name and bundle ID must be provided.");
  console.log("Usage: node setup.js <projectName> <bundleId>");
  process.exit(1);
}

const templatePath = path.join(__dirname, "template");
const destinationPath = path.join(__dirname, projectName);

try {
  console.log(`Creating project directory at ${destinationPath}...`);
  fs.mkdirSync(destinationPath, { recursive: true });

  console.log(`Copying template files to ${destinationPath}...`);
  execSync(`cp -r ${templatePath}/. ${destinationPath}/`); // Using . to copy hidden files as well

  console.log(`Renaming project in ${destinationPath}...`);
  execSync(
    `npx react-native-rename "${projectName}" -b ${bundleId} --skipGitStatusCheck`,
    {
      cwd: destinationPath,
      stdio: "inherit",
    }
  );

  console.log("Project setup complete!");
} catch (error) {
  console.error(`An error occurred: ${error.message}`);
  process.exit(1);
}
