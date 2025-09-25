#!/usr/bin/env node
const { rm } = require("fs").promises;
const { applyPlugins } = require("./template/plugins");

applyPlugins().then(async () => {
  try {
    await rm("./plugins", { recursive: true });
  } catch (err) {
    console.error("❌ Failed running applyPlugins:", err.message);
  }
});
