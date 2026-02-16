# Revive — Recover Failed Payments on Autopilot

<p align="center">
  <a href="https://revive-hq.com">
    <img src="public/icon.svg" width="80" alt="Revive Logo" />
  </a>
</p>

<p align="center">
  <strong>Smart payment retries + dunning emails for SaaS companies on Stripe</strong>
</p>

<p align="center">
  <a href="https://revive-hq.com">Live Site</a> •
  <a href="https://revive-hq.com/pricing">Pricing</a> •
  <a href="https://revive-hq.com/dashboard">Dashboard</a> •
  <a href="https://revive-hq.com/faq">FAQ</a>
</p>

---

## 🚀 What is Revive?

Revive automatically recovers failed payments from your Stripe account using:

- **🤖 Smart Retry Engine** — ML-powered retry timing based on decline codes
- **📧 Dunning Email Sequences** — Personalized recovery emails with one-click card updates
- **📊 Real-Time Dashboard** — Track every dollar recovered
- **🔗 One-Click Setup** — Connect Stripe via OAuth in 3 minutes

**Zero engineering required. Zero risk. Pay only when we recover.**

---

## 💰 How It Works

1. **Connect Stripe** — One-click OAuth. No API keys, no webhooks, no code.
2. **We Detect & Recover** — Smart retries + personalized dunning emails.
3. **Watch Revenue Grow** — Real-time dashboard shows every dollar recovered.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **AI-Powered Smart Retries** | Analyzes decline codes to optimize retry timing. 3.2x higher recovery vs random retries. |
| **Dunning Email Sequences** | Behavior-triggered emails with 68% average open rate. |
| **Payday Detection** | `insufficient_funds` failures retry on 1st, 15th, and Fridays. |
| **Stripe Native Integration** | Connect in one click via OAuth. |
| **Bank-Grade Security** | SOC 2 compliant. Encrypted at rest and in transit. |
| **Real-Time Analytics** | See exactly how much revenue you've recovered. |

---

## 🛠 Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript 5
- **Styling:** TailwindCSS 3.4
- **Database:** Upstash Redis
- **Payments:** Stripe SDK (Connect OAuth)
- **Email:** Resend
- **Hosting:** Vercel
- **Analytics:** Vercel Analytics

---

## 📦 Getting Started

### Prerequisites

- Node.js 20+
- Stripe account
- Upstash Redis (optional, in-memory fallback available)
- Resend account (optional, console logging fallback available)

### Installation

```bash
# Clone the repository
git clone https://github.com/tahseen137/revive.git
cd revive

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your keys

# Run development server
npm run dev
```

### Environment Variables

```bash
# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_CONNECT_CLIENT_ID=ca_...

# Database (Upstash Redis)
KV_REST_API_URL=https://...
KV_REST_API_TOKEN=...

# Email (Resend)
RESEND_API_KEY=re_...
EMAIL_FROM=billing@yourdomain.com

# App
NEXT_PUBLIC_APP_URL=https://revive-hq.com
CARD_UPDATE_SECRET=your-secret-for-hmac
REVIVE_API_KEY=your-admin-api-key
```

---

## 📂 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── webhooks/      # Stripe webhooks
│   │   ├── cron/          # Scheduled jobs
│   │   └── ...
│   ├── dashboard/         # Dashboard pages
│   ├── blog/              # SEO content
│   └── ...
├── components/            # React components
└── lib/                   # Core business logic
    ├── db.ts              # Database abstraction
    ├── retry-engine.ts    # Smart retry logic
    ├── email-service.ts   # Email sending
    └── ...
```

---

## 🔄 Smart Retry Engine

Revive uses intelligent retry strategies based on failure codes:

| Failure Code | Strategy | Timing |
|--------------|----------|--------|
| `card_declined` | Standard retry | 4h → 24h → 72h @ 10am |
| `insufficient_funds` | Payday detection | 1st, 15th, Fridays @ 10am |
| `expired_card` | Dunning only | Immediate email, no retries |
| `processing_error` | Fast retry | 1h |

---

## 💵 Pricing

| Plan | Price | Best For |
|------|-------|----------|
| **Free** | $0 | First $500/month recovered |
| **Growth** | 15% of recovered (max $99/mo) | SaaS companies serious about churn |
| **Scale** | 10% of recovered | High-volume ($10K+/month) |

**No monthly fees. No setup costs. Pay only when we recover.**

---

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines first.

```bash
# Run linting
npm run lint

# Run build
npm run build
```

---

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

---

## 🔗 Links

- **Website:** [revive-hq.com](https://revive-hq.com)
- **Pricing:** [revive-hq.com/pricing](https://revive-hq.com/pricing)
- **Documentation:** [revive-hq.com/docs](https://revive-hq.com/docs)
- **Twitter:** [@revivehq](https://twitter.com/revivehq)

---

<p align="center">
  <strong>Built for SaaS companies that refuse to lose revenue.</strong>
</p>
