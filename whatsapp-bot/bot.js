require('dotenv').config();
const { Client, RemoteAuth } = require('whatsapp-web.js');
const { MongoStore } = require('wwebjs-mongo');
const mongoose = require('mongoose');
const qrcode = require('qrcode-terminal');
const express = require('express');

// 1. Setup Express for Render's Health Check
// Render requires a Web Service to bind to a PORT within 60 seconds.
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('MagnetMemorie WhatsApp Bot is running!');
});

app.listen(port, () => {
    console.log(`🌐 Express web server listening on port ${port}`);
});

// 2. MongoDB Connection URI
// You MUST set MONGODB_URI in Render's Environment Variables
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/whatsapp-bot";

console.log("Connecting to MongoDB...");

mongoose.connect(MONGODB_URI).then(() => {
    console.log('✅ Connected to MongoDB');
    
    // 3. Initialize the MongoStore for RemoteAuth
    const store = new MongoStore({ mongoose: mongoose });
    
    // 4. Initialize WhatsApp client with Remote Authentication
    const client = new Client({
        authStrategy: new RemoteAuth({
            clientId: 'magnet-bot',
            store: store,
            backupSyncIntervalMs: 300000, // Sync to database every 5 mins
            dataPath: './.wwebjs_auth'
        }),
        puppeteer: {
            headless: true,
            args: [
                '--no-sandbox', 
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--no-first-run',
                '--no-zygote',
                '--single-process'
            ]
        }
    });

    // Event: Generate QR Code (only happens once, then saves to Mongo)
    client.on('qr', (qr) => {
        console.log('\n==================================================');
        console.log('📱 SCAN THIS QR CODE WITH YOUR WHATSAPP');
        console.log('==================================================\n');
        qrcode.generate(qr, { small: true });
    });

    // Event: Session successfully saved to Database
    client.on('remote_session_saved', () => {
        console.log('💾 WhatsApp session successfully saved to MongoDB!');
    });

    // Event: Bot is authenticated and ready
    client.on('ready', () => {
        console.log('\n✅ WHATSAPP BOT IS READY!');
        console.log('Listening for incoming MagnetMemorie orders...');
    });

    // Event: Incoming Message
    client.on('message', async (message) => {
        if (message.body.includes('New MagnetMemorie Order') && message.body.includes('Order ID:')) {
            console.log('\n📦 Received a new order from:', message.from);
            
            const orderIdMatch = message.body.match(/\*Order ID:\* (ORD-\d+)/);
            const totalMatch = message.body.match(/\*Total Paid:\* ₹([\d.]+)/);
            
            if (orderIdMatch && totalMatch) {
                const orderId = orderIdMatch[1];
                const amount = totalMatch[1];
                
                console.log(`-> Order ID: ${orderId} | Amount: ₹${amount}`);
                
                const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
                const paymentLink = `${frontendUrl}/pay?orderId=${orderId}&amt=${amount}`;
                
                const reply = `🎉 *Thank you for your order!* \n\nWe have received your photos and details.\n\nTo confirm your order, please complete your payment of ₹${amount} using this secure link:\n${paymentLink}\n\n_This is an automated message. We will begin production once payment is confirmed._`;
                
                await message.reply(reply);
                console.log('✅ Sent payment link successfully!');
            }
        }
    });

    client.initialize();
}).catch(err => {
    console.error("❌ Failed to connect to MongoDB:", err);
});
