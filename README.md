# LokSetu

**From Complaint to Community Action**

LokSetu is a mobile-first civic-tech platform that enables citizens to report local civic issues such as potholes, broken streetlights, garbage dumps, and water leakage using image proof and geolocation.

It improves transparency and community participation in civic issue reporting by allowing users to support issues through upvotes. Once an issue reaches a vote threshold, the platform automatically marks it for escalation, simulating a real-world authority escalation workflow.

---

## Live Demo

- **Frontend:** [[Click Here!](https://loksetu-six.vercel.app/)]
- **Backend:** [[Click Here!](https://loksetu-9m2u.onrender.com)]

---

## Features

### User Features
- User registration and login
- JWT-based authentication
- Report civic issues with title, description, category, image proof, address, and geolocation
- Auto-fill current location using browser geolocation
- View all issues in a public feed
- View detailed issue pages
- Upvote issues
- View, edit, and delete own reports
- Profile page

### Admin Features
- Admin-only protected route
- View all reported issues
- Update issue status:
  - open
  - in_progress
  - resolved
  - escalated

### Escalation Workflow
- Automatic escalation when an issue reaches the upvote threshold
- Escalation message generation stored with issue data
- Visual escalation status on frontend

---

## Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Axios
- Context API
- Plain CSS
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Multer
- Cloudinary

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas
- Image Hosting: Cloudinary

---
## Future Improvements
- Real Twitter/X API integration for escalation posting
- Interactive map view with issue markers
- Comments on issues
- Notifications
- Better admin analytics dashboard
- Public transparency dashboard
- Advanced filtering and search

## Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/loksetu.git
cd loksetu
