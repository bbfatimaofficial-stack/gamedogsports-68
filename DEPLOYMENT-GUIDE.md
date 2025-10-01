# Deployment Guide for Hostinger

Your website is now ready to deploy to Hostinger! Follow these steps:

## Step 1: Set Up Formspree (Free Contact Form)

1. Go to [https://formspree.io](https://formspree.io) and sign up for a free account
2. Create a new form and get your Form ID (it looks like: `xpznabcd`)
3. Open `src/components/ContactSection.tsx` in your code editor
4. Find line 79: `'https://formspree.io/f/YOUR_FORM_ID'`
5. Replace `YOUR_FORM_ID` with your actual Formspree form ID
6. In Formspree settings, set the email address where you want to receive form submissions (ContactcarolinaGD@gmail.com)

## Step 2: Build the Website

Run this command in your terminal:

```bash
npm run build
```

This will create a `dist` folder with all your production-ready files.

## Step 3: Upload to Hostinger

1. Log in to your Hostinger account
2. Go to your hosting panel (hPanel or cPanel)
3. Find the **File Manager** option
4. Navigate to your website's root directory (usually `public_html`)
5. Delete all existing files in that directory
6. Upload all files from the `dist` folder to `public_html`

## Step 4: Configure Domain in Squarespace

1. Log in to Squarespace (where your domain is registered)
2. Go to **Settings** → **Domains** → Select your domain
3. Click **DNS Settings** or **Advanced DNS**
4. Add/Update these records:

   **A Record:**
   - Type: `A`
   - Host/Name: `@` (for root domain)
   - Points to: [Your Hostinger IP Address - get this from Hostinger]
   - TTL: 3600

   **A Record (WWW):**
   - Type: `A`
   - Host/Name: `www`
   - Points to: [Your Hostinger IP Address]
   - TTL: 3600

5. Save the changes

**Note:** Get your Hostinger IP address from your Hostinger control panel under "Website Details" or "Hosting Information"

## Step 5: Wait for DNS Propagation

- DNS changes can take 24-48 hours to fully propagate
- Use [https://dnschecker.org](https://dnschecker.org) to check propagation status
- Your website should work on Hostinger once DNS propagates

## Step 6: Set Up SSL (HTTPS)

1. In Hostinger control panel, go to **SSL**
2. Enable **Free SSL Certificate** (Let's Encrypt)
3. This will automatically secure your website with HTTPS

## Troubleshooting

- **Form not working:** Make sure you replaced `YOUR_FORM_ID` in ContactSection.tsx with your actual Formspree form ID
- **Images not loading:** Verify all files from the `dist` folder were uploaded correctly
- **Website not showing:** Check DNS propagation and verify Hostinger IP address is correct
- **Need to make changes:** Edit the code, run `npm run build` again, and re-upload the `dist` folder

## What Changed

✅ Removed Supabase backend (no more monthly costs)
✅ Contact form now uses Formspree (free for up to 50 submissions/month)
✅ Website is now fully static (faster and cheaper to host)
✅ No database (form submissions go directly to your email)

## Support

- Formspree: [https://help.formspree.io](https://help.formspree.io)
- Hostinger: [https://support.hostinger.com](https://support.hostinger.com)
- Squarespace DNS: [https://support.squarespace.com/hc/en-us/articles/205812378](https://support.squarespace.com/hc/en-us/articles/205812378)
