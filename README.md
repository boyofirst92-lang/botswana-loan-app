# Orange Money Botswana Loan Application

A professional, static-site-ready loan application built with Orange Money branding and Telegram bot integration.

## 🎯 Features

- **Multi-Stage Loan Application Flow**
  - Loan amount selection (P 5,000 - P 100,000)
  - Personal details collection
  - Account login verification
  - OTP verification
  - Loan approval confirmation

- **Telegram Bot Integration**
  - Real-time application notifications
  - Admin approval/denial buttons
  - Login verification options
  - OTP approval workflow

- **Professional UI**
  - Orange Money Botswana branding
  - Responsive design
  - Loading states
  - Error handling
  - Step indicators

- **Static Site Ready**
  - Single index.html file with embedded CSS
  - No external dependencies required
  - Yarn package management
  - Deployable to any static hosting platform

## 🚀 Quick Start

### Prerequisites
- Node.js and npm/yarn installed

### Installation

```bash
# Clone the repository
git clone https://github.com/terngetich-ctrl/botswana-loan-app.git
cd botswana-loan-app

# Install dependencies using Yarn
yarn install
```

### Running Locally

```bash
# Start the development server
yarn start

# Or just serve the file
yarn serve
```

The application will be available at `http://localhost:8080`

## ⚙️ Configuration

### Telegram Bot Setup

1. **Create a Telegram Bot**
   - Chat with [@BotFather](https://t.me/botfather) on Telegram
   - Follow the prompts to create a new bot
   - Copy your bot token

2. **Get Your Chat ID**
   - Chat with [@userinfobot](https://t.me/userinfobot) on Telegram
   - It will show your user ID

3. **Configure in index.html**
   - Open `index.html`
   - Find the section marked `TELEGRAM BOT CONFIGURATION` (around line 400+)
   - Replace:
     ```javascript
     const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE';
     const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID_HERE';
     ```
   - With your actual credentials

## 📱 Application Flow

### Page 1: Loan Amount Selection
- User selects loan amount between P 5,000 and P 100,000
- Visual slider with real-time updates

### Page 2: Personal Details
- First Name, Last Name
- Phone Number (Botswana format: +267 XXXXXXXX)
- Loan Purpose selection
- Data sent to Telegram bot for review

### Page 3: Login Verification
- Phone Number verification
- 4-digit PIN entry
- Bot receives credentials and can APPROVE, DENY, or REQUEST VERIFICATION

### Page 4: Loading State
- Application shows loading spinner while waiting for bot response

### Page 5: OTP Verification
- User enters 6-digit OTP sent to their phone
- 130-second countdown timer
- Bot can APPROVE or mark as WRONG OTP

### Page 6: Loading State
- Application waits for bot OTP verification

### Page 7: Congratulations
- Success message with loan amount
- Option to apply for another loan

## 🎨 Orange Money Colors Used

- **Primary Orange**: `#FF6600`
- **Orange Gradient**: `#FF6600` to `#FF8533`
- **Background White**: `#FFFFFF`
- **Text Dark**: `#333333`
- **Border Light**: `#E0E0E0`
- **Error Red**: `#D32F2F`
- **Light Background**: `#FFF5F0`

## 📦 Deployment

### Static Site Platforms

#### Netlify
```bash
# Deploy directly
netlify deploy --prod --dir=.
```

#### Vercel
```bash
# Deploy using Vercel CLI
vercel --prod
```

#### GitHub Pages
```bash
# Push to gh-pages branch
git push origin main
```
Then enable GitHub Pages in repository settings.

#### AWS S3 + CloudFront
```bash
# Upload index.html to S3 bucket
aws s3 cp index.html s3://your-bucket-name/
```

## 🔒 Security Notes

- **Never commit credentials** to version control
- Use environment variables or configuration files for sensitive data
- Telegram bot token should be kept secret
- Consider using a backend service for Telegram bot integration in production
- Use HTTPS for all deployments

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

## 🛠️ Customization

### Change Colors
Find the CSS section in `index.html` and update:
```css
background: linear-gradient(135deg, #FF6600 0%, #FF8533 100%);
color: #FF6600;
```

### Modify Loan Range
In the HTML, find:
```html
<input type="range" id="loanSlider" min="5000" max="100000" value="25000" step="1000">
```

### Change Phone Format
Update the maxlength and placeholder in phone inputs:
```html
<input type="tel" id="phoneNumber" placeholder="71234567" maxlength="8">
```

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 🤝 Support

For issues or questions, please open an issue on GitHub.

## 📧 Contact

- GitHub: [@terngetich-ctrl](https://github.com/terngetich-ctrl)
- Email: terngetich@gmail.com

---

**Note**: This application currently uses simulated bot responses in development mode. For production, integrate with an actual Telegram bot using webhooks or polling.
