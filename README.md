# 🎯 TouchTrack - B2B Marketing Attribution Tracker

A full-stack TypeScript application that tracks and visualizes buyer journeys for B2B companies. Built to understand how marketing touchpoints (email opens, website visits, demo requests) influence conversion in complex B2B sales cycles.

## 🚀 Live Demo

- **Frontend:** [https://your-app.vercel.app](https://your-app.vercel.app)
- **API:** [https://your-api.onrender.com](https://your-api.onrender.com)

## 🎥 Screenshots

[Add 2-3 screenshots of your app here]

## 💡 Why I Built This

After learning about how companies like HockeyStack are automating B2B sales and marketing workflows, I wanted to understand the core problem they're solving: **multi-touch attribution**. In B2B, buyers don't convert after one interaction—they engage across multiple channels (email, LinkedIn, website, webinars) over weeks or months. This project helped me understand how to:

- Track behavioral data across channels
- Design schemas for event-driven data
- Build REST APIs for high-volume event ingestion
- Visualize buyer journeys to surface insights

## 🛠️ Tech Stack

**Backend:**
- Node.js + Express + TypeScript
- PostgreSQL with indexed queries
- RESTful API design
- Deployed on Render

**Frontend:**
- React + TypeScript
- Tailwind CSS for styling
- Recharts for data visualization
- React Router for navigation
- Deployed on Vercel

## ✨ Features

- **Account Management:** Track multiple B2B companies
- **Touchpoint Tracking:** Log interactions across 5 channels (email, LinkedIn, Google Ads, organic, direct)
- **Timeline Visualization:** See the complete buyer journey for each account
- **Analytics Dashboard:** Summary stats and charts showing touchpoint distribution
- **Real-time Updates:** Instant visualization of new touchpoints

## 🏗️ Architecture

```
┌─────────────┐         ┌──────────────┐         ┌──────────────┐
│   React     │ ◄─────► │  Express API │ ◄─────► │  PostgreSQL  │
│  Frontend   │  REST   │   (Node.js)  │  Queries│   Database   │
└─────────────┘         └──────────────┘         └──────────────┘
```

## 📊 Database Schema

**Accounts Table:**
- `id`, `company_name`, `industry`, `created_at`

**Touchpoints Table:**
- `id`, `account_id` (FK), `touchpoint_type`, `channel`, `page_url`, `description`, `created_at`
- Indexed on `account_id`, `created_at`, `touchpoint_type` for fast queries

## 🚀 Local Development

### Backend Setup

```bash
# Clone repo
git clone https://github.com/yourusername/touchtrack-backend
cd touchtrack-backend

# Install dependencies
npm install

# Create database
createdb touchtrack

# Set environment variables
echo "DATABASE_URL=postgresql://localhost/touchtrack" > .env

# Seed database
npm run seed

# Start server
npm run dev
```

### Frontend Setup

```bash
# Clone repo
git clone https://github.com/yourusername/touchtrack-frontend
cd touchtrack-frontend

# Install dependencies
npm install

# Set API URL
echo "VITE_API_URL=http://localhost:5000" > .env

# Start dev server
npm run dev
```

## 📡 API Endpoints

```
GET    /api/accounts              # List all accounts with stats
GET    /api/accounts/:id          # Get single account
POST   /api/accounts              # Create new account
GET    /api/accounts/:id/timeline # Get account's touchpoint timeline

GET    /api/touchpoints           # List touchpoints (with filters)
POST   /api/touchpoints           # Create new touchpoint

GET    /api/analytics             # Get summary analytics
GET    /api/analytics/recent      # Get recent activity
```

## 🎯 What I Learned

**Technical:**
- Designing event-driven database schemas with proper indexing
- Building type-safe APIs with TypeScript
- Handling time-series data efficiently
- Deploying full-stack apps with separate frontend/backend

**Product Thinking:**
- How B2B attribution differs from e-commerce tracking
- Why visualizing buyer journeys helps sales teams prioritize accounts
- The importance of multi-channel data integration

## 🔮 Future Improvements

If I had more time, I'd add:
- User authentication and multi-tenancy
- Webhook integrations for real-time event ingestion
- Predictive scoring (which accounts are most likely to convert)
- Email/Slack notifications for high-value touchpoints
- More sophisticated attribution models (first-touch, last-touch, multi-touch)


## 👤 Author

**Vatsal Dalal**
- Email: vatsalketankumardalal@gmail.com
- LinkedIn: [linkedin.com/in/vatsal-dalal](https://linkedin.com/in/vatsal-dalal)
- GitHub: [@vatsal9117](https://github.com/vatsal9117)

## 📄 License

MIT

---

*Built as a learning project to understand B2B marketing attribution and full-stack TypeScript development.*
