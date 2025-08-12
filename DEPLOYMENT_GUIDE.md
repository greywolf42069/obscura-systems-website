# Vercel Deployment Guide - Obscura Systems Security Website

## Prerequisites
- Node.js and npm installed
- Git installed
- Vercel account (already logged in)
- GitHub account

## Step 1: Initialize Git Repository

Open your terminal in the project directory and run:

```bash
git init
git add .
git commit -m "Initial commit: Obscura Systems security website"
```

## Step 2: Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click "New repository" or the "+" icon
3. Name your repository (e.g., "obscura-systems-website")
4. Keep it public for easier Vercel integration
5. Don't initialize with README (we already have one)
6. Click "Create repository"

## Step 3: Connect Local Repository to GitHub

Copy the commands from GitHub after creating the repository, or use:

```bash
git remote add origin https://github.com/YOUR_USERNAME/obscura-systems-website.git
git branch -M main
git push -u origin main
```

## Step 4: Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
touch .env.local
```

Add the following environment variables:

```bash
# Email Configuration for Contact Form
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=your-receiving-email@domain.com

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

**Important:** For Gmail, use an "App Password" not your regular password. Generate this in your Google Account settings under Security > App passwords.

## Step 5: Deploy to Vercel

### Option A: Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings
5. Add your environment variables in the Vercel dashboard:
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `EMAIL_TO`
   - `NEXT_PUBLIC_GA_ID` (if using analytics)
6. Click "Deploy"

### Option B: Vercel CLI

Install Vercel CLI globally:

```bash
npm i -g vercel
```

Then deploy:

```bash
vercel
```

Follow the prompts:
- Link to existing Vercel account
- Set up your project
- Add environment variables when prompted
- Deploy

## Step 6: Verify Deployment

After successful deployment:

1. Check the provided Vercel URL
2. Test the contact form functionality
3. Verify all pages load correctly
4. Test language switching (English, Spanish, Polish)
5. Check mobile responsiveness

## Step 7: Custom Domain (Optional)

If you have a custom domain:

1. Go to your project dashboard on Vercel
2. Navigate to "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions
5. Wait for SSL certificate (automatic)

## Step 8: Post-Deployment Checklist

- [ ] Contact form sends emails successfully
- [ ] All language translations work
- [ ] Mobile responsiveness verified
- [ ] All links and navigation work
- [ ] Images load correctly
- [ ] SEO meta tags are present
- [ ] Cookie consent banner appears
- [ ] FAQ section displays correctly
- [ ] Services section loads all items

## Troubleshooting

### Contact Form Not Working
- Verify email credentials in Vercel environment variables
- Check spam folders
- Ensure Gmail app password is correct
- Test with different email providers

### Build Failures
- Check Node.js version compatibility
- Verify all dependencies are installed
- Check for any build errors in Vercel logs

### Missing Environment Variables
- Double-check spelling in Vercel dashboard
- Ensure variables are added to production environment
- Restart deployment after adding variables

## Support

If you encounter issues:
- Check Vercel deployment logs
- Verify GitHub repository is public
- Ensure all tests pass locally: `npm test`
- Check build locally: `npm run build`