const { execSync } = require('child_process');

const projectName = process.env.PROJECT_NAME || 'MyApp';
const bundleId = process.env.BUNDLE_ID || 'com.mycompany.myapp';

// Run react-native-rename
execSync(`npx react-native-rename ${projectName} -b ${bundleId}`, { stdio: 'inherit' });
