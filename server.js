// server.js - Backend simulado para enviar push notifications
// Em produção, você usaria um servidor real com web-push

class PushServer {
  constructor() {
    this.subscriptions = new Set();
  }

  // Adicionar subscription
  addSubscription(subscription) {
    this.subscriptions.add(JSON.stringify(subscription));
    console.log('Nova inscrição push adicionada');
  }

  // Enviar notificação para todos os subscribers
  async sendPushNotification(title, body) {
    const message = {
      title: title,
      body: body,
      icon: 'https://alexandre7888.github.io/ontono.exe/InShot_20251025_123921954.jpg',
      requireInteraction: true
    };

    this.subscriptions.forEach(async (sub) => {
      const subscription = JSON.parse(sub);
      
      // Em produção, você usaria a biblioteca web-push
      // Aqui é apenas uma simulação
      console.log('Enviando push para:', subscription.endpoint);
      console.log('Mensagem:', message);
    });
  }

  // Enviar notificações automáticas
  startAutoPush() {
    setInterval(() => {
      const messages = [
        "🚨 ALERTA: Verificação de segurança necessária!",
        "📱 AVISO: Sistema requer atualização!",
        "💀 URGENTE: Ação imediata necessária!",
        "📥 DOWNLOAD: Arquivo crítico disponível!",
        "⚠️ PERIGO: Risco de segurança detectado!"
      ];
      
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      this.sendPushNotification('🔒 Sistema de Segurança', randomMsg);
    }, 30000); // A cada 30 segundos
  }
}

// Iniciar servidor simulado
const pushServer = new PushServer();
pushServer.startAutoPush();