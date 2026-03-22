# evokoa-qr-landing

A static QR code landing page for the Evokoa leadership team. Visitors can view team member profiles, download vCard contacts, and reach out via WhatsApp.

## Project Structure

```
evokoa-qr-landing/
├── namecard/           # Static site (deploy root)
│   ├── index.html      # Main page — leadership team cards
│   ├── styles.css      # Styling
│   ├── script.js       # Client-side logic
│   ├── logo.svg        # Evokoa logo
│   ├── damien.vcf      # vCard — Damien Lim (CTO)
│   ├── dale.vcf        # vCard — Dale Everett Ng (COO)
│   └── dalton.vcf      # vCard — Dalton Prescott Ng (CEO)
```

## Deployment

Hosted on **Cloudflare Pages**. The deploy root is the `namecard/` directory.

### Deploy via CLI

```bash
npx wrangler pages deploy namecard/
```

On first deploy, Wrangler will prompt you to create or link a Cloudflare Pages project.

### Prerequisites

- A [Cloudflare account](https://dash.cloudflare.com)
- Authenticated Wrangler session:
  ```bash
  npx wrangler login
  ```

### Manual Deploy (Dashboard)

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create**
2. Choose **Pages** → **Upload assets**
3. Upload the contents of the `namecard/` folder

## Team

| Name | Role |
|------|------|
| Dalton Prescott Ng | Founder, CEO |
| Dale Everett Ng | Founder, COO |
| Damien Lim | Founder, CTO |

## Contact

[team@evokoa.com](mailto:team@evokoa.com) · [evokoa.com](https://www.evokoa.com)
