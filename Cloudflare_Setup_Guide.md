# Cloudflare Setup for lyrasorb.com

A step-by-step walkthrough to get lyrasorb.com live on Cloudflare Pages with downloads on R2 and email forwarding. Should take about 15–20 minutes of clicking, plus up to 24 hours for DNS propagation (usually 5–10 minutes in practice).

**Total cost:** $0/month to start.

---

## Part 1 — Create a Cloudflare account (2 min)

1. Go to **https://dash.cloudflare.com/sign-up**
2. Enter your email + a strong password → **Create Account**
3. Confirm your email when it arrives.

That's it. No credit card required for the free tier.

---

## Part 2 — Add lyrasorb.com to Cloudflare (5 min)

1. On the Cloudflare dashboard, click **Add a domain** (big button top-left).
2. Type `lyrasorb.com` → **Continue**.
3. Choose the **Free** plan → **Continue**.
4. Cloudflare will scan for existing DNS records. If the domain is brand new and unused, this list will be empty — that's fine. Click **Continue**.
5. Cloudflare will show you **two nameservers**, something like:
   - `alex.ns.cloudflare.com`
   - `luna.ns.cloudflare.com`

   **Leave this tab open.** You'll need these in the next step.

---

## Part 3 — Point your domain at Cloudflare (5 min)

You need to update the nameservers wherever you registered lyrasorb.com (GoDaddy, Namecheap, Google Domains / Squarespace, Porkbun, etc.).

**General steps** (menus vary slightly by registrar):

1. Log in to your registrar.
2. Find your domain list → click **lyrasorb.com**.
3. Look for **Nameservers** (sometimes labeled "DNS" or "Name Servers").
4. Choose **Custom nameservers** (or "Use your own nameservers").
5. Delete the registrar's default nameservers.
6. Paste in the two Cloudflare nameservers from Part 2, step 5.
7. Save.

**Registrar-specific quick hints:**
- **GoDaddy**: Domain → DNS → Nameservers → "Change" → "I'll use my own nameservers"
- **Namecheap**: Domain List → Manage → Nameservers → "Custom DNS"
- **Porkbun**: Domain → "Authoritative Nameservers" → Edit
- **Squarespace/Google Domains**: DNS → Nameservers → Custom

Back on Cloudflare, click **Continue** → **Done, check nameservers**.

Cloudflare will email you when the change is detected (usually within 10 minutes, occasionally up to 24 hours).

---

## Part 4 — Deploy the landing page on Cloudflare Pages (5 min)

While DNS propagates, set up the site.

1. On the Cloudflare dashboard sidebar, click **Workers & Pages** → **Create application** tab → **Pages** → **Upload assets**.
2. Project name: `lyrasorb` → **Create project**.
3. Drag-and-drop your entire `site/` folder contents (index.html + orb.png) onto the upload area. Or click "select from computer" and pick the files.
4. Click **Deploy site**.
5. You'll get a temporary URL like `lyrasorb.pages.dev` — click it to verify the landing page looks right.

### Attach the custom domain

1. In the Pages project, click the **Custom domains** tab.
2. **Set up a custom domain** → type `lyrasorb.com` → **Continue** → **Activate domain**.
3. Repeat for `www.lyrasorb.com` if you want both to work.
4. Cloudflare auto-creates the DNS records and SSL certificate. Within a minute or two, **https://lyrasorb.com** will be live.

---

## Part 5 — Host the game downloads on R2 (5 min)

R2 is Cloudflare's S3-compatible storage. Free tier: 10 GB storage, unlimited egress. Perfect for zip downloads.

### Enable R2 (one-time)

1. Sidebar → **R2 Object Storage** → **Purchase R2** (don't worry — there's a Free tier, no charge until you exceed it; they still ask for a card on file).

*If you'd rather not put a card on file:* skip R2 and instead put the zip files directly inside the Pages project (just drag them in alongside index.html). Cloudflare Pages allows files up to 25 MB. Your zips should easily fit. This is simpler for now — you can migrate to R2 later if the files grow.

### R2 method:

1. **Create bucket** → name it `lyrasorb-downloads` → location: Automatic.
2. Open the bucket → **Settings** tab → **Public access** → **Connect Domain** → use a subdomain like `downloads.lyrasorb.com`.
3. Upload your zip files: drag `LyrasOrb-mac.zip`, `LyrasOrb-win.zip`, `LyrasOrb-linux.tar.gz` into the bucket.
4. Files are now live at `https://downloads.lyrasorb.com/LyrasOrb-mac.zip` etc.

### Pages method (simpler):

1. Put the zip files into a `downloads/` folder inside your `site/` folder.
2. Re-deploy the Pages project (just drag the updated `site/` folder again).
3. Files are live at `https://lyrasorb.com/downloads/LyrasOrb-mac.zip` — which is exactly what your `index.html` already points to.

---

## Part 6 — Update the landing page's download links

Open `site/index.html` and find the `DOWNLOADS` object (around line 295). The `href` values are the paths — they should match wherever you hosted the zips:

- If using Pages method: leave as `downloads/LyrasOrb-mac.zip` etc.
- If using R2: change to `https://downloads.lyrasorb.com/LyrasOrb-mac.zip` etc.

Save, re-deploy the Pages project by dragging the updated folder.

---

## Part 7 — Free email at lyrasorb.com (optional, 3 min)

Forward `alvin@lyrasorb.com` (or any address) to your personal Gmail.

1. Sidebar → **Email** → **Email Routing**.
2. **Get started** → Cloudflare auto-configures the MX records.
3. **Routing rules** → **Create address** → enter `alvin@lyrasorb.com` → destination: your Gmail address.
4. Confirm the destination by clicking the verification link Cloudflare emails you.

Now anyone emailing alvin@lyrasorb.com lands in your Gmail. Unlimited addresses included.

---

## Part 8 — Test everything

1. Visit **https://lyrasorb.com** — landing page loads with HTTPS (green padlock).
2. Pick an OS — verify the download button links to the right file.
3. Click the download button — verify it actually downloads.
4. (Optional) Send a test email to alvin@lyrasorb.com from another account — verify it lands in your inbox.

---

## Ongoing cost

**Free forever** at this volume:
- Pages: unlimited bandwidth on the free tier
- R2: 10 GB storage / 1M reads per month free
- Email Routing: free, unlimited addresses

You only start paying if:
- R2 storage exceeds 10 GB (unlikely for zips)
- You need advanced Pages features like concurrent builds (you don't)
- You upgrade to a Cloudflare Pro plan for extra security features (optional)

Domain renewal is the only fixed annual cost — whatever your registrar charges (~$10–15/year for .com).

---

## When you're ready to update the site

Any time you change `index.html` or swap in new download files:

1. Go to Cloudflare Pages → your `lyrasorb` project → **Create deployment**.
2. Drag in the updated `site/` folder.
3. Live within ~30 seconds.

If this starts feeling tedious and you know git: connect the project to a GitHub repo and every push auto-deploys. But drag-and-drop works fine for occasional updates.

---

## Troubleshooting

**"DNS_PROBE_FINISHED_NXDOMAIN" or domain not resolving:**
Nameserver change hasn't propagated yet. Wait. Check status at https://dnschecker.org → enter `lyrasorb.com` → look for Cloudflare IPs.

**"SSL handshake failed" / certificate warnings:**
Cloudflare SSL takes a few minutes to issue after you attach the custom domain. Wait 5–10 minutes. If it persists, in the Cloudflare dashboard go to **SSL/TLS** → **Overview** → set mode to **Full**.

**Downloads 404:**
File path mismatch between `index.html` and where the zip actually lives. Double-check by opening the URL directly in a new tab.

**Pages deploy failed:**
Usually means a file is too large (>25 MB) or the upload was interrupted. Retry, or move large files to R2.

---

Once this is live, the next steps on the product side are:
- Build the Windows launcher (`.bat` that starts Python server + opens browser)
- Build the Linux launcher (`.sh` + `.desktop` file)
- Decide on pricing / payment flow (Stripe? Gumroad? One-time purchase?)
- Add a simple analytics (Cloudflare Web Analytics — free, privacy-friendly, no cookies)

But first — get lyrasorb.com resolving. Enjoy seeing your domain go live.
