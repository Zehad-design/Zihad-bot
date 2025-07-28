const axios = require("axios");
const request = require("request");
const fs = require("fs-extra");
const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "inf",
    version: "1.0.1",
    author: "Arun Kumar", // do not remove credits please
    countDown: 5,
    role: 0,
    shortDescription: "Bot and admin info",
    longDescription: "Display bot name, prefix, uptime, and owner info.",
    category: "info",
    guide: {
      en: "{pn}"
    }
  },

  onStart: async function ({ message, event, api }) {
    const time = process.uptime();
    const hours = Math.floor(time / (60 * 60));
    const minutes = Math.floor((time % (60 * 60)) / 60);
    const seconds = Math.floor(time % 60);
    const juswa = moment.tz("Asia/Dhaka").format("『D/MM/YYYY』 【HH:mm:ss】");

    const links = [
      "https://postimg.cc/jwtwJwdn",
      "https://postimg.cc/34mk6ryF"
    ];

    const path = __dirname + "/cache/juswa.jpg";

    const callback = () => {
      message.reply({
        body: `🌹 ADMIN AND BOT INFORMATION 🌺😇

☄️ BOT NAME ☄️ ⚔ ${global.config.BOTNAME} ⚔

🔥 OWNER 🔥: 𝐌𝐝 𝐓𝐚𝐦𝐢𝐦 
🔥 OWNER 2 🔥:𝐒 𝐳𝐢𝐡𝐚𝐝

📌 BOT PREFIX: ${global.config.PREFIX}

🕒 Date & Time: ${juswa}
⏱️ Uptime: ${hours}h ${minutes}m ${seconds}s

✅ Thanks for using ${global.config.BOTNAME} 🖤`,
        attachment: fs.createReadStream(path)
      }, () => fs.unlinkSync(path));
    };

    request(encodeURI(links[Math.floor(Math.random() * links.length)]))
      .pipe(fs.createWriteStream(path))
      .on("close", () => callback());
  }
};
