#!/usr/bin/env node
const { rm } = require("fs").promises;
const { applyPlugins } = require("./template/plugins");
const { execSync } = require("child_process");

async function run() {
  await applyPlugins();

  try {
    await rm("./plugins", { recursive: true });
  } catch (err) {
    console.error("❌ Failed running applyPlugins:", err.message);
  }

  // 🔄 Rename logic
  const projectName = process.env.PROJECT_NAME || "MyApp";
  const bundleId = process.env.BUNDLE_ID || `${projectName.toLowerCase()}`;

  console.log(
    `\n🔄 Renaming project to: ${projectName} (bundle: ${bundleId})\n`
  );

  try {
    execSync(
      `npx react-native-rename "${projectName}" -b ${bundleId} --skipGitStatusCheck`,
      { stdio: "inherit" }
    );
    console.log("✅ Rename completed!");
  } catch (e) {
    console.error("❌ Rename failed:", e.message);
    process.exit(1);
  }
}

run();
