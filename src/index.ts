import chrome from "selenium-webdriver/chrome";
import { Builder, By, Key, until } from "selenium-webdriver";
import fs from "fs/promises";
import path from "path";

const chromeOptions = new chrome.Options();
const chromeFlags = [
  "--headless",
  "--no-sandbox",
  "--autoplay-policy=no-user-gesture-required",
  "--no-first-run",
  "--disable-gpu",
  "--use-fake-ui-for-media-stream",
  "--use-fake-device-for-media-stream",
  "--disable-sync",
  "--disable-dev-shm-usage",
  "--remote-debugging-port=9222",
];
chromeOptions.addArguments(...chromeFlags);
(async () => {
  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(chromeOptions)
    .build();
  try {
    await driver.get("https://www.google.com");
    const title = await driver.getTitle();
    console.log("Titlu website: ", title);
    const screenShot_strBase64 = await driver.takeScreenshot();
    await fs.writeFile(
      path.join(__dirname, "../screenshots/google.png"),
      screenShot_strBase64,
      "base64"
    );
  } finally {
    await driver.quit();
  }
})().catch((e) => console.log(e));
