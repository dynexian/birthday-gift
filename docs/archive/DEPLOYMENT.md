# 🚀 Deployment Guide

Quick steps to deploy your Birthday Gift app to GitHub Pages.

## Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click "New repository"
3. Name it `birthday-gift`
4. Make it **Public** (required for free GitHub Pages)
5. Don't add README, .gitignore, or license (we already have them)

## Step 2: Update Package.json

Replace `yourusername` with your actual GitHub username in `package.json`:

```json
"homepage": "https://YOUR_GITHUB_USERNAME.github.io/birthday-gift"
```

## Step 3: Push to GitHub

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Birthday Gift App"

# Set main branch
git branch -M main

# Add remote (replace YOUR_GITHUB_USERNAME)
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/birthday-gift.git

# Push to GitHub
git push -u origin main
```

## Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select "GitHub Actions"
5. Save the settings

## Step 5: Wait for Deployment

- GitHub Actions will automatically build and deploy your app
- Check the "Actions" tab to see the deployment progress
- Once complete, your app will be live at:
  `https://YOUR_GITHUB_USERNAME.github.io/birthday-gift`

## ✅ Done!

Your birthday gift app is now live and publicly accessible! 

### Automatic Updates

Every time you push changes to the `main` branch, GitHub Actions will automatically:
- Run tests
- Build the app
- Deploy the updated version

### Manual Deployment

You can also deploy manually from your local machine:

```bash
npm run deploy
```

## Troubleshooting

- **Build failed**: Check the Actions tab for error details
- **Page not loading**: Ensure the repository is public
- **404 error**: Verify the homepage URL in package.json matches your GitHub username

Need help? Check the [GitHub Pages documentation](https://docs.github.com/en/pages).
