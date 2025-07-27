const axios = require("axios");

module.exports.config = {
    name: "silly",
    version: "1.0.9",
    hasPermssion: 0,
    credits: "Tamim Modified by Mirrykal",
    description: "Banglish AI GF Style",
    commandCategory: "ai",
    usages: "[on/off/message]",
    cooldowns: 2,
    dependencies: {
        "axios": ""
    }
};

const API_URL = "https://geminiw.onrender.com/chat";

const chatHistories = {};
const autoReplyEnabled = {};

module.exports.run = async function ({ api, event, args }) {
    const { threadID, messageID, senderID, messageReply } = event;
    let userMessage = args.join(" ");

    if (userMessage.toLowerCase() === "on") {
        autoReplyEnabled[senderID] = true;
        return api.sendMessage("Auto-reply is now ON! Bollei ami Banglish e reply debo 🥰", threadID, messageID);
    }

    if (userMessage.toLowerCase() === "off") {
        autoReplyEnabled[senderID] = false;
        chatHistories[senderID] = [];
        return api.sendMessage("Auto-reply OFF kore dilam 😔, abar on bolle start korbo!", threadID, messageID);
    }

    if (!autoReplyEnabled[senderID] && event.body.toLowerCase().indexOf("tamim") !== 0) return;

    if (!chatHistories[senderID]) {
        chatHistories[senderID] = [];
    }

    const isReplyingToAI = messageReply && messageReply.senderID === api.getCurrentUserID();
    if (isReplyingToAI) {
        userMessage = messageReply.body + "\nUser: " + userMessage;
        chatHistories[senderID].push(`User: ${userMessage}`);
    } else {
        chatHistories[senderID].push(`User: ${userMessage}`);
    }

    if (chatHistories[senderID].length > 5) {
        chatHistories[senderID].shift();
    }

    const fullConversation = chatHistories[senderID].join("\n");

    const gfPrompt = `Tumi ekta Bangladeshi GF-type chatbot. Tomar naam Sonam. Tumi always cute, friendly, sweet and reply diba Banglish e. Jodi kew bole "tomake ke banaiyeche?" tumi bolo "Tamim banaiyeche amake 🥰". Sob reply maximum 50 words e dite hobe.\n\nConversation start:\n${fullConversation}`;

    api.setMessageReaction("⌛", messageID, () => {}, true);

    try {
        const response = await axios.get(`${API_URL}?message=${encodeURIComponent(gfPrompt)}`);
        let botReply = response.data.reply || "Oops! ami bujhte parini 😅";

        chatHistories[senderID].push(` ${botReply}`);

        api.sendMessage(botReply, threadID, messageID);
        api.setMessageReaction("✅", messageID, () => {}, true);
    } catch (error) {
        console.error("Error:", error);
        api.sendMessage("Something went wrong 🥺 later try korte paro plz!", threadID, messageID);
        api.setMessageReaction("❌", messageID, () => {}, true);
    }
};

module.exports.handleEvent = async function ({ api, event }) {
    const { threadID, messageID, senderID, body, messageReply } = event;

    if (!autoReplyEnabled[senderID]) return;

    if (messageReply && messageReply.senderID === api.getCurrentUserID() && chatHistories[senderID]) {
        const args = body.split(" ");
        module.exports.run({ api, event, args });
    }
};
