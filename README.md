# Chrome Extension to Send Media Files and Text to Discord with a Right-Click

This is a Google Chrome extension that enables you to send images, gifs, text, and webm videos to a specified Discord channel via a Discord webhook.

## Prerequisites

- Google Chrome Browser: This extension only works on Google Chrome.
- Discord Webhook: You need to set up a Discord Webhook that the extension will use to send messages. Instructions for setting up a webhook are below.
- File Size Limit: The maximum size of the files to be sent is limited by Discord. It's 8MB for regular users and 50MB for Nitro users.

## Setting Up a Discord Webhook

1. **Go to your Discord server.** Open Discord, either on your web browser or the desktop app, and navigate to the server where you want the webhook to post.
2. **Open the Server Settings.** Click on the server name at the top of the screen to open a dropdown menu, then click on "Server Settings."
3. **Navigate to the 'Integrations' tab.** In the Server Settings window, click on the 'Integrations' tab on the left side of the screen.
4. **Open the 'Webhooks' page.** On the Integrations page, you'll see a Webhooks section. Click on the 'View Webhooks' button.
5. **Click 'Create Webhook'.** On the Webhooks page, click on the 'New Webhook' button.
6. **Configure your Webhook.** Give your new webhook a name (this can be anything you want), select which channel you want the webhook to post in, and upload an image if you want the webhook to have an avatar.
7. **Copy the Webhook URL.** Once you're done setting up your webhook, click the 'Copy' button next to the 'Webhook URL' field. This is the URL you will need to enter in the `background.js` file of the extension.
8. **Save your changes.** Click the 'Save' button at the bottom of the page to save your new webhook.


## Installation

1. **Clone this repository:** Clone or download this repository to your local machine.
2. **Edit `background.js`:** Open the `background.js` file in a text editor and replace the `WEBHOOK_URL` with your own Discord webhook URL. 


The JavaScript code you'll need to replace is as follows:

```javascript
// Change this to the URL of your Discord webhook
const WEBHOOK_URL = "https://discord.com/api/webhooks/your_webhook_here";
```

3. **Pack the extension:**
   - Open Google Chrome.
   - Navigate to chrome://extensions/.
   - Enable Developer mode by ticking the checkbox in the upper-right corner.
   - Click on the "Load unpacked" button.
   - Navigate to the root directory where you cloned or downloaded this repository and select it. The root directory is the one that contains the `manifest.json` and `background.js` files among others.
   - Select the directory where you cloned or downloaded this repository.
   
## Usage

To use the extension, right-click on an image, a text selection or a webm video on any webpage, and select the "Send to Discord" option from the context menu. The selected media or text will be sent to the Discord channel that corresponds to the webhook URL you specified.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
