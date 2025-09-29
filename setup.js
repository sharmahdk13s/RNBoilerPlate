#!/usr/bin/env node

const { execSync } = require("child_process");
const prompts = require("prompts");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log(`
'########::'########::::'###:::::'######::'########::::::::::'##::: ##::::'###::::'########:'####:'##::::'##:'########:
 ##.... ##: ##.....::::'## ##:::'##... ##:... ##..::::::::::: ###:: ##:::'## ##:::... ##..::. ##:: ##:::: ##: ##.....::
 ##:::: ##: ##::::::::'##:. ##:: ##:::..::::: ##::::::::::::: ####: ##::'##:. ##::::: ##::::: ##:: ##:::: ##: ##:::::::
 ########:: ######:::'##:::. ##: ##:::::::::: ##::::'#######: ## ## ##:'##:::. ##:::: ##::::: ##:: ##:::: ##: ######:::
 ##.. ##::: ##...:::: #########: ##:::::::::: ##::::........: ##. ####: #########:::: ##::::: ##::. ##:: ##:: ##...::::
 ##::. ##:: ##::::::: ##.... ##: ##::: ##:::: ##::::::::::::: ##:. ###: ##.... ##:::: ##::::: ##:::. ## ##::: ##:::::::
 ##:::. ##: ########: ##:::: ##:. ######::::: ##::::::::::::: ##::. ##: ##:::: ##:::: ##::::'####:::. ###:::: ########:
..:::::..::........::..:::::..:::......::::::..::::::::::::::..::::..::..:::::..:::::..:::::....:::::...:::::........::
  `);
  console.log("Welcome to the React Native BoilerPlate!");

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

  try {
    console.log(`\nCreating new project at: ${projectPath}...`);
    execSync(
      `npx @react-native-community/cli init "${projectName}" --template rn-react-native-boilerplate@git+https://github.com/sharmahdk13s/RNBoilerPlate.git --pm yarn`,
      { stdio: "inherit" }
    );

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
      const packageJson = JSON.parse(
        fs.readFileSync(finalPackageJsonPath, "utf8")
      );
      delete packageJson.scripts.setup; // remove old setup script if it exists
      delete packageJson.scripts.postinstall; // remove old postinstall script
      fs.writeFileSync(
        finalPackageJsonPath,
        JSON.stringify(packageJson, null, 2)
      );
    }
    const oldSetupJsPath = path.join(projectPath, "setup.js");
    if (fs.existsSync(oldSetupJsPath)) {
      fs.unlinkSync(oldSetupJsPath);
    }

    // Remove plugins directory
    const pluginsPath = path.join(projectPath, "plugins");
    if (fs.existsSync(pluginsPath)) {
      console.log("\nRemoving plugins directory...");
      fs.rmSync(pluginsPath, { recursive: true, force: true });
    }

    // Create .env file
    const envContent = `ENV=DEV
BASE_API_URL=https://dummyjson.com
IMAGE_URL=https://dev-tn-file-server.s3.ap-south-1.amazonaws.com`;
    const envPath = path.join(projectPath, ".env");
    console.log("\nCreating .env file...");
    fs.writeFileSync(envPath, envContent);

    // Create run.sh file
    const runShContent = `#!/bin/bash
        yarn
        chmod 755 android/gradlew
        bundle install
        yarn podinstall
        rm -rf run.sh`;
    const runShPath = path.join(projectPath, "run.sh");
    console.log("\nCreating run.sh file...");
    fs.writeFileSync(runShPath, runShContent);
    execSync(`chmod +x run.sh`, {
      cwd: projectPath,
      stdio: "inherit",
    });

    console.log("\nRunning initial setup script...");
    execSync(`./run.sh`, {
      cwd: projectPath,
      stdio: "inherit",
    });

    console.log(`\n✅ Success! Your new project "${projectName}" is ready.`);
    console.log(
      `You can now run the following commands to start your project:\n`
    );
    console.log(`yarn android\nyarn ios --simulator="iPhone 15 Pro"`);
  } catch (err) {
    console.error(`\n❌ An error occurred during setup: ${err.message}`);
    process.exit(1);
  }
}

main();
