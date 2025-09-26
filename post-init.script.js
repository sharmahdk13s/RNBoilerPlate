#!/usr/bin/env node
const { rm, writeFile, readFile } = require("fs").promises;
const { applyPlugins } = require("./template/plugins");
const path = require("path");

async function run() {
  await applyPlugins();

  try {
    await rm("./plugins", { recursive: true });
  } catch (err) {
    console.error("❌ Failed running applyPlugins:", err.message);
  }

  // 🔄 Inject rename-after-init.js into the generated project
  const renameScriptContent = `#!/usr/bin/env node
const { execSync } = require("child_process");

const projectName = process.env.PROJECT_NAME || "MyApp";
const bundleId = process.env.BUNDLE_ID || \`com.\${projectName.toLowerCase()}\`;

console.log(\`\\n🔄 Renaming project to: \${projectName} (bundle: \${bundleId})\\n\`);

try {
  execSync(
    \`npx react-native-rename "\${projectName}" -b \${bundleId} --skipGitStatusCheck\`,
    { stdio: "inherit" }
  );
  console.log("✅ Rename completed!");
} catch (e) {
  console.error("❌ Rename failed:", e.message);
  process.exit(1);
}
`;

  const renameFile = path.join(process.cwd(), "rename-after-init.js");
  await writeFile(renameFile, renameScriptContent, { encoding: "utf8" });

  // 🔄 Add postinstall hook into package.json
  const packageJsonPath = path.join(process.cwd(), "package.json");
  const packageJsonRaw = await readFile(packageJsonPath, "utf8");
  const packageJson = JSON.parse(packageJsonRaw);

  packageJson.scripts = packageJson.scripts || {};
  packageJson.scripts.postinstall = "node rename-after-init.js";

  await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log("✅ postinstall rename hook added");
}

run();
