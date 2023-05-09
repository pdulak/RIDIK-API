const { App } = require("@slack/bolt");
const dotenv = require('dotenv');

dotenv.config();

const slackBot = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true, // enable the following to use socket mode
    appToken: process.env.APP_TOKEN
});

slackBot.command("/knowledge", async ({ command, ack, say }) => {
    try {
        await ack();
        say(`Yaaay! that command works! ${JSON.stringify(command)}`);
    } catch (error) {
        console.log("err")
        console.error(error);
    }
});

slackBot.message(/ridik/, async ({ message, say }) => {
    try {
        say(`Ridik: ${JSON.stringify(message)}`);
    } catch (error) {
        console.log("err")
        console.error(error);
    }
});

(async () => {
    const slackPort = process.env.SLACK_PORT || 3001
    // Start your app
    await slackBot.start(slackPort);
    console.log(`⚡️ Slack Bolt app is running on port ${slackPort}!`);
})();

module.exports = slackBot;