#!/usr/bin/env node

const { execSync } = require("child_process");
const prompts = require("prompts");
const fs = require("fs");
const path = require("path");

async function main() {
  const questions = [
    {
      type: "text",
      name: "projectName",
      message: "What is the name of your new project?",
      validate: (value) => (value ? true : "Project name cannot be empty."),
    },
    {
      type: "text",
      name: "bundleId",
      message: "What is the bundle ID of your new project?",
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
    console.log("\nSetup canceled.");
    process.exit(0);
  }

  try {
    console.log(
      `\n🔄 Creating a new React Native project named "${projectName}"...\n`
    );

    execSync(
      `npx @react-native-community/cli init ${projectName} --template https://github.com/sharmahdk13s/RNKitMobmaxime.git`,
      { stdio: "inherit" }
    );

    console.log(`\n✅ Project created successfully!`);
    console.log(
      `\n🔄 Renaming project to "${projectName}" with bundle ID "${bundleId}"...\n`
    );

    const projectPath = path.join(process.cwd(), projectName);

    execSync(
      `npx react-native-rename "${projectName}" -b "${bundleId}" --skipGitStatusCheck`,
      {
        cwd: projectPath,
        stdio: "inherit",
      }
    );

    // remove setup.js and setup script from new project
    const packageJsonPath = path.join(projectPath, "package.json");
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
    delete packageJson.scripts.setup;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    fs.unlinkSync(path.join(projectPath, "setup.js"));

    console.log("\n✅ Project renamed successfully!");
  } catch (err) {
    console.error(`\n❌ An error occurred during setup: ${err.message}`);
    process.exit(1);
  }
}

main();
