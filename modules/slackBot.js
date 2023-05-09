const { App } = require("@slack/bolt");
const dotenv = require('dotenv');
const { Dao } = require("./dao")

dotenv.config();
const dao = Dao()

const slackBot = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true, // enable the following to use socket mode
    appToken: process.env.APP_TOKEN
});

slackBot.command("/knowledge", async ({ command, ack, say }) => {
    try {
        await ack();
        const answer = `Yaaay! that command works! ${JSON.stringify(command.text)}`;
        say(answer);
        const result = await dao.Message.create({ question: command.text, answer: answer });
        console.log(result);
    } catch (error) {
        console.log("err")
        console.error(error);
    }
});

slackBot.message(/./, async ({ message, say }) => {
    try {
        // pull previous steps of conversation from db
        // add current step to db
        const thisStep = await dao.Message.create({ question: message.text, answer: "" });
        // run current step through GPT
        // add GPT response to db
        thisStep.answer = `What a lovely text of yours! ${JSON.stringify(message.text)}`;
        thisStep.save();
        // send to the user
        say(thisStep.answer);
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