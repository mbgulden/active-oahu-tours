# Active Oahu Tours — Switchover Checklist
## WordPress (Flywheel) → Astro (Cloudflare Pages)

> **Goal:** Painless DNS switch with zero broken links and preserved SEO rankings.

---

## Phase 0: Pre-Switchover Verification (DO THESE FIRST)

### 0.1 Build & Deploy
- [ ] **Set Node version in CF Pages dashboard**: Add env var `NODE_VERSION=22`
- [ ] **Verify build passes**: Check Cloudflare Pages → active-oahu-tours → Deployments → latest `main` is green
- [ ] **Preview deployment**: Visit `active-oahu-tours.pages.dev` and spot-check all pages
- [ ] **Test FareHarbor booking**: Embed loads and checkout works on preview domain
- [ ] **Test all forms/links**: Phone links, email links, booking links all work
- [ ] **Verify all pages render**: Home, Tours, Rentals, About, Contact, FAQ, Reviews, Cancellation, Privacy, Guides

### 0.2 Content Parity
- [ ] **Static pages match**: About, Contact, FAQ, Cancellation, Privacy, Reviews — content verified
- [ ] **Tour pages match**: All active tours have Astro equivalents with correct pricing
- [ ] **Rental pages match**: Equipment, pricing, delivery info present
- [ ] **Blog posts migrated**: 64 blog/guide posts in Astro content collection
- [ ] **Images present**: Hero images, tour images, og:image tags all resolve

### 0.3 SEO Verification
- [ ] **Meta titles unique on every page**: Home, tours, rentals, blog, static pages
- [ ] **Meta descriptions present on every page**: 120-160 chars, keyword-optimized
- [ ] **Open Graph tags**: og:title, og:description, og:image on every page
- [ ] **Twitter cards**: summary_large_image on every page
- [ ] **Canonical URLs**: self-referencing canonicals, no duplicates
- [ ] **Schema markup validated**: LocalBusiness + TouristAttraction on home, Event on tours, Article on blog, FAQPage on FAQ
- [ ] **Sitemap generated**: `active-oahu-tours.pages.dev/sitemap-index.xml` returns 200
- [ ] **robots.txt**: `active-oahu-tours.pages.dev/robots.txt` allows crawling
- [ ] **Hreflang (if needed)**: Japanese (`/ja/`) pages if audience requires

### 0.4 Redirect Verification
- [ ] **Redirect file in place**: `public/_redirects` committed and pushed
- [ ] **All WordPress URLs mapped**: ~78 redirect rules covering all old URLs
- [ ] **WWW → apex redirect**: `www.activeoahutours.com/*` → `activeoahutours.com/:splat`
- [ ] **Booking deep links**: `/book` and `/reserve` → FareHarbor
- [ ] **Test redirects locally**: Run `npx wrangler pages dev` and curl test

### 0.5 Performance
- [ ] **Lighthouse score ≥ 90**: Mobile and desktop
- [ ] **PageSpeed Insights**: All core pages load under 3s
- [ ] **Image optimization**: WebP/AVIF formats, lazy loading, proper dimensions
- [ ] **CSS size**: Under 50KB gzipped (Tailwind purge working)
- [ ] **No render-blocking JS**: FareHarbor script deferred/async

### 0.6 SSL & Security
- [ ] **SSL automatically provisioned**: CF Pages provides SSL for custom domains
- [ ] **HSTS header in `_headers`**: `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
- [ ] **Security headers**: X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- [ ] **CSP configured**: Content-Security-Policy for FareHarbor, Cloudflare, GA (if used)

---

## Phase 1: Switchover (Estimated Downtime: 0-5 min)

### 1.1 Pre-Switch (5 min before)
- [ ] **Notify team**: No content changes during switchover window
- [ ] **Take final WordPress backup**: If possible, export WP content as final snapshot
- [ ] **Verify CF Pages deployment**: Latest build is green and serving correctly

### 1.2 DNS Switch
1. [ ] **Log into Cloudflare Dashboard** → DNS → Records for `activeoahutours.com`
2. [ ] **Note current DNS records**: Save screenshots of all existing records
3. [ ] **Remove or update A/AAAA records**: Currently pointing to Flywheel IP
4. [ ] **Add CNAME record**: `activeoahutours.com` → `active-oahu-tours.pages.dev` (proxy ON, orange cloud)
5. [ ] **Add CNAME record**: `www.activeoahutours.com` → `active-oahu-tours.pages.dev` (proxy ON)
6. [ ] **Verify in CF Pages dashboard**: Custom domain shows "Active" status

### 1.3 Post-Switch Verification (IMMEDIATELY after DNS)
- [ ] **Clear local DNS cache**: `sudo dscacheutil -flushcache` (Mac) or `ipconfig /flushdns` (Win)
- [ ] **Test apex domain**: `curl -I https://activeoahutours.com` returns 200
- [ ] **Test www redirect**: `curl -I https://www.activeoahutours.com` redirects to apex
- [ ] **Test key URLs**: Home, /tours/, /rentals/, /about/, /faq/, /guides/
- [ ] **Test old WordPress URLs redirect**: e.g., `/activities/` → `/tours/` (301)
- [ ] **Test FareHarbor booking**: Embed loads on live domain
- [ ] **Test SSL**: `https://` works, certificate valid (CF issues automatically)
- [ ] **Test mobile**: Load on phone browser, check responsive behavior

---

## Phase 2: Post-Switchover (Within 24 Hours)

### 2.1 Search Engines
- [ ] **Submit sitemap to Google Search Console**: `https://activeoahutours.com/sitemap-index.xml`
- [ ] **Submit sitemap to Bing Webmaster Tools**
- [ ] **Verify domain in GSC**: If not already, add and verify `activeoahutours.com`
- [ ] **Check Index Coverage report**: Monitor for 404s or crawling errors
- [ ] **Request indexing of key pages**: Home, top tours, rental page
- [ ] **Monitor Search Console for 48h**: Watch for 404 spikes

### 2.2 WordPress Cleanup
- [ ] **Keep WordPress running for 7 days**: In case rollback is needed
- [ ] **Add noindex to WordPress**: Prevent duplicate content issues during transition
- [ ] **After 7 days**: Cancel Flywheel hosting (or keep for email/admin if needed)

### 2.3 Analytics
- [ ] **Add Cloudflare Web Analytics**: Privacy-first analytics (no cookies)
- [ ] **Add Google Analytics 4** if desired: Add GA4 measurement ID to env vars
- [ ] **Verify analytics firing**: Check real-time reports

### 2.4 External Listings
- [ ] **Update Google Business Profile**: Website field → `activeoahutours.com`
- [ ] **Update TripAdvisor**: Website link
- [ ] **Update Yelp**: Website link
- [ ] **Update Viator/GetYourGuide**: If listed
- [ ] **Update Instagram/Facebook**: Link in bio/profile
- [ ] **Update email signatures**: Team email signature links

### 2.5 Monitoring
- [ ] **Set up uptime monitoring**: UptimeRobot or Cloudflare health checks
- [ ] **Monitor 404 logs**: CF Pages Analytics → check for unexpected 404s
- [ ] **Monitor redirect chain length**: Ensure no redirect loops
- [ ] **Watch performance metrics**: CF Web Analytics shows Core Web Vitals

---

## Phase 3: SEO & Content (Week 1)

### 3.1 Content Refresh
- [ ] **Refresh top 10 blog posts**: Update dates, fix broken images, add internal links
- [ ] **Add internal linking**: Blog posts → tour pages, rental pages → booking
- [ ] **Optimize images**: Compress, add alt text, convert to WebP
- [ ] **Add FAQ blocks to tour pages**: Tour-specific FAQs for rich results

### 3.2 Local SEO
- [ ] **Google Business Profile refresh**: New photos, updated description, services list
- [ ] **Build local citations**: Consistent NAP across all directories
- [ ] **Request reviews**: Email past guests for Google/TripAdvisor reviews

### 3.3 Content Expansion
- [ ] **Publish 2-3 new blog posts**: Target keyword gaps from SEO research
- [ ] **Create "Best of" content**: "Best Kayak Tours in Oahu," "Best Beaches in Kailua"
- [ ] **Seasonal content**: "Summer Kayaking Oahu," "Winter Whale Watching from Kayak"

---

## Rollback Plan (If Needed)

If something goes wrong, rollback takes ~5 minutes:

1. [ ] **Revert DNS**: Point `activeoahutours.com` A record back to Flywheel IP
2. [ ] **Wait for DNS propagation**: Usually 1-5 minutes with Cloudflare proxy
3. [ ] **Remove noindex from WordPress**: Re-enable indexing
4. [ ] **Investigate issue**: Check CF Pages build logs, test locally

**Rollback trigger conditions:**
- Booking system broken (FareHarbor embed doesn't load)
- >50% of pages returning errors
- SSL certificate failure
- Google Search Console showing massive 404 spike (>20% of pages)

---

## One Action Required From Michael

> **Set `NODE_VERSION=22` in Cloudflare Pages Dashboard:**
> 1. Go to Cloudflare Dashboard → Workers & Pages → active-oahu-tours
> 2. Settings → Environment Variables
> 3. Add variable: `NODE_VERSION` = `22`
> 4. Redeploy latest commit

This is the ONE thing blocking the build. Everything else is ready to go.
