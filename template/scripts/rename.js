#!/usr/bin/env node
const { execSync } = require("child_process");
const prompts = require("prompts");

(async () => {
  // Ask for new project name
  const response = await prompts({
    type: "text",
    name: "name",
    message: "Enter your project name:",
    validate: (value) =>
      value.length > 0 ? true : "Project name cannot be empty",
  });

  const projectName = response.name.trim();
  if (!projectName) {
    console.error("❌ No project name provided. Skipping rename.");
    process.exit(1);
  }

  console.log(`🔄 Renaming project to: ${projectName} ...`);

  try {
    execSync(
      `npx react-native-rename "${projectName}" -b com.${projectName.toLowerCase()}`,
      {
        stdio: "inherit",
      }
    );
    console.log("✅ Project renamed successfully!");
  } catch (error) {
    console.error("❌ Rename failed:", error.message);
    process.exit(1);
  }
})();
