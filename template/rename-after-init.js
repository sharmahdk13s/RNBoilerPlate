#!/usr/bin/env node
const { execSync } = require('child_process');

const projectName = process.env.PROJECT_NAME || 'MyApp';
const bundleId = process.env.BUNDLE_ID || `com.${projectName.toLowerCase()}`;

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
