# TAAWBA - Islamic Web Application

## Vercel Deployment Guide

### Prerequisites
- Node.js (version 16 or higher)
- Vercel account
- Google Gemini API key (for chatbot functionality)

### Deployment Steps

#### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your GitHub repository

3. **Configure Environment Variables:**
   - In Vercel dashboard, go to your project settings
   - Navigate to "Environment Variables"
   - Add the following:
     - `VITE_GEMINI_API_KEY`: Your Google Gemini API key

4. **Deploy:**
   - Vercel will automatically detect this is a Vite project
   - Click "Deploy"
   - Your app will be live at `https://your-project-name.vercel.app`

#### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Set Environment Variables:**
   ```bash
   vercel env add VITE_GEMINI_API_KEY
   ```

### Environment Variables Required

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Google Gemini API key for chatbot | Yes |

### Getting Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key and add it to your Vercel environment variables

### Project Configuration

The project is already configured with:
- ✅ `vercel.json` - Vercel configuration
- ✅ Proper build command in `package.json`
- ✅ SPA routing configuration
- ✅ Security headers
- ✅ Environment variables setup

### Build Command
```bash
npm run build
```

### Output Directory
```
dist/
```

### Node Version
18.x (automatically detected by Vercel)

### Domain Configuration

After deployment, you can:
1. Use the provided `.vercel.app` domain
2. Add a custom domain in Vercel dashboard
3. Configure DNS settings for your custom domain

### Troubleshooting

**Common Issues:**

1. **Build fails:** Check that all dependencies are in `package.json`
2. **Routes not working:** Ensure `vercel.json` is properly configured (already done)
3. **Environment variables not working:** Make sure they start with `VITE_` prefix
4. **API calls failing:** Check CORS settings and API endpoints

### Performance Optimizations Applied

- Static build optimization
- Proper caching headers
- Security headers included
- SPA routing configured

Your app is now ready for production deployment on Vercel! 🚀
