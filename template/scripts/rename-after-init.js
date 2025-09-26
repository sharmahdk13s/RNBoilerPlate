#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
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

// 🧹 Cleanup
try {
  const renameFile = path.join(process.cwd(), 'scripts/rename-after-init.js');
  if (fs.existsSync(renameFile)) {
    fs.rmSync(renameFile);
    console.log('🗑️ Removed rename-after-init.js');
  }

  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  if (packageJson.scripts && packageJson.scripts.postinstall) {
    delete packageJson.scripts.postinstall;
  }

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('🗑️ Cleaned package.json');
} catch (e) {
  console.error('⚠️ Cleanup failed:', e.message);
}
