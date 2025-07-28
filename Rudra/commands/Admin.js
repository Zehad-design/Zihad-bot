module.exports.config = {
  name: "admin",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "PREM BABU",
  description: "Friends Dp photos",
  commandCategory: "Random-IMG",
  usages: "bestie dp",
  cooldowns: 2,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }
    
};

module.exports.run = async({api,event,args,Users,Threads,Currencies}) => {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
    var link = [
"https://ibb.co/SDtvYzBx"
    ];
     var callback = () => api.sendMessage({body:`❤️𝐀𝐃𝐌𝐈𝐍 𝐈𝐍𝐅𝐎❤️

  🍒 ཫ༄𝗠𝗱 𝗧𝗮𝗺𝗶𝗺🥀•𝔸𝕟𝕕 ℤ𝕚𝕙𝕒𝕕

𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐋𝐢𝐧𝐤 https://www.facebook.com HERE : ℙ𝕣𝕚𝕧𝕒𝕥𝕖

𝐖𝐡𝐚𝐭𝐬𝐚𝐩𝐩 𝐂𝐨𝐧𝐭𝐚𝐜𝐭 : 𝗣𝗿𝗶𝘃𝗮𝘁𝗲`,attachment: fs.createReadStream(__dirname + "/cache/1.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.jpg"));  
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/1.jpg")).on("close",() => callback());
   };
