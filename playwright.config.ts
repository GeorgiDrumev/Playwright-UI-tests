import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: undefined,
  reporter: [
    ["html", { outputFolder: "playwright-report" }],
    ["junit", { outputFile: "test-results/junit.xml" }],
    ["list"],
    ["github"],
  ],
  use: {
    baseURL: "https://www.saucedemo.com",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  expect: {
    toHaveScreenshot: {
      maxDiffPixels: 100,
      threshold: 0.001, // 0.1% difference allowed
    },
  },
  snapshotPathTemplate:
    "data/screenshots/{testFilePath}/{projectName}/{arg}{ext}",
  timeout: 15000,
  projects: [
    {
      name: "setup",
      testMatch: /auth\.setup\.ts/,
    },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1280, height: 720 },
        storageState: ".auth/state.json",
      },
      dependencies: ["setup"],
    },
    {
      name: "safari-mobile",
      use: {
        ...devices["iPhone 14 Pro"],
        viewport: { width: 393, height: 852 },
        storageState: ".auth/state.json",
      },
      dependencies: ["setup"],
    },
  ],
});
