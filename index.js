//ASWIN SPARKY ✅

const express = require("express");
const app = express();
const { toBuffer } = require("qrcode");
const pino = require("pino");
const fs = require("fs-extra");
const crypto = require("crypto");
const { default: makeWASocket, useMultiFileAuthState, Browsers, delay, makeInMemoryStore, makeCacheableSignalKeyStore } = require("@whiskeysockets/baileys");
const PORT = process.env.PORT || 3000;
const axios = require("axios");
const fetch = require("node-fetch");
const { exec } = require("child_process")
//
app.get("/", (req, res) => {
  res.sendFile(__dirname+"/home/pair.html");
});
//
if (fs.existsSync('./session')) {
   fs.emptyDirSync(__dirname + '/session');
};
console.log("folder cleaned");

app.get('/pairing', async (req, res) => {
    let num = req.query.number;
        async function sparkyPair() {
        const {
            state,
            saveCreds
        } = await useMultiFileAuthState(`./session`)
     try {
            let sparky = makeWASocket({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({level: "fatal"}).child({level: "fatal"})),
                },
                printQRInTerminal: false,
                logger: pino({level: "fatal"}).child({level: "fatal"}),
                browser: [ "Ubuntu", "Chrome", "20.0.04" ],
             });
             if(!sparky.authState.creds.registered) {
                await delay(1500);
                        num = num.replace(/[^0-9]/g,'');
                            const code = await sparky.requestPairingCode(num)
                 if(!res.headersSent){
                 await res.send({code});
                     }
                 }
            sparky.ev.on('creds.update', saveCreds)
            sparky.ev.on("connection.update", async (s) => {
                const {
                    connection,
                    lastDisconnect
                } = s;
                if (connection == "open") {
                await delay(10000);
                    const sessionsparky = fs.readFileSync('./session/creds.json');
                    const output = await axios.post('http://paste.c-net.org/',`${sessionsparky}`, {headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
            //
            let c = output.data.split('/')[3];
            await delay(1000) 
            let session_id  = await sparky.sendMessage(sparky.user.id, { 
               text: 'ANDYMRLIT-USA:'+c.trim()
            })
            //session quarted sender 
            let cc = `*⚠️ Bro I AM ANDY MRLIT I'm going to tell you something, you must not share *your session id* with any other person under any circumstances, you know they can have access to your WhatsApp messages, so be careful 😊, and then, don't worry bro, your account heroku will not be banned our bot is safe*.\n\n*Web :* *https://sukunaweb.onrender.com*\n\n\n*BY TEAM MRLIT 🥴*`;
            await sparky.sendMessage(sparky.user.id, { text: cc }, { quoted: session_id });
		//creds.json	
	 //const sparkyses = await sparky.sendMessage(sparky.user.id, { document: sessionsparky, mimetype: `application/json`, fileName: `creds.json` });
			
		
				await sparky.sendMessage(sparky.user.id, { text: `_*Thanks for choosing sukunabot*_

*REPO*
https://github.com/ralphbro/sukuku
            
            
*ᴊᴏɪɴ sᴜᴘᴘᴏʀᴛ ɢʀᴏᴜᴘ ғᴏʀ ᴍᴏʀᴇ ϙᴜᴇʀʏ*
https://chat.whatsapp.com/LZojfM2mEFL9ibw9r7Yn0K
            
*Cʜᴀɴɴᴇʟ ʟɪɴᴋ*
https://whatsapp.com/channel/0029VaKBCh58V0trY4tQfv3o
            
            
*All Creator 😌:*
Zwing Maxy : https://wa.me/13479270863
Andy Mr lit : https://wa.me/13056978303
Sparky India : https://wa.me/917012984396
            
*Heroku Deployment link:*
coming 🔜            

You know what my friend, 🙃 this bot is the best robot created by the *mrlit team* almost all the options have already been tested, so the bot is under development if you find an error contact us 🤗
            
*©ANDY MR LIT*` }, {quoted: session_id});

	await delay(3000);
        return await fs.emptyDirSync(__dirname + '/session');
			//
await console.log("_Restarting..._");
        exec("npm restart", (error, stdout, stderr) => {
            if (error) {
                return console.log(`Error: ${error}`);
            } return;
        });
			//
        process.exit(0)
            } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10000);
                    sparkyPair();
                }
            });
        } catch (err) {
            console.log("service restated");
            await fs.emptyDirSync(__dirname + '/session');
         if(!res.headersSent){
            await res.send({code:"Service Unavailable"});
         }
        }
    }
    return await sparkyPair()
});
//
app.listen(PORT, () => console.log("App listened on port", PORT));                
