const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');
const moment = require('moment-timezone');

const TOKEN = '7128149289:AAEP6PDESreq2ZuUYETKeyBGqnYhoGOL02U'; // Substitua pelo seu token do Telegram
const TIMEZONE = 'America/Sao_Paulo';

const bot = new TelegramBot(TOKEN, { polling: true });

// Configurações do Express
const app = express();
const port = process.env.PORT || 3000;

// Rota para verificar se o servidor está ativo
app.get('/', (req, res) => {
    res.send('<h1>Servidor do bot está ativo!</h1>');
});

// Rota para receber atualizações do bot (Webhook)
app.post(`/bot${TOKEN}`, express.json(), (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

// Iniciar o servidor Express
app.listen(port, () => {
    console.log(`Servidor do bot está rodando na porta ${port}`);
});

// Tratamento de erros do bot
bot.on('polling_error', (error) => {
    console.error(`Erro no polling: ${error.message}`);
});

bot.on('webhook_error', (error) => {
    console.error(`Erro no webhook: ${error.message}`);
});

// Lógica de envio de mídia agendada
const mediaData = [
    // Defina suas informações de mídia aqui conforme necessário
];

const enviarMidia = (chatId, mediaPath, mensagem) => {
    console.log(`Enviando mídia: ${mediaPath}`);
  
    if (!fs.existsSync(mediaPath)) {
        console.error('O arquivo de mídia não existe:', mediaPath);
        return;
    }
  
    if (path.extname(mediaPath) === '.jpg' || path.extname(mediaPath) === '.jpeg' || path.extname(mediaPath) === '.png') {
        bot.sendPhoto(chatId, fs.readFileSync(mediaPath), { caption: mensagem })
            .then(() => {
                console.log(`Foto enviada para ${chatId}`);
            })
            .catch(err => {
                console.error('Erro ao enviar a foto:', err);
            });
    } else {
        bot.sendVideo(chatId, fs.createReadStream(mediaPath), { caption: mensagem })
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

// Intervalo para verificar horários a cada minuto
setInterval(() => {
    const mediaParaEnviar = verificarHorario();
    if (mediaParaEnviar) {
        console.log(`É ${mediaParaEnviar.schedule}, enviando mídia...`);
        enviarMidia('-1002239256038', mediaParaEnviar.path, mediaParaEnviar.text);
    } else {
        console.log('Ainda não é o horário de enviar mídia. Aguardando...');
    }
}, 60000);
