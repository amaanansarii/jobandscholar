# Job & Scholar – Government Jobs Portal

A modern, SEO-optimized government jobs and education portal built with Next.js 15+, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Google Sheets CMS** – Manage all content from a Google Sheet (no coding needed)
- **Dynamic Routing** – SEO-friendly URLs like `/jobs/ssc-cgl-2026`
- **Server-Side Rendering** – Fast page loads with ISR (revalidates every 5 minutes)
- **SEO Optimized** – Dynamic meta tags, OG tags, sitemap.xml, robots.txt
- **Mobile First** – Fully responsive on all devices
- **Demo Mode** – Works out-of-the-box with sample data when Sheet is not configured

## 📋 Google Sheets Setup

### Step 1: Create Your Google Sheet

Create a new Google Sheet with these **exact column names** in Row 1:

| Column | Name |
|--------|------|
| A | ID |
| B | Title |
| C | Slug |
| D | Category |
| E | Department |
| F | Publish Date |
| G | Last Date |
| H | Overview |
| I | Important Dates |
| J | Application Fee |
| K | Age Limit |
| L | Eligibility |
| M | Vacancy Details |
| N | Selection Process |
| O | Exam Pattern |
| P | Syllabus |
| Q | Official Notification Link |
| R | Apply Link |
| S | Official Website Link |
| T | Admit Card Link |
| U | Result Link |
| V | Status |
| W | Featured |

### Step 2: Publish the Sheet

1. Go to **File → Share → Publish to web**
2. Select **Sheet1** and **CSV format**
3. Click **Publish** and copy the URL
4. Your Sheet ID is the long string in the URL: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/...`

### Step 3: Set Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_GOOGLE_SHEET_ID=your_sheet_id_here
NEXT_PUBLIC_SHEET_NAME=Sheet1
NEXT_PUBLIC_CONTACT_FORM_URL=your_google_form_url_here
```

### Category Values (Column D)
- `jobs` – Government job notifications
- `admit-card` – Admit card releases
- `results` – Exam results
- `syllabus` – Syllabus updates
- `upcoming-exams` – Upcoming exam schedules

### Status Values (Column V)
- `active` – Show on all pages
- `upcoming` – Show with "Upcoming" badge
- `expired` – Hide from listings

### Featured (Column W)
- `true` or `1` – Show with 🔥 HOT badge
- `false` or `0` – Normal listing

## 🛠️ Installation & Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
job-scholar/
├── app/
│   ├── page.tsx              # Homepage
│   ├── layout.tsx            # Root layout with Navbar + Footer
│   ├── globals.css           # Global styles + CSS variables
│   ├── sitemap.ts            # Dynamic sitemap
│   ├── robots.ts             # robots.txt
│   ├── jobs/
│   │   ├── page.tsx          # Jobs listing page
│   │   └── [slug]/page.tsx   # Job detail page
│   ├── admit-card/           # Same structure
│   ├── results/              # Same structure
│   ├── syllabus/             # Same structure
│   ├── upcoming-exams/       # Same structure
│   └── contact/page.tsx      # Contact form
├── components/
│   ├── Navbar.tsx            # Sticky navbar with mobile menu
│   ├── Footer.tsx            # Footer with links
│   ├── NotificationCard.tsx  # Card for listing pages
│   ├── NotificationDetail.tsx # Full detail page component
│   ├── CategoryPage.tsx      # Reusable category listing
│   └── SectionHeader.tsx     # Section headers with accent
├── lib/
│   └── sheets.ts             # Google Sheets CMS integration
└── types/
    └── index.ts              # TypeScript interfaces
```

## 🎨 Customization

### Colors (globals.css)
```css
:root {
  --primary: #1a3c6e;        /* Dark navy blue */
  --primary-dark: #0f2547;   /* Darker navy */
  --primary-light: #2d5ba3;  /* Lighter blue */
  --accent: #e85d04;         /* Orange accent */
  --accent-light: #f48c06;   /* Light orange */
}
```

### Site URL (for SEO)
Update `metadataBase` in `app/layout.tsx`:
```tsx
metadataBase: new URL('https://yourdomain.com'),
```
Also update the base URL in `app/sitemap.ts`.

## 📞 Contact Form Setup

1. Create a Google Form with fields: Name, Email, Mobile, Message
2. Get the form's POST URL (from prefilled link → replace `/viewform` with `/formResponse`)
3. Get the `entry.XXXXXXXXX` IDs for each field
4. Update `app/contact/page.tsx` with your entry IDs
5. Set `NEXT_PUBLIC_CONTACT_FORM_URL` in `.env.local`

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```
Add environment variables in Vercel dashboard under Settings → Environment Variables.

### Other Platforms
The app builds to a standard Next.js output compatible with any Node.js host.

## 📈 SEO Features

- Dynamic `<title>` and `<meta description>` per page
- Open Graph tags for social sharing
- Structured data ready
- `sitemap.xml` auto-generated from Google Sheets data
- `robots.txt` configured
- ISR (Incremental Static Regeneration) – content refreshes every 5 minutes
- Semantic HTML structure

## 🔧 Google Sheet Tips

- **Slug** should be URL-friendly: `ssc-cgl-2026` not `SSC CGL 2026`
- **Dates** format: `YYYY-MM-DD` (e.g., `2026-07-15`)
- **Multiline content** in cells: Use line breaks inside the cell (Alt+Enter)
- Leave cells blank if data is not available – the portal handles empty fields gracefully
- Add rows at the bottom; the sheet is read top-to-bottom

---

Built with ❤️ for India's job seekers | © 2026 Job & Scholar
