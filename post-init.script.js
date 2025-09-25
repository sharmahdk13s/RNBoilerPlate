#!/usr/bin/env node
const { rm } = require("fs").promises;
const { applyPlugins } = require("./template/plugins");
const { execSync } = require("child_process");

applyPlugins().then(async () => {
  try {
    await rm("./plugins", { recursive: true });
    execSync("node scripts/rename.js", { stdio: "inherit" });
  } catch (err) {
    console.error("❌ Failed running applyPlugins:", err.message);
  }
});
