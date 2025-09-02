# Deploy to Vercel - Step by Step

## Prerequisites
1. **Database Setup** (Required)
   - Go to [neon.tech](https://neon.tech) or [supabase.com](https://supabase.com)
   - Create a free PostgreSQL database
   - Get your connection string

2. **Email Service** (Required for contact forms)
   - Go to [resend.com](https://resend.com)
   - Sign up for free account
   - Get your API key

## CLI Deployment Steps

```bash
# 1. Login to Vercel
vercel login

# 2. Link to your project (run in project directory)
vercel link

# 3. Pull environment variables (if any exist)
vercel env pull

# 4. Add environment variables
vercel env add DATABASE_URL production
# Paste your PostgreSQL connection string when prompted

vercel env add NEXTAUTH_URL production
# Enter: https://your-project-name.vercel.app

vercel env add NEXTAUTH_SECRET production
# Generate secret: openssl rand -base64 32

vercel env add RESEND_API_KEY production
# Paste your Resend API key

vercel env add ADMIN_DEFAULT_EMAIL production
# Enter: admin@oilflowbidec.com

vercel env add ADMIN_DEFAULT_PASSWORD production
# Enter a secure password

# 5. Deploy to production
vercel --prod
```

## Web Dashboard Deployment (Recommended)

1. Visit: https://vercel.com/new
2. Import: github.com/victoropp/oilflow-bidec-erp-website
3. Add environment variables in the UI
4. Click Deploy

## Post-Deployment Steps

1. **Database Migration**:
   ```bash
   # After deployment, run migrations
   npx prisma db push --accept-data-loss
   ```

2. **Custom Domain** (Optional):
   - Go to project settings in Vercel
   - Add your domain (e.g., oilflowbidec.com)
   - Update DNS records

3. **Test Critical Features**:
   - Homepage loads: https://your-app.vercel.app
   - Admin login works: https://your-app.vercel.app/admin/login
   - Contact form submits
   - Demo request form works

## Environment Variables Explained

| Variable | Purpose | Where to Get |
|----------|---------|--------------|
| DATABASE_URL | PostgreSQL connection | Neon.tech or Supabase |
| NEXTAUTH_URL | Your app URL | https://[project].vercel.app |
| NEXTAUTH_SECRET | Auth encryption key | Generate with openssl |
| RESEND_API_KEY | Email service | Resend.com dashboard |
| ADMIN_DEFAULT_EMAIL | Admin login email | Your choice |
| ADMIN_DEFAULT_PASSWORD | Admin login password | Your choice (secure) |

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all environment variables are set
- Verify DATABASE_URL is correct format

### Database Connection Error
- Ensure PostgreSQL database is created
- Check connection string format
- Add ?sslmode=require to connection string

### Authentication Not Working
- Verify NEXTAUTH_URL matches your deployment URL
- Ensure NEXTAUTH_SECRET is set
- Check callback URLs in environment

## Success Indicators
✅ Build completes successfully
✅ Homepage loads without errors
✅ Admin portal accessible at /admin/login
✅ Forms submit successfully
✅ No console errors in browser

## Need Help?
- Check Vercel build logs
- Review environment variables
- Ensure database is accessible
- Test with development build first

---
Ready to deploy? Start with Option 1 (Web Dashboard) for easiest setup!