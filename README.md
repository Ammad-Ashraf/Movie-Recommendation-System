# 🎬 Movie Recommendation System API

A comprehensive RESTful API built with Node.js, Express, and MongoDB that provides intelligent movie recommendations, user management, reviews, news, and more.

<div align="center">

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-green.svg)](https://www.mongodb.com)
[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

</div>

## 📋 Table of Contents

- [Features](#-features)
- [System Architecture](#-system-architecture)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [API Documentation](#-api-documentation)
- [Security](#-security)
- [Error Handling](#-error-handling)
- [File Management](#-file-management)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Support](#-support)

## ✨ Features

- 🎬 **Movie Management**
  - Comprehensive movie details
  - Advanced search and filtering
  - Genre-based categorization
  
- 👥 **User System**
  - Secure authentication
  - Role-based authorization
  - Profile management
  
- ⭐ **Reviews & Ratings**
  - User reviews with ratings
  - Review moderation
  - Helpful votes system
  
- 📰 **News System**
  - Movie industry news
  - Release announcements
  - Celebrity updates
  
- 📋 **Custom Lists**
  - Personal watchlists
  - Favorite collections
  - Public/private lists
  
- 🎯 **Smart Recommendations**
  - Personalized suggestions
  - Similar movie finder
  - Trending recommendations
  
- 🔍 **Advanced Search**
  - Full-text search
  - Filters and sorting
  - Auto-complete suggestions
  
- 👨‍👩‍👦 **Cast & Crew**
  - Detailed filmographies
  - Award information
  - Biography management

## 🏗 System Architecture

```
├── API Layer
│   ├── REST Endpoints
│   ├── Request Validation
│   └── Response Formatting
│
├── Business Logic
│   ├── Movie Service
│   ├── User Service
│   ├── Recommendation Engine
│   └── Search Service
│
├── Data Layer
│   ├── MongoDB Models
│   ├── Data Access Objects
│   └── Caching (Redis)
│
└── Infrastructure
    ├── Authentication
    ├── Logging
    ├── File Storage
    └── Error Handling
```

## 🚀 Prerequisites

- Node.js (>= 16.0.0)
- MongoDB (>= 4.4)
- npm or yarn
- Redis (optional, for caching)

## 💻 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-name>
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

## ⚙️ Configuration

Create a `.env` file with the following variables:

```env
# Server Configuration
PORT=5001
NODE_ENV=development

# Database
MONGO_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=24h

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100

# File Upload
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png

# Optional Redis Cache
REDIS_URL=your_redis_url
```

## 📚 API Documentation

### Interactive Documentation
Access Swagger UI at: `http://localhost:5001/api-docs`

### Core Endpoints

#### 🔐 Authentication
```http
POST   /api/users/register     # Register new user
POST   /api/users/login        # Login user
POST   /api/users/refresh      # Refresh token
POST   /api/users/logout       # Logout user
```

#### 🎬 Movies
```http
GET    /api/movies            # List movies
GET    /api/movies/:id        # Get movie details
POST   /api/movies            # Add movie (Admin)
PUT    /api/movies/:id        # Update movie (Admin)
DELETE /api/movies/:id        # Delete movie (Admin)
```

#### ⭐ Reviews
```http
POST   /api/reviews/:movieId  # Add/Update review
GET    /api/reviews/movie/:id # Get movie reviews
POST   /api/reviews/like/:id  # Like review
DELETE /api/reviews/:id       # Delete review
```

#### 📋 Lists
```http
POST   /api/lists            # Create list
GET    /api/lists            # Get public lists
PUT    /api/lists/:id        # Update list
DELETE /api/lists/:id        # Delete list
```

## 🔒 Security

### Implemented Measures
- JWT Authentication
- Rate Limiting
- Input Validation
- XSS Protection
- CORS Configuration
- Request Logging
- Role-based Access

### Best Practices
- Password Hashing
- Token Refresh
- API Key Protection
- Request Sanitization
- Error Message Security

## ❌ Error Handling

```javascript
{
  "status": "error",
  "code": "RESOURCE_NOT_FOUND",
  "message": "The requested resource was not found",
  "details": {...},
  "timestamp": "2024-03-21T10:30:00Z"
}
```

## 📁 File Management

### Supported Uploads
- Movie Posters (5MB max)
- Cast Photos (2MB max)
- User Avatars (1MB max)

### Storage Options
- Local Storage
- Cloud Storage (Cloudinary)
- S3 Compatible Storage

## 🧪 Testing

```bash
# Run all tests
npm test

# Run specific test suite
npm test:unit
npm test:integration
npm test:e2e

# Generate coverage report
npm test:coverage
```

## 📦 Deployment

### Docker Deployment
```bash
# Build image
docker build -t movie-api .

# Run container
docker run -p 5001:5001 movie-api
```

### Traditional Deployment
```bash
# Production build
npm run build

# Start production server
npm run start:prod
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 💬 Support

- 📧 Email: support@movieapi.com
- 💭 Discord: [Join our server](https://discord.gg/movieapi)
- 📝 Issues: [GitHub Issues](https://github.com/username/repo/issues)
- 📚 Wiki: [Project Wiki](https://github.com/username/repo/wiki)

## 🌟 Acknowledgments

- MongoDB Team for excellent database
- Express.js community

---

<div align="center">
Made with ❤️ by Ammad
</div>