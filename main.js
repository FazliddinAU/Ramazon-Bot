// 🕊🍃بِسْـــــــــــمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْم
const TelegramBot = require('node-telegram-bot-api');
const token = '7580257962:AAE-8Un8ZfWVY2GH5r_5jGrpfcoi3DCfXsA';
const admin = '6584495426';
const { getRamazonTimes } = require('./request');
const { createCanvas, loadImage, registerFont} = require('canvas');
const fs = require('fs');
const axios = require('axios');
const path = require('path');
const bot = new TelegramBot(token, { polling: true });

function getCurrentTime() {
  let now = new Date();
  let hours = now.getHours().toString().padStart(2, '0');
  let minutes = now.getMinutes().toString().padStart(2, '0');
  let seconds = now.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

const shaharlar = {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: '🌏Toshkent viloyati',
          callback_data: 'Bekobod'
        },
        {
          text : '🌏Toshkent',
          callback_data: 'Toshkent'
        },
      ],
      [
        {
          text: '🌏Guliston',
          callback_data: 'Guliston'
        },
        {
          text : 'Andijon',
          callback_data : 'Andijon'
        }
      ],
      [
        {
          text: '🌏Jizzax',
          callback_data: 'Jizzax'
        },
        {
            text : '🌏Buxoro',
            callback_data : 'Buxoro'
        }
      ],
      [
        {
            text: '🌏Qashqadaryo',
            callback_data : 'Qarshi'
        },
        {
            text : '🌏Navoiy',
            callback_data: 'Navoiy'
        }
      ],
      [
        {
            text : '🌏Namangan',
            callback_data : 'Namangan'
        },
        {
            text : '🌏Samarqand',
            callback_data : 'Samarqand'
        }
      ],
      [
        {
            text : '🌏Surxondaryo',
            callback_data : 'Termiz'
        },
        {
            text : `🌏Farg'ona`,
            callback_data : 'Rishton'
        }
      ],
      [
        {
            text : '🌏Xorazm',
            callback_data : 'Xiva'
        },
        {
            text : `🌏Qoraqalpog'iston`,
            callback_data : 'Nukus'
        }
      ]
    ]
  }
};
const rasmlar = {
  reply_markup : {
    inline_keyboard: [
      [{text : '👳🏻‍♂️Erkaklar uchun', callback_data : 'erkak_rasm'},{text : '🧕🏻Ayollar uchun', callback_data : 'ayol_rasm'}],
      [{text : '👦🏻Bolalar uchun', callback_data : 'bola_rasm'}]
    ]
  }
}
const reklama = {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: `👥Guruhga qo'shish`,
          url: 'https://t.me/Ramazon1446Bot?startgroup=on&admin=change_info+delete_messages+restrict_members+pin_messages+manage_video_chats+promote_members+invite_users'
        }
      ],
      [
        {
          text: '⤴️Yaqinlarga yuborish',
          url: 'https://t.me/share/url?url=t.me/Ramazon1446Bot%0D%0A%20✨ @uzf_work%20sizni va%20oila a\'zolaringizni%20Ramazon oyi%20bilan%20tabriklaydi!😊'
        }
      ]
    ]
  }
};

bot.on('message', async (message) => {
  try {
    const chatId = message.chat.id;
    const name = message.from.first_name;
    if (message.text === '/start') {
      const inline = {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: `🌙Joylashuv belgilash`,
                callback_data: 'joylashuv'
              }
            ],
            [
              {
                text: `✨Tabriknoma yasash`,
                callback_data: 'tabrik'
              },
            ],
            [
              {
                text: '🎧Nashidalar',
                callback_data: 'nashida'
              }
            ],
            [
              {
                text: '🍃Bot haqida fikringiz',
                callback_data: 'fikri'
              }
            ]
          ]
        }
      };
      const photoUrl = 'https://www.google.com/imgres?q=ramadan%20background%20hd&imgurl=https%3A%2F%2Ft3.ftcdn.net%2Fjpg%2F04%2F89%2F37%2F24%2F360_F_489372447_5niHtl1GUPhOsDDcAxBAQ3xTFkQnNix1.jpg&imgrefurl=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3D%2522ramadan%2Bbackground%2522&docid=ddA47lrv7JD6QM&tbnid=ukGCD19OeW8fbM&vet=12ahUKEwje9u6M_K6LAxVmIxAIHZ-FKGEQM3oECFEQAA..i&w=639&h=360&hcb=2&ved=2ahUKEwje9u6M_K6LAxVmIxAIHZ-FKGEQM3oECFEQAA';

      await bot.sendPhoto(chatId, photoUrl, {
        caption: `<b>Assalomu alaykum ${name} botimizga xush kelibsiz!</b>\n\n<i>Botimiz orqali Ramazon vaqtlari haqida ma'lumot olishingiz mumkin.</i>`,
        parse_mode: 'HTML',
        reply_markup: inline.reply_markup
      });
    }
  } catch (error) {
    console.log(error);
  }
});
bot.on('callback_query', async (callbackQuery) =>{
    try{
        const chatId = callbackQuery.message.chat.id;
    const callbackData = callbackQuery.data;
    const VideoPath = path.join(__dirname, 'img', 'ramazon.mp4');
    const audioPath = path.join(__dirname, 'img', 'Ramazon Nashidasi.mp3')
    if(callbackData === 'nashida'){
        await bot.sendVideo(chatId, VideoPath,{
            caption : `🫀<b>Ramazon nashidasi | Muhammad Ayyub qori va «Jannat bulbullari» guruhi</b>\n\n<i>🔹Manba : @islomuz</i>`,
            parse_mode : 'HTML',
            reply_markup: reklama.reply_markup
        })
        await bot.sendAudio(chatId, audioPath,{
            caption : `🫀<b>Ramazon nashidasi | Muhammad Ayyub qori va «Jannat bulbullari» guruhi</b>\n\n<i>🔹Manba : @islomuz</i>`,
            parse_mode : 'HTML',
            reply_markup: reklama.reply_markup
        })
    }
    }catch(error){
        console.log(error+"");
    }
})
const qaytaBoshlash = {
    reply_markup : {
        inline_keyboard :[
            [
                {
                    text : 'ADMIN',
                    url : 'https://t.me/FAZLIDDIN_AU'
                }
            ]
        ]
    }
  }
let isCallbackActive = false; 
bot.on('callback_query', async (callbackQuery) => {
  try {
    const chatId = callbackQuery.message.chat.id;
    const callbackData = callbackQuery.data;
    if (callbackData === 'fikri') {
      isCallbackActive = true; 
      await bot.sendMessage(chatId, `<b>🤖Bot haqida fikringizni yozib qoldiring:</b>\n\n<i>❗Xatolar bo'lsa yoki takliflaringiz bo'lsa yozib qoldiring, biz bundan xursand bo'lamiz.</i> \n\n<b><i>🔹Hamkorlik uchun kanallarni ham taklif qilamiz</i></b>\n<tg-spoiler><b><blockquote><i>   Biznig kanal : @fa_live</i></blockquote></b></tg-spoiler>`, {
        parse_mode: 'HTML',
        reply_markup: qaytaBoshlash.reply_markup
      });
    }
    if (callbackData === 'tabrik' || callbackData === 'joylashuv') {
    }
  } catch (error) {
    console.log(error);
    await bot.sendMessage(chatId, `Xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko'ring.`);
  }
});
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  if (isCallbackActive) {
    const chatId = msg.chat.id;
    const userMessage = msg.text; 
    const userPhoto = msg.photo ? msg.photo[msg.photo.length - 1].file_id : null; 
    const userVideo = msg.video ? msg.video.file_id : null; 
    const userAudio = msg.audio ? msg.audio.file_id : null; 
    const userVoice = msg.voice ? msg.voice.file_id : null; 
    let content = `Foydalanuvchi: ${msg.from.first_name} \nID: ${msg.from.id}\nUsername: @${msg.from.username}`;
    if (userMessage) {
      content += `\nFikri: ${userMessage}`;
    }
    if (userPhoto) {
      content += `\nRasm: ${userPhoto}`;
    }
    if (userVideo) {
      content += `\nVideo: ${userVideo}`;
    }
    if (userAudio) {
      content += `\nAudio: ${userAudio}`;
    }
    if (userVoice) {
      content += `\nOvozli xabar: ${userVoice}`;
    }
    await bot.sendMessage(admin, content);
    await bot.sendMessage(chatId, '<b>Xabaringiz uchun tashakkur, tez orada aloqaga chiqamiz😊</b>\n\n<i>@uzf_work jamoasi nomidan</i>',{
      parse_mode : 'HTML',
    });
    isCallbackActive = false; 
  }
});
isActive = false;
bot.on('callback_query', async (callbackQuery) => {
  try {
    const chatId = callbackQuery.message.chat.id;
    const callbackData = callbackQuery.data;
    if (callbackData === 'tabrik') {
      isActive = true;
      await bot.sendMessage(chatId, `<b><i>🖼Tabriknoma kim uchun tanlang🖋:</i></b>`, {
        parse_mode: 'HTML',
        reply_markup:rasmlar.reply_markup
      });
    }
    if (callbackData === 'erkak_rasm') {
      await bot.sendMessage(chatId, "🔹<b>Iltimos, erkaklar uchun tabriknomani tayyorlash uchun ismingizni kiriting:</b>",{
        parse_mode:'HTML'
      });
      bot.once('message', async (msg) => {
        const name = msg.text;  
        await createAndSendImage(chatId, name, "erkak"); 
      });
    }
    if (callbackData === 'ayol_rasm') {
      await bot.sendMessage(chatId, "🔹<b>Iltimos, ayollar uchun tabriknomani tayyorlash uchun ismingizni kiriting:</b>",{
        parse_mode:'HTML'
      });
      bot.once('message', async (msg) => {
        const name = msg.text; 
        await createAndSendImage(chatId, name, "ayol");  
      });
    }
    if (callbackData === 'bola_rasm') {
      await bot.sendMessage(chatId, "🔹<b>Iltimos, bolalar uchun tabriknomani tayyorlash uchun ismingizni kiriting:</b>",{
        parse_mode:'HTML'
      });
      bot.once('message', async (msg) => {
        const name = msg.text; 
        await createAndSendImage(chatId, name, "bola"); 
      });
    }
    let user = {};
    if (callbackData === 'joylashuv') {
      await bot.sendMessage(chatId, `<b>Iltimos, o'zingizning hududingizni tanlang:</b>`, {
        reply_markup: shaharlar.reply_markup,
        parse_mode: 'HTML'
      });
    } else if (['Bekobod', 'Toshkent', 'Guliston', 'Jizzax','Buxoro','Qarshi','Navoiy','Namangan','Samarqand','Termiz','Rishton','Xiva','Nukus','Andijon'].includes(callbackData)) {
      user[chatId] = {
        location: callbackData
      };
      const region = callbackData;
      const vaqtlar = await getRamazonTimes(region);
      if (vaqtlar) {
        const messageText = 
        `<b>${region} uchun | 🍃Ramazon taqvimi
<blockquote>🌅 Saharlik - ${vaqtlar.tong}</blockquote>
Ro‘za tutish (saharlik, og‘iz yopish) duosi:

نَوَيْتُ أَنْ أَصُومَ صَوْمَ شَهْرَ رَمَضَانَ مِنَ الْفَجْرِ إِلَى الْمَغْرِبِ، خَالِصًا لِلهِ تَعَالَى أَللهُ أَكْبَرُ

Navaytu an asuvma sovma shahri ramazona minal fajri ilal mag‘ribi, xolisan lillahi ta’aalaa Allohu akbar.

Ma’nosi: Ramazon oyining ro‘zasini subhdan to kun botguncha tutmoqni niyat qildim. Xolis Alloh uchun Alloh buyukdir.

<blockquote>🌜 Iftorlik - ${vaqtlar.shom}</blockquote>
Iftorlik (og'iz ochish) duosi:

اَللَّهُمَّ لَكَ صُمْتُ وَ بِكَ آمَنْتُ وَ عَلَيْكَ تَوَكَّلْتُ وَ عَلَى رِزْقِكَ أَفْتَرْتُ، فَغْفِرْلِى مَا قَدَّمْتُ وَ مَا أَخَّرْتُ بِرَحْمَتِكَ يَا أَرْحَمَ الرَّاحِمِينَ

Allohumma laka sumtu va bika aamantu va a'layka tavakkaltu va a'laa rizqika aftartu, fag'firliy ma qoddamtu va maa axxortu birohmatika yaa arhamar roohimiyn.

${vaqtlar.hozir} | ${vaqtlar.vaqti} | ${vaqtlar.hijriy_day}-${vaqtlar.hijriy} oyi | ${getCurrentTime()}
</b>`
        ;
        const upPhoto = './img/asos.jpg';
        const vaqti_uchun = {
          reply_markup : {
            inline_keyboard :[
              [
                {
                  text : '🔹Manba',
                  url  : 'https://t.me/muslimuzportal'
                }
              ]
            ]
          }
        }
        await bot.editMessageReplyMarkup({ inline_keyboard: [] }, { chat_id: chatId, message_id: callbackQuery.message.message_id });
        await bot.deleteMessage(chatId, callbackQuery.message.message_id);
        await bot.sendPhoto(chatId, upPhoto, {
          caption: messageText,
          parse_mode: 'HTML',
          reply_markup: vaqti_uchun.reply_markup
        });
      } else {
        await bot.sendMessage(chatId, 'Bu region uchun ma\'lumot topilmadi. Iltimos, boshqa regionni tanlang.');
      }
    }
    await bot.editMessageReplyMarkup({ inline_keyboard: [] }, { chat_id: chatId, message_id: callbackQuery.message.message_id });
    await bot.deleteMessage(chatId, callbackQuery.message.message_id);
    async function createAndSendImage(chatId, name, category) {
      const canvas = createCanvas(1024, 1080);
      const ctx = canvas.getContext('2d');

      let imagePath;
      if (category === 'erkak') {
        imagePath = path.join(__dirname, 'img', 'erkaklar.jpg'); 
      } else if (category === 'ayol') {
        imagePath = path.join(__dirname, 'img', 'ayollar.jpg'); 
      } else if (category === 'bola') {
        imagePath = path.join(__dirname, 'img', 'bolalar.jpg'); 
      }
      registerFont(path.join(__dirname, 'img', 'Hoefler Text Medium.otf'), { family: 'Hoefler Text Medium' });
      loadImage(imagePath).then((image) => {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        ctx.font = '66px "Hoefler Text Medium"';
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgb(255, 255, 255)';  
        ctx.shadowBlur = 10;                    
        ctx.shadowOffsetX = 5;                 
        ctx.shadowOffsetY = 5; 
        ctx.fillText(`${name} siz uchun`, canvas.width / 2, canvas.height / 2);
        ctx.font = '60px "Hoefler Text Medium"';
        ctx.shadowColor = 'rgba(68, 3, 3, 0.7)';  
        ctx.shadowBlur = 10;                    
        ctx.shadowOffsetX = 5;                 
        ctx.shadowOffsetY = 5; 
        ctx.fillStyle = 'white';
        if (category === "erkak") {
          ctx.fillText(`    Yaqinlaringizni qiling ziyorat,
    O'qigan namozingiz bo'lsin ijobat.
    Eng yaxshi ishingiz bo'lsin ibodat,
    Ramazon oyingiz bo'lsin muborak!`, canvas.width / 2, canvas.height / 2 - 300);
        } else if (category === "ayol") {
ctx.fillText(`Qalbimizda chiroyli tilak,
              Savoblardan bersin darak.
              Sizga izhor aylayman istak,
Ramazon oyi bo'lsin muborak`, canvas.width / 2, canvas.height / 2 - 300);
          
// Qalbimizda chiroyli tilak,
// Savoblardan beradi darak.
// Sizga izhor ayladim istak,
// Ramazon oyi bolsin muborak!!!
        } else if (category === "bola") {
          ctx.fillText(`Bu kunlarni g'animat bilgin,
Qaytarilmas bu kun hech on
Shirkdan o'zingni yiroqda tutgin,
Jannat bizlarga bo'lmasin armon.`, canvas.width / 2, canvas.height / 2 - 300);
        }
        const out = fs.createWriteStream(__dirname + '/output-image.png');
        const stream = canvas.createPNGStream();
        stream.pipe(out);
        out.on('finish', async () => {
          console.log('Rasm muvaffaqiyatli yasaldi!');
          await bot.sendPhoto(chatId, __dirname + '/output-image.png', {
            caption:` <blockquote><b>👤: ${name} uchun tabriknoma tayyor bo'ldi</b></blockquote>\n\n<b><i>🫂O'ziga yuborib qo'ying, ularni xursand qilish ajoyib xissiyotlarni sizga baxsh etadi📮</i></b>`,
            parse_mode: 'HTML',
            reply_markup: reklama.reply_markup
          });
        });
      });
    }
        isActive = false;
  } catch (error) {
    console.log(error);
  }
});