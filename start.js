#!/usr/bin/env node
require("child_process").execSync("expo start", {
  stdio: "inherit",
  env: {
    ...process.env,
    EXPO_OFFLINE: "1",
    EXPO_NO_DEPENDENCY_VALIDATION: "1",
  },
});
