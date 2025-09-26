#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

// If user runs `yarn add MyNewApp com.mynewapp`
// Yarn will try to add those packages.
// We'll intercept and treat them as projectName + bundleId.
let projectName = args[0] || process.env.PROJECT_NAME || 'MyApp';
let bundleId = args[1] || process.env.BUNDLE_ID || `com.${projectName.toLowerCase()}`;

console.log(`\n🔄 Renaming project to: ${projectName} (bundle: ${bundleId})\n`);

try {
  execSync(`npx react-native-rename "${projectName}" -b ${bundleId} --skipGitStatusCheck`, {
    stdio: 'inherit',
  });
  console.log('✅ Rename completed!');
} catch (e) {
  console.error('❌ Rename failed:', e.message);
  process.exit(1);
}

// 🧹 Cleanup after successful rename
try {
  const renameFile = path.join(process.cwd(), 'rename-after-init.js');
  if (fs.existsSync(renameFile)) {
    fs.rmSync(renameFile);
    console.log('🗑️ Removed rename-after-init.js');
  }

  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  // Remove postinstall hook
  if (packageJson.scripts && packageJson.scripts.postinstall) {
    delete packageJson.scripts.postinstall;
  }

  // Clean up accidental deps Yarn may have inserted
  if (packageJson.dependencies) {
    if (packageJson.dependencies[projectName]) delete packageJson.dependencies[projectName];
    if (packageJson.dependencies[bundleId]) delete packageJson.dependencies[bundleId];
  }

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('🗑️ Cleaned up package.json');
} catch (e) {
  console.error('⚠️ Cleanup failed:', e.message);
}
