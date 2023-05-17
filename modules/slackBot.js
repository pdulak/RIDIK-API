const { App } = require("@slack/bolt");
const dotenv = require('dotenv');
const { dao } = require("./dao")

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
        say('...');
        // pull previous steps of conversation from db
        const messages = await dao.sequelize.query(`
            select id, question, answer, createdAt, system from Messages
            where createdAt > datetime(datetime(), '-30 minutes')
            OR system`, { type: dao.QueryTypes.SELECT });
        say(JSON.stringify(messages));
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