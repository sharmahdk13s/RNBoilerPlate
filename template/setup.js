#!/usr/bin/env node

const { execSync } = require('child_process');

const newProjectName = process.argv[2];
const newBundleId = process.argv[3];

if (!newProjectName || !newBundleId) {
  console.error('Error: New project name and bundle ID are required.');
  console.log('Usage: npm run setup -- <NewProjectName> <com.yourcompany.newprojectname>');
  process.exit(1);
}

try {
  console.log(`\n🔄 Renaming project to "${newProjectName}" with bundle ID "${newBundleId}"...\n`);

  // This script is run from the project root, so we can execute the command directly.
  execSync(`npx react-native-rename "${newProjectName}" -b "${newBundleId}" --skipGitStatusCheck`, {
    stdio: 'inherit',
  });

  console.log('\n✅ Project renamed successfully!');
} catch (err) {
  console.error(`\n❌ Error renaming project: ${err.message}`);
  process.exit(1);
}
