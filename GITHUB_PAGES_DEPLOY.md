# 🚀 GitHub Pages Deployment Guide

Your React frontend is configured for automatic deployment to GitHub Pages using GitHub Actions.

## 📍 Your Site URL

Once deployed, your site will be available at:
**https://b-zakaria-u.github.io/Moroccan-Dialect-Translator/**

## ✅ Setup Steps

### 1. Enable GitHub Pages

1. Go to your repository: https://github.com/B-Zakaria-u/Moroccan-Dialect-Translator
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Source**, select:
   - Source: **GitHub Actions**
4. Save the settings

### 2. Push Your Changes

```bash
cd "c:\Users\zakar\Desktop\AI Translation\react-client"
git add .
git commit -m "Configure GitHub Pages deployment"
git push origin main
```

### 3. Monitor Deployment

1. Go to the **Actions** tab in your repository
2. You'll see the "Deploy to GitHub Pages" workflow running
3. Wait for it to complete (usually 2-3 minutes)
4. Once complete, visit your site URL

## 🔧 What Was Configured

### Files Modified/Created:

1. **`vite.config.js`** - Added `base: '/Moroccan-Dialect-Translator/'`
   - This ensures all assets load correctly on GitHub Pages

2. **`.github/workflows/deploy.yml`** - GitHub Actions workflow
   - Automatically builds and deploys on every push to `main`
   - Uses official GitHub Pages actions

## 🧪 Testing Locally

To test the production build locally:

```bash
npm run build
npm run preview
```

Visit `http://localhost:4173/Moroccan-Dialect-Translator/`

## ⚠️ Important Notes

### Backend Connection

Your frontend is configured to use environment variables for the API URL. For GitHub Pages:

1. The app will try to use `VITE_API_URL` from environment
2. Falls back to `http://localhost:8080` if not set

**For production**: You'll need to update `App.jsx` to point to your deployed backend (Render) URL, or use GitHub Actions secrets to inject the environment variable.

### Manual Deployment

If you prefer manual deployment, you can also trigger it:
1. Go to **Actions** tab
2. Select "Deploy to GitHub Pages"
3. Click "Run workflow"

## 🐛 Troubleshooting

**Workflow fails:**
- Check the Actions tab for error logs
- Ensure GitHub Pages is enabled in Settings
- Verify the workflow file is in `.github/workflows/`

**404 errors:**
- Verify the `base` path in `vite.config.js` matches your repo name
- Check that assets are loading from the correct path

**Blank page:**
- Check browser console for errors
- Verify the build completed successfully
- Ensure `index.html` is in the `dist` folder after build

## 🔄 Updating Your Site

Simply push changes to the `main` branch:

```bash
git add .
git commit -m "Update frontend"
git push origin main
```

GitHub Actions will automatically rebuild and redeploy!

---

## Next Steps

1. ✅ Push changes to GitHub
2. ✅ Enable GitHub Pages in repository settings
3. ✅ Wait for deployment
4. 🔜 Deploy backend to Render
5. 🔜 Update frontend to use production backend URL
