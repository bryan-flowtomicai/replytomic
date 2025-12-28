# ReplyTomic - AI Reply Generator for Social Media

Generate AI-powered replies for YouTube, Instagram, TikTok, Twitter, LinkedIn, Facebook, and Reddit. Save 10+ hours per week responding to comments.

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Accounts for:
  - Clerk (authentication)
  - Anthropic (Claude API)
  - Stripe (payments)
  - Supabase (database)

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with your environment variables (see `.env.local.example`)

4. Set up your Supabase database by running the SQL schema provided in the spec file

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Shadcn/ui** components
- **Clerk** for authentication
- **Anthropic Claude API** (Sonnet 4) for AI
- **Stripe** for payments
- **Supabase** for database

## Features

- ✅ Multi-platform support (YouTube, Instagram, TikTok, Twitter, LinkedIn, Facebook, Reddit, Discord)
- ✅ Platform-optimized replies with character limits and style matching
- ✅ Multiple tone options (Helpful, Casual, Witty, Professional, Engaging)
- ✅ Usage tracking and tier limits
- ✅ Copy-to-clipboard functionality
- ✅ Responsive design

## Project Structure

```
/app
  /api          # API routes
  /dashboard    # Main dashboard page
  /sign-in      # Clerk sign-in page
  /sign-up      # Clerk sign-up page
/components
  /ui           # Shadcn UI components
/lib
  platform-config.ts  # Platform configurations
  supabase.ts         # Supabase client
  utils.ts            # Utility functions
```

## Environment Variables

See `.env.local.example` for required environment variables.

## License

Private - All rights reserved
