# Render Deployment Guide

## Environment Setup for Render.com

### 1. Create render.yaml Configuration

Create a `render.yaml` file in the root directory:

```yaml
services:
  - type: web
    name: botswana-loan-app
    env: static
    buildCommand: echo "Static site ready"
    staticPublishPath: .
    routes:
      - path: /*
        destination: /index.html
```

### 2. Environment Variables (NOT REQUIRED for Static Site)

Since this is a static site, you do **NOT** need to add any environment variables on Render.

However, if you want to keep your Telegram credentials secure (recommended), you can:

#### Option A: Use Render Environment Variables

1. Go to your Render dashboard
2. Select your service
3. Go to **Environment** tab
4. Add these variables:
   ```
   TELEGRAM_BOT_TOKEN=your_bot_token_here
   TELEGRAM_CHAT_ID=your_chat_id_here
   ```

5. Then update `index.html` to read from a backend API instead of hardcoding

#### Option B: Keep Inline (Current Setup - Simple but Less Secure)

This is what you have now - credentials are in the HTML file. This works but is less secure for production.

### 3. Deployment Steps on Render

1. **Connect Repository**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select `botswana-loan-app` repository

2. **Configure Service**
   - **Name**: `botswana-loan-app`
   - **Environment**: `Static Site`
   - **Build Command**: (leave empty or use) `npm install http-server`
   - **Start Command**: (leave empty for static)
   - **Publish directory**: `.` (current directory)

3. **Environment Variables** (Skip if not using)
   - Leave empty for static site (credentials stay in HTML)

4. **Deploy**
   - Click "Create Web Service"
   - Render will automatically deploy

### 4. Custom Domain (Optional)

1. In Render dashboard
2. Go to **Settings**
3. Add custom domain under **Custom Domains**
4. Point your domain's DNS to Render

## File Structure for Render

Your repository structure is already perfect:

```
botswana-loan-app/
├── index.html                    ✅ Main application
├── package.json                  ✅ Dependencies
├── .gitignore                    ✅ Git ignore rules
├── render.yaml                   ✅ Render configuration (create this)
├── netlify.toml                  ✅ Alternative deployment
├── vercel.json                   ✅ Alternative deployment
├── README.md                     ✅ Documentation
└── TELEGRAM_SETUP.md            ✅ Telegram guide
```

## Important Notes

### For Render Static Site:

✅ **You DON'T need:**
- Backend server
- Runtime environment
- Build process
- Node.js runtime

✅ **What Render will do:**
- Serve `index.html` at root
- Handle all routes with `index.html` (SPA routing)
- Use CDN for fast delivery
- Provide free HTTPS/SSL

## Securing Your Telegram Credentials

### Current Setup (Simple):
- Credentials are in `index.html`
- Visible in browser DevTools
- **Not recommended for production**

### Recommended Setup (Secure):
1. Keep credentials in Render Environment Variables
2. Create a backend proxy (Node.js/Python)
3. Frontend calls your backend
4. Backend forwards to Telegram API

Example backend (Node.js):
```javascript
// backend/proxy.js
app.post('/api/send-to-telegram', async (req, res) => {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  // Handle Telegram API call
});
```

Then update HTML:
```javascript
const TELEGRAM_API_URL = 'https://your-render-url.com/api/send-to-telegram';
```

## Render Environment Variables (If Using Backend)

| Variable | Value | Notes |
|----------|-------|-------|
| `TELEGRAM_BOT_TOKEN` | Your actual bot token | Get from @BotFather |
| `TELEGRAM_CHAT_ID` | Your actual chat ID | Get from @userinfobot |
| `NODE_ENV` | `production` | Optional |

## Deployment URL

After deployment, your app will be available at:
```
https://botswana-loan-app.onrender.com
```

(Exact URL depends on your service name)

## Free Tier Limitations on Render

- ✅ **Free HTTPS**
- ✅ **Free custom domain option**
- ❌ Services spin down after 15 minutes of inactivity
- ❌ Limited to 100GB/month bandwidth

**Solution**: Upgrade to paid plan or use Netlify/Vercel which have better free tiers

## Quick Render Deployment Checklist

- [ ] Repository pushed to GitHub
- [ ] `.gitignore` includes `node_modules`
- [ ] Create `render.yaml` (optional but recommended)
- [ ] Set up Render account
- [ ] Connect GitHub repository
- [ ] Configure as "Static Site"
- [ ] Set publish directory to `.`
- [ ] Deploy
- [ ] Test at render URL
- [ ] Add custom domain (optional)

## Troubleshooting on Render

### Issue: 404 on page refresh
**Solution**: Ensure redirect rule is set in render.yaml
```yaml
routes:
  - path: /*
    destination: /index.html
```

### Issue: Telegram not receiving messages
**Solution**: Verify credentials in index.html (if inline) or Environment Variables (if backend)

### Issue: Service keeps spinning down
**Solution**: Upgrade to Paid tier or use Netlify/Vercel

---

**Recommendation**: For this static site, **Netlify or Vercel is better than Render** because they have better free tiers and no spin-down periods.
