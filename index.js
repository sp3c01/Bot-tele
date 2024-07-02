const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');
const moment = require('moment-timezone');

const TOKEN = '7128149289:AAEP6PDESreq2ZuUYETKeyBGqnYhoGOL02U';

const TIMEZONE = 'America/Sao_Paulo';

const bot = new TelegramBot(TOKEN, { polling: true });

bot.on('polling_error', (error) => {
  console.error(`Polling error: ${error.code} - ${error.message}`);
});

bot.on('message', (msg) => {
  console.log(`Received message from ${msg.chat.id}: ${msg.text}`);
});

const mediaData = [
  // Segunda-feira
  {
    path: path.join(__dirname, 'videos', 'segunda_video1.mp4'),
    text: `Vem ver meu primo dotado gozando dentro da minha bucetinha apertadinha🥵💦

Vídeo completo de 20 minutos no meu Grupo Vip, clique no botão abaixo⬇️`,
    schedule: '06:46',
    dayOfWeek: 1 
  },
  {
    path: path.join(__dirname, 'videos', 'segunda_video2.mp4'),
    text: `Último dia de promoção!!!! 

De R$67,90 Por apenas R$11,90👇🏻🥵💦`,
    schedule: '11:57',
    dayOfWeek: 1  
  },
  {
    path: path.join(__dirname, 'videos', 'segunda_video3.mp4'),
    text: `Postei o vídeo completo de 10 minuto no meu grupo vip, vem conferir amor🤤💦👇🏻👇🏻`,
    schedule: '18:34',
    dayOfWeek: 1  
  },
  {
    path: path.join(__dirname, 'imagens', 'segunda_foto1.jpg'),
    text: `Gravei um vídeo com meu primo dotado gozando dentro da minha bucetinha💦🤤🔥`,
    schedule: '22:35',
    dayOfWeek: 1  
  },
  // Terça-feira
  {
    path: path.join(__dirname, 'videos', 'terca_video1.mp4'),
    text: `Vem ver eu brincando com minha bucetinha rosinha no meu grupo vip🙈🔥

Clique no botão abaixo para ver o vídeo completo sem censura⬇️`,
    schedule: '12:48',
    dayOfWeek: 2 
  },
  {
    path: path.join(__dirname, 'videos', 'terca_video2.mp4'),
    text: `Chupei meu primo até ele gozar na minha boquinha🥵🤭 Postei o vídeo completo no vip👇🏻👇🏻🤍`,
    schedule: '11:57',
    dayOfWeek: 2 
  },
  // Quarta-feira
  {
    path: path.join(__dirname, 'videos', 'quarta_video1.mp4'),
    text: `Ele me comeu gostoso e ainda gozou na minha boquinha, vem ver o vídeo completo no vip👇🏻👇🏻🤤💦`,
    schedule: '06:46',
    dayOfWeek: 3 
  },
  {
    path: path.join(__dirname, 'videos', 'quarta_video2.mp4'),
    text: `namorado da minha amiga colocou os 23centimetros dele dentro de mim 🥺🤤, vem ver o vídeo completo sem censura de 12 minutos no meu vip👇🏻👇🏻🤍`,
    schedule: '11:57',
    dayOfWeek: 3 
  },
  {
    path: path.join(__dirname, 'videos', 'quarta_video3.mp4'),
    text: `namorado da minha amiga colocou os 23centimetros dele dentro de mim 🥺🤤, vem ver o vídeo completo sem censura de 12 minutos no meu vip👇🏻👇🏻🤍`,
    schedule: '18:34',
    dayOfWeek: 3 
  },
  {
    path: path.join(__dirname, 'imagens', 'quarta_foto1.jpg'),
    text: `Já pensou em me ver algemada, sendo bastante usada e tratada como uma boa putinha obediente, esse vídeo tem 7 minutos de puro tesão, postei completinho no meu VIP 🤤💦`,
    schedule: '22:35',
    dayOfWeek: 3 
  },
  // Quinta-feira
  {
    path: path.join(__dirname, 'videos', 'quinta_video1.mp4'),
    text: `Postei vários vídeos rebolando sem calcinha no meu VIP, vem ver tudinho amor🙈💦

Aproveita a promoção👇🏻`,
    schedule: '06:46',
    dayOfWeek: 4 
  },
  {
    path: path.join(__dirname, 'videos', 'quinta_video2.mp4'),
    text: `Vídeo completo de 7 minutos no meu Grupo Vip!❤️‍🔥

Vem ver esse vídeo e vários outros de 10 minutos no meu Grupo Vip, corra e aproveite a promoção de R$ 12,90

Esse valor somente hoje, depois ele voltará para o valor original de 78,90‼️👇🏻`,
    schedule: '11:57',
    dayOfWeek: 4 
  },
  {
    path: path.join(__dirname, 'imagens', 'quinta_foto1.jpg'),
    text: `Aproveita que meu VIP tá em promoção❤️‍🔥

Vem ver oque eu ando aprontando no VIP🙈🔥`,
    schedule: '18:34',
    dayOfWeek: 4  
  },
  // Sexta-feira
  {
    path: path.join(__dirname, 'imagens', 'sexta_foto1.jpg'),
    text: `Vem me ver brincando com minha bucetinha rosinha e apertadinha😋💦

Mais de 400 midias, clique no botão abaixo👇🏻`,
    schedule: '06:46',
    dayOfWeek: 5 
  },
  {
    path: path.join(__dirname, 'imagens', 'sexta_foto2.jpg'),
    text: `Vem ver o vídeo completo do meu primo dotado gozando dentro da minha bucetinha apertadinha🥵💦

Postei o vídeo completo de 15 minutos no Vip👇🏻❤️‍🔥`,
    schedule: '11:57',
    dayOfWeek: 5  
  },
  {
    path: path.join(__dirname, 'videos', 'sexta_video1.mp4'),
    text: `Vem ver eu brincando com minha bucetinha apertadinha no meu Vip amor❤️🙈

Comprando meu Vip você terá acesso ao meu WhatsApp, vou virar sua putinha😇

Corra e aproveite a promoção de 78,90 por R$ 12,90👇🏻👇🏻`,
    schedule: '18:34',
    dayOfWeek: 5  
  }
];

const enviarMidia = (chatId, mediaPath, mensagem) => {
  console.log(`Enviando mídia: ${mediaPath}`);
  
  if (!fs.existsSync(mediaPath)) {
    console.error('O arquivo de mídia não existe:', mediaPath);
    return;
  }
  
  if (path.extname(mediaPath) === '.jpg' || path.extname(mediaPath) === '.jpeg' || path.extname(mediaPath) === '.png') {
    bot.sendPhoto(chatId, fs.readFileSync(mediaPath), { caption: mensagem, reply_markup: { inline_keyboard: [[{ text: 'Assinar VIP R$ 12,90', url: 'https://t.me/+UTOOCOOl3Cw4ZDdh' }]] } })
      .then(() => {
        console.log(`Foto enviada para ${chatId}`);
      })
      .catch(err => {
        console.error('Erro ao enviar a foto:', err);
      });
  } else {
    bot.sendVideo(chatId, fs.createReadStream(mediaPath), { caption: mensagem, reply_markup: { inline_keyboard: [[{ text: 'Assinar VIP R$ 12,90', url: 'https://t.me/+UTOOCOOl3Cw4ZDdh' }]] } })
      .then(() => {
        console.log(`Vídeo enviado para ${chatId}`);
      })
      .catch(err => {
        console.error('Erro ao enviar o vídeo:', err);
      });
  }
};

const verificarHorario = () => {
  const now = moment().tz(TIMEZONE);
  const diaSemana = now.day(); // 0 (Domingo) a 6 (Sábado)
  const horaAtual = now.format('HH:mm');
  console.log(`Hora atual no fuso horário ${TIMEZONE}: ${horaAtual}`);
  
  const mediaAgendadas = mediaData.filter(media => media.schedule === horaAtual && media.dayOfWeek === diaSemana);
  
  return mediaAgendadas.length > 0 ? mediaAgendadas[0] : null;
};

const main = () => {
  console.log('Iniciando verificação de horários...');
  setInterval(() => {
    const mediaParaEnviar = verificarHorario();
    if (mediaParaEnviar) {
      console.log(`É ${mediaParaEnviar.schedule}, enviando mídia...`);
      enviarMidia('-1002239256038', mediaParaEnviar.path, mediaParaEnviar.text);
    } else {
      console.log('Ainda não é o horário de enviar mídia. Aguardando...');
    }
  }, 60000);
};

main();
