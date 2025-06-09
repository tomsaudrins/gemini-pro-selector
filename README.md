# Gemini Pro Default Chrome Extension

This Chrome extension automatically selects the "Gemini 2.5 Pro" model on the Gemini web app (https://gemini.google.com/app).

## How to Install

1.  Open Google Chrome.
2.  Navigate to `chrome://extensions`.
3.  Enable "Developer mode" by clicking the toggle switch at the top right of the page.
4.  Click on the "Load unpacked" button that appears.
5.  In the file selection dialog, select the directory where you have saved the extension files (`manifest.json` and `content.js`).
6.  The extension "Gemini Pro Default" should now appear in your list of extensions.

## How it Works

The extension uses a content script that runs on the Gemini web app page. It checks the currently selected model, and if it's not "2.5 Pro (preview)", it automatically clicks the model selector and chooses the correct model for you.
