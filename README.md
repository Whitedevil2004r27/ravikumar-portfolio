# 🚀 Ravikumar J — AI-Powered Developer Portfolio

[![Live Demo](https://img.shields.io/badge/Live%20Demo-ravikumar--portfolio--three.vercel.app-00F5FF?style=for-the-badge&logo=vercel&logoColor=white)](https://ravikumar-portfolio-three.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

A premium, futuristic, and fully dynamic personal portfolio for **Ravikumar J** — an AI-Powered Full Stack Developer. Built with Next.js 16 (Turbopack), Supabase, Framer Motion, and a customized Gemini AI assistant.

---

## ✨ Features

### 🎨 UI & Design
- **Interactive DotField Hero** — WebGL-powered particle background that reacts to mouse movement
- **Live Status Indicator** — Real-time "Available for Hire" pill fetched from Supabase
- **Glassmorphism Design System** — Neon-cyan accent (`#00F5FF`) on a deep dark background
- **MagicBento Capabilities Grid** — Interactive hover-glow bento cards for core skills
- **SplashCursor** — Fluid WebGL cursor trail that follows the user's mouse

### 📱 Navigation
- **Desktop Navbar** — Floating glass pill, centered at the top, shrinks on scroll
- **Mobile Top Navbar** — Transparent header with animated hamburger dropdown menu
- **Scroll-aware Active State** — Highlights the current section in both navbars

### 🗂 Sections
| Section | Description |
|---|---|
| **Hero** | Full-screen with DotField, Live Status, animated name and CTA buttons |
| **About** | Dual-column bio with dynamic scrolling skill tags (LogoLoop) fetched from Supabase |
| **Capabilities** | MagicBento grid showcasing core technical domains |
| **Experience** | Responsive vertical timeline — alternating on desktop, left-aligned on mobile |
| **Projects** | Live GitHub repository cards, auto-filtered by category, fetched via GitHub API |
| **Contact** | Form with Supabase storage + Web3Forms email notification, plus social links |

### 🤖 AI Assistant — "Delulu"
- Powered by **Google Gemini 1.5 Flash**
- **RAG (Retrieval-Augmented Generation)** — Dynamically fetches latest GitHub repos for real-time project context
- Curated personality bio in `lib/ai-knowledge.ts`
- **Suggested Questions** shown on first open
- Elegant animated chat UI with typing indicator

### 🗄 Backend (Supabase)
| Table | Purpose |
|---|---|
| `status` | Powers the Live Status indicator in the Hero section |
| `skills` | Dynamic skills displayed in the About / Expertise section |
| `experience` | Career milestones displayed in the Experience Timeline |
| `contact_messages` | Stores all contact form submissions |

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| **Framework** | Next.js 16.2.4 (App Router, Turbopack) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS + Custom CSS Variables |
| **Animations** | Framer Motion |
| **3D / WebGL** | DotField, GridScan, SplashCursor (React Bits) |
| **Database** | Supabase (PostgreSQL) |
| **AI** | Google Gemini 1.5 Flash via `@google/generative-ai` |
| **Contact** | Web3Forms API |
| **Deployment** | Vercel |
| **Icons** | Lucide React |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A [Supabase](https://supabase.com/) account
- A [Gemini API Key](https://aistudio.google.com/app/apikey) (free)
- A [Web3Forms](https://web3forms.com/) key (free)
- A [GitHub Personal Access Token](https://github.com/settings/tokens) (optional, prevents rate limiting)

### 1. Clone & Install

```bash
git clone https://github.com/Whitedevil2004r27/ravikumar-portfolio.git
cd ravikumar-portfolio
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root:

```env
# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# GitHub (optional — prevents API rate limiting)
GITHUB_TOKEN=your_github_token

# Web3Forms (contact form email notifications)
NEXT_PUBLIC_WEB3FORMS_KEY=your_web3forms_key

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Supabase Database Setup

Run this SQL in your **Supabase SQL Editor**:

```sql
-- Status table
CREATE TABLE IF NOT EXISTS public.status (
    id SERIAL PRIMARY KEY,
    status TEXT NOT NULL,
    is_active BOOLEAN DEFAULT false,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Skills table
CREATE TABLE IF NOT EXISTS public.skills (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT
);

-- Experience table
CREATE TABLE IF NOT EXISTS public.experience (
    id SERIAL PRIMARY KEY,
    year TEXT NOT NULL,
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    description TEXT[] NOT NULL,
    order_index INT DEFAULT 0
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.status ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public Read" ON public.status FOR SELECT USING (true);
CREATE POLICY "Public Read" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Public Read" ON public.experience FOR SELECT USING (true);
CREATE POLICY "Public Insert" ON public.contact_messages FOR INSERT WITH CHECK (true);

-- Seed data
INSERT INTO public.status (status, is_active) VALUES ('Available for hire', true);
INSERT INTO public.skills (name) VALUES ('Next.js'), ('React'), ('TypeScript'), ('Node.js'), ('Python'), ('Supabase'), ('AI / LLMs'), ('Framer Motion');
INSERT INTO public.experience (year, role, company, description, order_index) VALUES 
  ('2023 - Present', 'AI Full Stack Developer', 'Freelance', ARRAY['Building 3D web apps with Three.js', 'Integrating Gemini AI into production', 'Next.js + Supabase architecture'], 1),
  ('2022 - 2023', 'Full Stack Developer', 'CertiFind', ARRAY['Built course verification platform', 'Real-time Supabase subscriptions', 'Optimized DB queries by 60%'], 2);
```

### 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

---

## 📁 Project Structure

```
ravikumar-portfolio/
├── app/
│   ├── api/chat/route.ts       # Gemini AI RAG chat endpoint
│   ├── layout.tsx              # Root layout (Navbar, AIChat, SplashCursor)
│   └── page.tsx                # Main page composition
├── components/
│   ├── Navbar.tsx              # Desktop + Mobile top navbar
│   ├── Hero.tsx                # Hero section with DotField + LiveStatus
│   ├── About.tsx               # Bio + dynamic skills LogoLoop
│   ├── MagicBento.jsx          # Capabilities bento grid (React Bits)
│   ├── Experience.tsx          # Responsive career timeline
│   ├── Projects.tsx            # GitHub-powered project cards
│   ├── Contact.tsx             # Supabase + Web3Forms contact form
│   ├── AIChat.tsx              # Delulu AI chat assistant UI
│   ├── LiveStatus.tsx          # Real-time status pill (Supabase)
│   ├── DotField.jsx            # WebGL interactive dot background
│   ├── GridScan.jsx            # WebGL scanning grid for contact bg
│   ├── SplashCursor.jsx        # Fluid cursor trail effect
│   └── LogoLoop.jsx            # Infinite scrolling skill tags
├── lib/
│   ├── supabase.ts             # Supabase client initialization
│   ├── github.ts               # GitHub API fetching utilities
│   └── ai-knowledge.ts         # Delulu AI bio, traits & suggested questions
└── styles/
    └── globals.css             # Design tokens, glass-card, btn-primary etc.
```

---

## 🌐 Deployment (Vercel)

1. Push your code to GitHub.
2. Connect the repo to [Vercel](https://vercel.com/).
3. Add all environment variables from `.env.local` to **Project Settings → Environment Variables**.
4. Deploy — Vercel automatically rebuilds on every `git push`.

---

## 🔒 Security Notes

> [!CAUTION]
> - **Never commit** `.env.local` to GitHub (it is already in `.gitignore`).
> - Use the **Supabase Anon Key** only for `NEXT_PUBLIC_*` variables — never the `service_role` key.
> - Revoke and rotate any GitHub Personal Access Tokens that have been shared in plain text.

---

## 👤 Author

**Ravikumar J**
- GitHub: [@Whitedevil2004r27](https://github.com/Whitedevil2004r27)
- LinkedIn: [ravikumarj27](https://www.linkedin.com/in/ravikumarj27)
- Portfolio: [ravikumar-portfolio-three.vercel.app](https://ravikumar-portfolio-three.vercel.app/)

---

*Built with ❤️ using Next.js, Framer Motion, Supabase & Gemini AI*
