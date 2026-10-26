# Luxury Jewellery Video Creator Portfolio

A high-converting, single-page portfolio website tailored for a freelance creator producing AI-generated jewellery UGC ads and 3D motion films for fine jewellery brands.

Built with a dark, minimal, luxury aesthetic:
- **Background**: Near-black (`#0B0B0C`)
- **Accent**: One warm polished gold (`#C9A24B`)
- **Typography**: Editorial serif (*Cormorant Garamond*) and crisp sans-serif (*Inter*)
- **Motion**: Subtle scroll reveals and smooth video preview hovers
- **Technology**: Clean Vanilla HTML5, CSS3, and modern JavaScript (Zero build step required, 100% static, fast, and Cloudflare Pages ready).

---

## File Structure

```text
portfolio-website/
├── index.html                   # Semantic, accessible single-page markup
├── style.css                    # Luxury dark design system, responsive styles, animations
├── main.js                      # Top-level VIDEOS config, lightbox player, form & interactions
├── assets/
│   ├── favicon.svg              # Gold gem vector favicon
│   ├── posters/                 # High-resolution thumbnail images
│   │   ├── ugc-1.jpg
│   │   ├── ugc-2.jpg
│   │   └── motion-1-vertical.jpg
│   └── previews/                # Lightweight muted preview loops (600KB - 1.5MB)
│       ├── ugc-1-preview.mp4
│       ├── ugc-2-preview.mp4
│       └── motion-1-preview-9x16.mp4
└── videos/                      # Full-resolution master videos
    ├── ugc-1.mp4
    ├── ugc-2.mp4
    └── 3D-motion.mp4
```

---

## 1. How to Replace Video & Poster URLs

All video and poster URLs are centralized in **one configuration object** at the top of `main.js`:

```javascript
const VIDEOS = [
  {
    id: "ugc-1",
    title: "The Heirloom Unboxing",
    type: "ugc",
    ratio: "9:16",
    concept: "Authentic creator first-person unboxing driving high-intent checkout for fine choker sets.",
    src: "videos/ugc-1.mp4",
    preview: "assets/previews/ugc-1-preview.mp4",
    poster: "assets/posters/ugc-1.jpg"
  },
  {
    id: "ugc-2",
    title: "Everyday Velvet Touch",
    type: "ugc",
    ratio: "9:16",
    concept: "Relatable lifestyle try-on highlighting tactile unboxing and effortless daily elegance.",
    src: "videos/ugc-2.mp4",
    preview: "assets/previews/ugc-2-preview.mp4",
    poster: "assets/posters/ugc-2.jpg"
  },
  {
    id: "motion-1",
    title: "Heritage Temple Gold",
    type: "motion",
    ratio: "9:16",
    concept: "Cinematic 3D camera glide capturing museum-grade craftsmanship and gemstone radiance.",
    src: "videos/3D-motion.mp4",
    preview: "assets/previews/motion-1-preview-9x16.mp4",
    poster: "assets/posters/motion-1-vertical.jpg"
  }
];
```

> **Graceful Degradation Guarantee**: If any video URL is a placeholder or fails to load, the website will **never break**. It cleanly displays the high-resolution poster image and shows a tasteful demo badge.

---

## 2. How to Customize Creator Contact Info

In `main.js`, update the `CONFIG` object with your details:

```javascript
const CONFIG = {
  studioName: "brand AI ads",
  creatorName: "Arun Vijay",
  whatsappPhone: "916302705710", // Country code + 10-digit number
  whatsappDefaultMessage: "Hi, I saw your portfolio and want a jewellery video.",
  email: "arunvijaysnav.business@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/arunvijaysnav/",
  turnaroundDays: "3–5 business days"
};
```

All WhatsApp buttons, email links, social handles, and turnaround badges across the entire site update automatically.

---

## 3. Local Testing

To preview the website locally on your computer:

```bash
# Using Python 3 (built-in on macOS/Linux)
python3 -m http.server 3000

# Or using npx
npx serve .
```

Then open `http://localhost:3000` in your web browser.

---

## 4. Deploying to Cloudflare Pages

Because this is a pure static website with no build step required, deployment takes less than 60 seconds.

### Option A: Via GitHub (Recommended for automatic updates)
1. Push this folder to your GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of jewellery portfolio"
   git branch -M main
   git remote add origin https://github.com/your-username/your-repo-name.git
   git push -u origin main
   ```
2. Go to the [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
3. Select your repository.
4. Set build settings:
   - **Framework preset**: `None`
   - **Build command**: *(leave blank)*
   - **Build output directory**: `.` *(current directory / root)*
5. Click **Save and Deploy**. Your site will be live on `*.pages.dev` with a free SSL certificate and global CDN caching.

### Option B: Direct Upload via Cloudflare Dashboard
1. Go to **Workers & Pages** → **Create application** → **Pages** → **Upload assets**.
2. Drag and drop the `portfolio-website` folder directly into the browser.
3. Click **Deploy Site**.

### Option C: Using Wrangler CLI
```bash
npx wrangler pages deploy . --project-name jewellery-portfolio
```

---

## Features & Accessibility

- **Mobile First**: Fluid typography using `clamp()`, responsive layouts for all viewports.
- **Performance**: Previews are optimized for instant hover playback with zero buffering lag.
- **Accessibility**: ARIA labels, native `<dialog>` with focus trap and light dismiss, visible `:focus-visible` outlines, and full support for `prefers-reduced-motion`.
- **SEO & Social Cards**: Pre-configured Open Graph, Twitter cards, meta description, and SVG favicon.
