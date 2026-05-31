# Active Oahu Tours - Astro Site Architecture

> **Version:** 1.0 - WordPress-to-Astro Migration Blueprint
> **Platform:** Astro 6.4.2 (static SSG) -> Cloudflare Pages
> **Domain:** activeoahutours.com
> **Design:** Navy/Gold/Ocean color scheme, Tailwind CSS 3, fully responsive
> **Booking:** FareHarbor embedded lightframe

---

## Table of Contents

1. [URL Structure & Page Inventory](#1-url-structure--page-inventory)
2. [Content Hierarchy & Collections](#2-content-hierarchy--collections)
3. [Component Tree](#3-component-tree)
4. [Sitemap Structure](#4-sitemap-structure)
5. [Keyword Targeting Strategy](#5-keyword-targeting-strategy)
6. [Schema Markup Strategy](#6-schema-markup-strategy)
7. [Technical SEO Implementation](#7-technical-seo-implementation)
8. [File System Map](#8-file-system-map)

---

## 1. URL Structure & Page Inventory

### 1.1 Home Page

| New URL | Page Type | Template | Priority |
|---------|----------|----------|----------|
| `/` | Home | `src/pages/index.astro` | 1.0 |

**Sections (single-page anchors):**
- `#tours` - Tour grid (featured tours)
- `#about` - Trust signals / why book with us
- `#book` - FareHarbor booking embed
- `#faq` - Aggregated FAQ

### 1.2 Tour Detail Pages (Content Collection)

| New URL | Category | Primary Keyword | Priority |
|---------|----------|-----------------|----------|
| `/tours/kayak-mokulua/` | kayak | mokulua islands kayak tour | 0.9 |
| `/tours/kayak-kaneohe/` | kayak | kaneohe bay kayak sandbar | 0.9 |
| `/tours/kayak-kailua/` | kayak | oahu kayak tours, kayak kailua | 0.9 |
| `/tours/ebike-kailua/` | ebike | kailua e-bike tours | 0.9 |
| `/tours/kayak-self-guided/` | kayak | kayak rental kailua | 0.8 |
| `/tours/ebike-lanikai/` | ebike | lanikai e-bike rental | 0.8 |
| `/tours/snorkel-kailua/` | snorkel | kailua snorkeling tour | 0.8 |
| `/tours/surf-lesson-kailua/` | surf | kailua surf lessons | 0.8 |

**Template:** `src/pages/tours/[slug].astro`
**Collection:** `src/content/tours/` (Zod schema in `src/content.config.ts`)

### 1.3 Rental Pages (Content Collection)

| New URL | Category | Primary Keyword | Priority |
|---------|----------|-----------------|----------|
| `/rentals/kayak-rental/` | gear | kayak rental kailua | 0.8 |
| `/rentals/ebike-rental/` | gear | e-bike rental kailua | 0.8 |
| `/rentals/snorkel-gear-rental/` | gear | snorkel gear rental oahu | 0.7 |
| `/rentals/beach-gear-rental/` | gear | beach gear rental kailua | 0.7 |
| `/rentals/sup-rental/` | gear | stand up paddle board rental kailua | 0.7 |

**Template:** `src/pages/rentals/[slug].astro`
**Collection:** `src/content/rentals/`

### 1.4 Blog / Guides (Content Collection)

| New URL | Topic Cluster | Primary Keyword | Priority |
|---------|---------------|-----------------|----------|
| `/blog/kayaking-oahu-guide/` | Kayak | oahu kayaking guide, best kayaking oahu | 0.7 |
| `/blog/best-beaches-kailua/` | Travel | best beaches kailua oahu | 0.7 |
| `/blog/oahu-outdoor-activities/` | Activities | oahu outdoor activities | 0.7 |
| `/blog/kayak-safety-tips/` | Kayak | kayak safety tips hawaii | 0.6 |
| `/blog/ebike-oahu-guide/` | E-Bike | oahu e-bike guide | 0.6 |
| `/blog/snorkeling-kailua-guide/` | Snorkel | snorkeling kailua oahu | 0.6 |
| `/blog/kailua-travel-guide/` | Travel | kailua oahu travel guide | 0.7 |
| `/blog/oahu-hiking-trails/` | Activities | oahu hiking trails | 0.7 |
| `/blog/things-to-do-kailua/` | Travel | things to do in kailua oahu | 0.7 |
| `/blog/hawaiian-marine-life/` | Nature | hawaiian marine life guide | 0.6 |
| `/blog/seasonal-whale-watching-oahu/` | Nature | whale watching oahu | 0.6 |
| `/blog/kailua-beach-parking-guide/` | Travel | kailua beach parking | 0.6 |
| `/blog/oahu-eco-tourism/` | Activities | oahu eco tourism | 0.6 |
| `/blog/kayak-vs-sup-oahu/` | Kayak | kayak vs paddle board oahu | 0.5 |
| `/blog/best-time-visit-oahu/` | Travel | best time to visit oahu | 0.6 |
| `/blog/kailua-local-food-guide/` | Travel | kailua restaurants food guide | 0.5 |
| `/blog/kayaking-with-kids-oahu/` | Kayak | kayaking with kids oahu | 0.6 |
| `/blog/windward-oahu-guide/` | Travel | windward oahu guide | 0.6 |
| `/blog/oahu-photography-spots/` | Travel | oahu photography spots | 0.5 |
| `/blog/hawaiian-culture-respect/` | Culture | hawaiian cultural respect tips | 0.5 |

**(20 total blog posts - covering the existing WordPress guide content with room to grow)**

**Template:** `src/pages/blog/[slug].astro`
**Collection:** `src/content/blog/`

### 1.5 Static Pages

| New URL | Page | Primary Keyword | Priority |
|---------|------|-----------------|----------|
| `/about/` | About Us | about active oahu tours | 0.7 |
| `/contact/` | Contact | contact active oahu tours | 0.6 |
| `/faq/` | FAQ | oahu kayak tour faq | 0.7 |
| `/cancellation/` | Cancellation Policy | (utility page) | 0.3 |
| `/privacy/` | Privacy Policy | (utility page) | 0.3 |
| `/reviews/` | Customer Reviews | active oahu tours reviews | 0.6 |
| `/gallery/` | Photo Gallery | oahu kayak tour photos | 0.6 |
| `/join-team/` | Join Our Team | oahu outdoor guide jobs | 0.5 |
| `/awards/` | Awards & Recognition | (trust page) | 0.4 |

**Templates:** Individual `.astro` pages in `src/pages/`

### 1.6 System Pages

| URL | Purpose |
|-----|---------|
| `/sitemap.xml` | Auto-generated XML sitemap |
| `/robots.txt` | Crawl directives |
| `/rss.xml` | Blog RSS feed (optional) |
| `/404/` | Custom 404 page (Astro default) |

---

## 2. Content Hierarchy & Collections

```
active-oahu-tours/
|
+-- Home (/)
|   +-- Hero (HeroSection.astro)
|   +-- Tour Grid (TourCard.astro x featured)
|   +-- About / Trust Signals
|   +-- FareHarbor Booking Embed
|   +-- Aggregated FAQ (FAQ.astro)
|
+-- Tours (/tours/[slug]/)
|   +-- Tour Collection (Zod schema)
|       +-- Category: kayak | ebike | snorkel | hike | surf
|       +-- Frontmatter: title, slug, duration, price, difficulty, location, image...
|       +-- Body: Markdown description
|       +-- Schema: TouristTrip JSON-LD
|
+-- Rentals (/rentals/[slug]/)
|   +-- Rentals Collection (Zod schema)
|       +-- Category: kayak | ebike | snorkel | beach | sup
|       +-- Frontmatter: title, slug, price, priceLabel, image...
|       +-- Schema: Product JSON-LD
|
+-- Blog (/blog/[slug]/)
|   +-- Blog Collection (Zod schema)
|       +-- Category: kayak | ebike | snorkel | travel | activities | nature | culture
|       +-- Frontmatter: title, slug, date, author, excerpt, image, tags...
|       +-- Schema: Article / BlogPosting JSON-LD
|
+-- Static Pages
|   +-- /about/    -> LocalBusiness schema
|   +-- /contact/  -> LocalBusiness + ContactPoint schema
|   +-- /faq/      -> FAQPage schema
|   +-- /cancellation/ -> WebPage schema
|   +-- /privacy/  -> WebPage schema
|   +-- /reviews/  -> Review schema (aggregate + itemList)
|   +-- /gallery/  -> ImageGallery schema
|   +-- /join-team/ -> JobPosting schema
|   +-- /awards/   -> WebPage schema
|
+-- System
    +-- /sitemap.xml (auto-generated)
    +-- /robots.txt
    +-- /rss.xml   (optional)
    +-- /404/      (Astro default + custom)
```

### Content Collection Schemas

**Tours (existing):**
```
// src/content.config.ts - toursCollection
{
  title, slug, category, duration, price, priceLabel, difficulty,
  location, image, imageAlt, featured, minGuests, maxGuests,
  highlights[], includes[], whatToBring[], faqs[], seo{}
}
```

**Rentals (new):**
```
// src/content.config.ts - rentalsCollection
{
  title, slug, category, price, priceLabel, priceUnit,
  image, imageAlt, featured, description, availability,
  includes[], requirements[], seo{}
}
```

**Blog (new):**
```
// src/content.config.ts - blogCollection
{
  title, slug, date, author, excerpt, image, imageAlt,
  category, tags[], featured, seo{}
}
```

---

## 3. Component Tree

```
BaseLayout.astro (shell)
+-- <head>
|   +-- Meta tags (charset, viewport, description, theme-color)
|   +-- Open Graph (og:title, og:description, og:image, og:url)
|   +-- Twitter Card (summary_large_image)
|   +-- Canonical URL
|   +-- JSON-LD Schema (slot: Astro.props.schema)
|
+-- <Header> (sticky nav)
|   +-- Logo -> /
|   +-- Desktop Nav: Tours | Rentals | Blog | About | FAQ | Book Now
|   +-- Mobile Nav (hamburger toggle)
|
+-- <main>
|   +-- <slot />  <- Page content injected here
|
+-- <Footer>
    +-- Brand blurb
    +-- Quick Links (Tours, Rentals, Blog, FAQ, Cancellation Policy)
    +-- Contact (address, phone, email)
    +-- Copyright

-- Shared Components --

HeroSection.astro
  Props: headline, subheadline, image, imageAlt, ctaText, ctaLink,
         secondaryCtaText, secondaryCtaLink
  Features: Full-viewport hero, gradient overlay, trust badges,
            CTA buttons

TourCard.astro
  Props: title, slug, image, imageAlt, price, priceLabel, duration,
         difficulty, location, highlights[]
  Features: Card grid item, lazy image, difficulty badge, CTA button

FAQ.astro
  Props: faqs[], headline
  Features: Accordion UI, FAQPage schema injection, toggle script

-- New Components for Migration --

RentalCard.astro
  Props: title, slug, image, imageAlt, price, priceLabel, category
  Features: Similar to TourCard, rental-specific layout

BlogCard.astro
  Props: title, slug, image, imageAlt, excerpt, date, category
  Features: Blog listing card, date format, category badge

ReviewCarousel.astro
  Props: reviews[] (name, rating, text, date, platform)
  Features: Review card carousel, star ratings, platform badges

GalleryGrid.astro
  Props: images[] (src, alt, caption)
  Features: Responsive image grid, lightbox (progressive enhancement)

Breadcrumbs.astro
  Props: items[] (label, url)
  Features: Schema.org BreadcrumbList JSON-LD, semantic <nav>

FareHarborBooking.astro
  Props: shortname, flow
  Features: Embeddable FareHarbor lightframe, loading state

SEOSchema.astro (utility)
  Props: type, data
  Features: Renders <script type="application/ld+json">
```

---

## 4. Sitemap Structure

### 4.1 XML Sitemap (`/sitemap.xml`)

Astro auto-generates via `@astrojs/sitemap` integration or manual `getStaticPaths`.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Home -->
  <url><loc>https://activeoahutours.com/</loc><priority>1.0</priority><changefreq>weekly</changefreq></url>
  <!-- Tour Detail Pages -->
  <url><loc>https://activeoahutours.com/tours/kayak-mokulua/</loc><priority>0.9</priority></url>
  <url><loc>https://activeoahutours.com/tours/kayak-kaneohe/</loc><priority>0.9</priority></url>
  <url><loc>https://activeoahutours.com/tours/kayak-kailua/</loc><priority>0.9</priority></url>
  <url><loc>https://activeoahutours.com/tours/ebike-kailua/</loc><priority>0.9</priority></url>
  <!-- ... all tour pages ... -->
  <!-- Rental Pages -->
  <url><loc>https://activeoahutours.com/rentals/kayak-rental/</loc><priority>0.8</priority></url>
  <!-- ... all rental pages ... -->
  <!-- Blog Posts -->
  <url><loc>https://activeoahutours.com/blog/kayaking-oahu-guide/</loc><priority>0.7</priority></url>
  <!-- ... all blog posts ... -->
  <!-- Static Pages -->
  <url><loc>https://activeoahutours.com/about/</loc><priority>0.7</priority></url>
  <url><loc>https://activeoahutours.com/contact/</loc><priority>0.6</priority></url>
  <url><loc>https://activeoahutours.com/faq/</loc><priority>0.7</priority></url>
  <!-- ... all static pages ... -->
</urlset>
```

### 4.2 HTML Sitemap (optional, for users)
- `/sitemap/` - Human-readable hierarchical page with links to all sections

---

## 5. Keyword Targeting Strategy

### 5.1 Primary Keyword Map

| Page | Primary Keyword | Monthly Volume | Intent |
|------|----------------|----------------|--------|
| Home `/` | oahu kayak tours | High | Commercial |
| `/tours/kayak-mokulua/` | mokulua islands kayak tour | Med-High | Commercial |
| `/tours/kayak-kaneohe/` | kaneohe bay kayak | Med | Commercial |
| `/tours/kayak-kailua/` | kayak kailua, oahu kayaking | High | Info/Commercial |
| `/tours/ebike-kailua/` | kailua e-bike tours | Med | Commercial |
| `/tours/snorkel-kailua/` | kailua snorkeling tour | Med | Commercial |
| `/tours/surf-lesson-kailua/` | kailua surf lessons | Med | Commercial |
| `/rentals/kayak-rental/` | kayak rental kailua | Med-High | Commercial |
| `/rentals/ebike-rental/` | e-bike rental oahu | Med | Commercial |
| `/blog/kayaking-oahu-guide/` | best kayaking oahu, oahu kayaking guide | Med-High | Informational |
| `/blog/best-beaches-kailua/` | best beaches kailua | Med | Informational |
| `/blog/oahu-outdoor-activities/` | oahu outdoor activities | Med | Informational |
| `/about/` | active oahu tours | Low-Med | Navigational |
| `/reviews/` | active oahu tours reviews | Low-Med | Navigational |
| `/faq/` | oahu kayak tour faq | Low | Informational |

### 5.2 Content Clusters (Topic Clusters)

#### Cluster 1: **Oahu Kayaking** (Pillar: `/blog/kayaking-oahu-guide/`)
- `/tours/kayak-mokulua/` - Mokulua Islands kayak
- `/tours/kayak-kaneohe/` - Kaneohe Bay sandbar
- `/tours/kayak-kailua/` - Kailua kayaking hub
- `/blog/kayak-safety-tips/` - Safety information
- `/blog/kayaking-with-kids-oahu/` - Family kayaking
- `/blog/kayak-vs-sup-oahu/` - Comparison content

#### Cluster 2: **Kailua Travel Guide** (Pillar: `/blog/kailua-travel-guide/`)
- `/blog/best-beaches-kailua/` - Beaches
- `/blog/things-to-do-kailua/` - Activities
- `/blog/kailua-beach-parking-guide/` - Practical info
- `/blog/kailua-local-food-guide/` - Dining
- `/blog/windward-oahu-guide/` - Regional guide

#### Cluster 3: **Oahu Outdoor Activities** (Pillar: `/blog/oahu-outdoor-activities/`)
- `/tours/ebike-kailua/` and `/tours/ebike-lanikai/`
- `/tours/snorkel-kailua/`
- `/blog/oahu-hiking-trails/`
- `/blog/oahu-eco-tourism/`
- `/blog/oahu-photography-spots/`

#### Cluster 4: **Gear Rentals** (Pillar: `/rentals/kayak-rental/`)
- `/rentals/ebike-rental/`
- `/rentals/snorkel-gear-rental/`
- `/rentals/beach-gear-rental/`
- `/rentals/sup-rental/`

### 5.3 Internal Linking Strategy

- **Tour pages** -> link to related blog guides and rental pages
- **Blog posts** -> link to relevant tour pages (commercial intent capture)
- **Home page** -> link to pillar blog content
- **Every page** -> link to booking (`#book` or FareHarbor)
- **Footer** -> links to Tours, Rentals, Blog, FAQ, Cancellation
- **Breadcrumbs** -> enable crawl depth hierarchy

### 5.4 AI Search Optimization (Google AI Overviews / SGE)

For AI-generated search results, content must be:

1. **Structured with clear headings** (H2s/H3s for scannable sections)
2. **Question-answer format** for informational queries (FAQ sections on every tour page)
3. **Authoritative local signals** - address, phone, Google Maps link, local expertise mentions
4. **Entity-rich content** - mention specific landmarks (Mokulua Islands, Koolau Mountains, Kailua Beach Park, Lanikai Beach, Kaneohe Bay)
5. **First-hand experience signals** - "we've done this hundreds of times", "our local guides know..."
6. **Structured data** - comprehensive JSON-LD on every page
7. **List format answers** - numbered lists, bullet points for extractable snippets

---

## 6. Schema Markup Strategy

### 6.1 Home Page (`/`)

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://activeoahutours.com/#organization",
  "name": "Active Oahu Tours",
  "description": "...",
  "image": "https://activeoahutours.com/images/og-default.jpg",
  "url": "https://activeoahutours.com",
  "telephone": "(808) 555-1234",
  "email": "aloha@activeoahutours.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "130 Kailua Road",
    "addressLocality": "Kailua",
    "addressRegion": "HI",
    "postalCode": "96734",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 21.396,
    "longitude": -157.739
  },
  "openingHoursSpecification": { ... },
  "priceRange": "$$",
  "sameAs": [
    "https://www.instagram.com/activeoahutours",
    "https://www.facebook.com/activeoahutours",
    "https://www.tripadvisor.com/...",
    "https://www.yelp.com/biz/..."
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "247",
    "bestRating": "5"
  }
}
```

### 6.2 Tour Detail Pages (`/tours/[slug]/`)

```json
{
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  "name": "Mokulua Islands Kayak Adventure",
  "description": "...",
  "touristType": ["Adults", "Families", "Couples"],
  "provider": {
    "@type": "LocalBusiness",
    "@id": "https://activeoahutours.com/#organization",
    "name": "Active Oahu Tours"
  },
  "offers": {
    "@type": "Offer",
    "price": "149.00",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "validFrom": "2026-01-01",
    "url": "https://activeoahutours.com/tours/kayak-mokulua/"
  },
  "itinerary": {
    "@type": "Place",
    "name": "Mokulua Islands",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kailua",
      "addressRegion": "HI"
    }
  },
  "subjectOf": {
    "@type": "FAQPage",
    "mainEntity": [ ... ]
  }
}
```

### 6.3 Rental Pages (`/rentals/[slug]/`)

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Kayak Rental - Kailua Beach",
  "description": "...",
  "category": "Kayaks",
  "offers": {
    "@type": "Offer",
    "price": "69.00",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "LocalBusiness",
      "@id": "https://activeoahutours.com/#organization"
    }
  },
  "brand": {
    "@type": "Brand",
    "name": "Active Oahu Tours"
  }
}
```

### 6.4 Blog Posts (`/blog/[slug]/`)

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "The Ultimate Oahu Kayaking Guide",
  "description": "...",
  "image": "https://activeoahutours.com/images/blog/kayaking-guide.jpg",
  "datePublished": "2026-05-15",
  "dateModified": "2026-05-15",
  "author": {
    "@type": "Person",
    "name": "Active Oahu Tours Team",
    "url": "https://activeoahutours.com/about/"
  },
  "publisher": {
    "@type": "LocalBusiness",
    "@id": "https://activeoahutours.com/#organization"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://activeoahutours.com/blog/kayaking-oahu-guide/"
  }
}
```

### 6.5 FAQ Page (`/faq/`)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do I need kayaking experience?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No prior experience needed! ..."
      }
    }
  ]
}
```

### 6.6 Reviews Page (`/reviews/`)

```json
{
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "LocalBusiness",
    "@id": "https://activeoahutours.com/#organization"
  },
  "reviewBody": "...",
  "author": { "@type": "Person", "name": "..." },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5"
  }
}
```

### 6.7 Breadcrumbs (every page, injected via Breadcrumbs.astro)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://activeoahutours.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Tours",
      "item": "https://activeoahutours.com/#tours"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Mokulua Islands Kayak Adventure"
    }
  ]
}
```

### 6.8 Schema Presence Matrix

| Page Type | LocalBusiness | TouristTrip | Product | BlogPosting | FAQPage | BreadcrumbList | Review | AggregateRating |
|-----------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Home `/` | Yes | - | - | - | Yes | - | - | Yes |
| Tour `/tours/[slug]/` | - | Yes | - | - | Yes | Yes | - | - |
| Rental `/rentals/[slug]/` | Yes | - | Yes | - | - | Yes | - | - |
| Blog `/blog/[slug]/` | - | - | - | Yes | - | Yes | - | - |
| About `/about/` | Yes | - | - | - | - | Yes | - | - |
| Contact `/contact/` | Yes | - | - | - | - | Yes | - | - |
| FAQ `/faq/` | - | - | - | - | Yes | Yes | - | - |
| Reviews `/reviews/` | - | - | - | - | - | Yes | Yes | Yes |
| Gallery `/gallery/` | - | - | - | - | - | Yes | - | - |
| Join Team `/join-team/` | - | - | - | - | - | Yes | - | - |

---

## 7. Technical SEO Implementation

### 7.1 Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | 95+ |
| Lighthouse SEO | 100 |
| Core Web Vitals (LCP) | < 2.5s |
| Core Web Vitals (CLS) | < 0.1 |
| Core Web Vitals (INP) | < 200ms |
| Time to First Byte | < 500ms (Cloudflare CDN) |
| Total Page Weight | < 500KB |

### 7.2 Image Optimization

- All images in `public/images/` pre-optimized (WebP with JPEG fallback)
- Tour hero images: 1200x800px, < 150KB
- Thumbnails: 600x400px, < 50KB
- OG images: 1200x630px, < 100KB
- Lazy loading on below-fold images (`loading="lazy"`)
- `fetchpriority="high"` on hero/LCP images
- Responsive `srcset` via `<Image />` component (Astro built-in)

### 7.3 Font & Asset Loading

- System font stack with Inter via `@fontsource`
- CSS inlined for above-fold critical styles
- JS deferred/minimal (Astro islands only where interactivity needed)
- FareHarbor script loaded with `defer`

### 7.4 Canonicalization

- All pages self-canonicalize (`<link rel="canonical">`)
- `www.activeoahutours.com` -> `activeoahutours.com` (301 redirect)
- Trailing slash consistency enforced (Astro default: trailing slashes)
- HTTP -> HTTPS (HSTS preload via `_headers`)

### 7.5 robots.txt

```
User-agent: *
Allow: /
Disallow: /fareharbor-embed/
Sitemap: https://activeoahutours.com/sitemap.xml
```

### 7.6 Monitoring & Analytics

- Google Analytics 4 (G-XXXXXXXXXX) via Partytown for minimal main-thread impact
- Google Search Console (domain property + sitemap submission)
- Cloudflare Web Analytics (built-in, zero-config)

---

## 8. File System Map

```
active-oahu-tours/
|
+-- astro.config.mjs              # Astro config (site URL, integrations)
+-- tailwind.config.mjs           # Tailwind (navy, ocean, gold, cream, sand colors)
+-- tsconfig.json
+-- package.json
+-- wrangler.toml                 # Cloudflare Pages config
|
+-- public/
|   +-- _headers                  # Security headers, cache policies
|   +-- _redirects                # 301 redirect map (WordPress -> Astro)
|   +-- robots.txt
|   +-- favicon.ico
|   +-- images/
|   |   +-- og-default.jpg        # Default OG image (1200x630)
|   |   +-- hero-kayak.jpg        # Home page hero
|   |   +-- tours/                # Tour-specific images
|   |   |   +-- kayak-mokulua.jpg
|   |   |   +-- kayak-kaneohe.jpg
|   |   |   +-- kayak-kailua.jpg
|   |   |   +-- ebike-kailua.jpg
|   |   |   +-- ...
|   |   +-- rentals/              # Rental-specific images
|   |   +-- blog/                 # Blog featured images
|   |   +-- gallery/              # Gallery images
|   +-- favicon/
|
+-- src/
|   +-- env.d.ts
|   +-- content.config.ts         # Content collection schemas (tours + rentals + blog)
|   |
|   +-- content/
|   |   +-- tours/                # Tour MD files
|   |   |   +-- kayak-mokulua.md
|   |   |   +-- kayak-kaneohe.md
|   |   |   +-- kayak-kailua.md
|   |   |   +-- ebike-kailua.md
|   |   |   +-- kayak-self-guided.md
|   |   |   +-- ebike-lanikai.md
|   |   |   +-- snorkel-kailua.md
|   |   |   +-- surf-lesson-kailua.md
|   |   |
|   |   +-- rentals/              # NEW: Rental MD files
|   |   |   +-- kayak-rental.md
|   |   |   +-- ebike-rental.md
|   |   |   +-- snorkel-gear-rental.md
|   |   |   +-- beach-gear-rental.md
|   |   |   +-- sup-rental.md
|   |   |
|   |   +-- blog/                 # NEW: Blog MD files (20 posts)
|   |       +-- kayaking-oahu-guide.md
|   |       +-- best-beaches-kailua.md
|   |       +-- oahu-outdoor-activities.md
|   |       +-- ... (see Section 1.4 for full list)
|   |
|   +-- pages/
|   |   +-- index.astro           # Home page
|   |   +-- about.astro           # NEW: /about/
|   |   +-- contact.astro         # NEW: /contact/
|   |   +-- faq.astro             # NEW: /faq/ (standalone FAQ page)
|   |   +-- cancellation.astro    # NEW: /cancellation/
|   |   +-- privacy.astro         # NEW: /privacy/
|   |   +-- reviews.astro         # NEW: /reviews/
|   |   +-- gallery.astro         # NEW: /gallery/
|   |   +-- join-team.astro       # NEW: /join-team/
|   |   +-- awards.astro          # NEW: /awards/
|   |   +-- sitemap.xml.js        # NEW: Dynamic sitemap generation
|   |   +-- robots.txt.ts         # NEW: Dynamic robots.txt
|   |   |
|   |   +-- tours/
|   |   |   +-- [slug].astro      # Tour detail template (existing)
|   |   |
|   |   +-- rentals/              # NEW
|   |   |   +-- [slug].astro      # Rental detail template
|   |   |
|   |   +-- blog/                 # NEW
|   |       +-- index.astro       # Blog listing (paginated)
|   |       +-- [slug].astro      # Blog post template
|   |
|   +-- layouts/
|   |   +-- BaseLayout.astro      # Shell layout (nav, footer, meta, schema slot)
|   |
|   +-- components/
|   |   +-- HeroSection.astro     # Full-viewport hero
|   |   +-- TourCard.astro        # Tour listing card
|   |   +-- FAQ.astro             # Accordion FAQ + schema
|   |   +-- RentalCard.astro      # NEW: Rental listing card
|   |   +-- BlogCard.astro        # NEW: Blog listing card
|   |   +-- ReviewCarousel.astro  # NEW: Review display
|   |   +-- GalleryGrid.astro     # NEW: Image gallery grid
|   |   +-- Breadcrumbs.astro     # NEW: Breadcrumb nav + schema
|   |   +-- FareHarborBooking.astro # NEW: Reusable booking embed
|   |   +-- SEOSchema.astro       # NEW: Reusable JSON-LD injector
|   |   +-- NewsletterSignup.astro # NEW: Optional email capture
|   |
|   +-- styles/
|       +-- global.css            # Tailwind directives
|
+-- dist/                         # Build output -> deployed to Cloudflare Pages
+-- ARCHITECTURE.md               # This file
+-- SWITCHOVER-CHECKLIST.md       # DNS switchover checklist
+-- README.md
```

---

*Document version: 1.0 - Last updated: 2026-05-31*
*Next review: Post-migration + 30 days*
