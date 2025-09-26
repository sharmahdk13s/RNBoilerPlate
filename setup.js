#!/usr/bin/env node

const { execSync } = require("child_process");
const prompts = require("prompts");
const fs = require("fs-extra");
const path = require("path");

async function main() {
  console.log("Welcome to the React Native Kit Mobmaxime setup!");

  const questions = [
    {
      type: "text",
      name: "projectName",
      message: "What would you like to name your new project?",
      validate: (value) => (value ? true : "Project name cannot be empty."),
    },
    {
      type: "text",
      name: "bundleId",
      message: "What is the bundle ID for your new project?",
      initial: (prev) => `com.${prev.toLowerCase()}`,
      validate: (value) => (value ? true : "Bundle ID cannot be empty."),
    },
  ];

  let canceled = false;
  const { projectName, bundleId } = await prompts(questions, {
    onCancel: () => {
      canceled = true;
    },
  });

  if (canceled) {
    console.log("\nSetup canceled. No changes were made.");
    process.exit(0);
  }

  const projectPath = path.join(process.cwd(), projectName);
  const templatePath = path.join(__dirname, "template");

  try {
    console.log(`\nCreating new project at: ${projectPath}`);
    fs.copySync(templatePath, projectPath);

    console.log(
      `\nRenaming project to "${projectName}" with bundle ID "${bundleId}"...`
    );
    execSync(
      `npx react-native-rename "${projectName}" -b "${bundleId}" --skipGitStatusCheck`,
      {
        cwd: projectPath,
        stdio: "inherit",
      }
    );

    // Final cleanup
    const finalPackageJsonPath = path.join(projectPath, "package.json");
    if (fs.existsSync(finalPackageJsonPath)) {
      const packageJson = fs.readJsonSync(finalPackageJsonPath);
      delete packageJson.scripts.setup; // remove old setup script if it exists
      delete packageJson.scripts.postinstall; // remove old postinstall script
      fs.writeJsonSync(finalPackageJsonPath, packageJson, { spaces: 2 });
    }
    const oldSetupJsPath = path.join(projectPath, "setup.js");
    if (fs.existsSync(oldSetupJsPath)) {
      fs.removeSync(oldSetupJsPath);
    }

    console.log(`\n✅ Success! Your new project "${projectName}" is ready.`);
    console.log(`\nTo get started, run the following commands:\n`);
    console.log(`  cd ${projectName}`);
    console.log(`  npm install`);
    console.log(`  npx pod-install`);
  } catch (err) {
    console.error(`\n❌ An error occurred during setup: ${err.message}`);
    if (fs.existsSync(projectPath)) {
      console.log("Cleaning up created directory...");
      fs.removeSync(projectPath);
    }
    process.exit(1);
  }
}

main();
