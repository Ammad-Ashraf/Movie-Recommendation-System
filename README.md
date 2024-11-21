# Movie Recommendation System API

A comprehensive RESTful API for a movie recommendation system built with Node.js, Express, and MongoDB. This system provides movie recommendations, user management, reviews, news, and more.

## Features

- 🎬 Movie Management
- 👥 User Authentication & Authorization
- ⭐ Reviews & Ratings
- 📰 Movie News
- 📋 Custom Movie Lists
- 🎯 Personalized Recommendations
- 🔍 Advanced Search Capabilities
- 👨‍👩‍👦 Cast & Crew Information

## Prerequisites

- Node.js (>= 16.0.0)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-name>
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

## Running the Application

### Development Mode
```bash
npm start
```

### Using Docker
```bash
docker-compose up
```

## API Documentation

The API documentation is available through Swagger UI at:
```
http://localhost:5001/api-docs
```

### Main API Endpoints

#### Authentication
- POST `/api/users/register` - Register a new user
- POST `/api/users/login` - Login user

#### Movies
- GET `/api/movies` - Get all movies
- GET `/api/movies/:id` - Get specific movie
- POST `/api/movies` - Add new movie (Admin only)
- PUT `/api/movies/:id` - Update movie (Admin only)
- DELETE `/api/movies/:id` - Delete movie (Admin only)

#### Reviews
- POST `/api/reviews/:movieId` - Add/Update review
- GET `/api/reviews/movie/:movieId` - Get movie reviews
- GET `/api/reviews/highlights/:movieId` - Get review highlights
- POST `/api/reviews/like/:reviewId` - Like a review

#### Recommendations
- GET `/api/recommendations/similar/:movieId` - Get similar movies
- GET `/api/recommendations/personalized` - Get personalized recommendations
- GET `/api/recommendations/trending` - Get trending movies
- GET `/api/recommendations/top-rated` - Get top-rated movies

#### Lists
- POST `/api/lists` - Create a new list
- GET `/api/lists` - Get all public lists
- GET `/api/lists/:id` - Get specific list
- POST `/api/lists/:id` - Follow a list
- DELETE `/api/lists/:id` - Unfollow a list

#### News
- GET `/api/news` - Get all news
- GET `/api/news/:id` - Get specific news article
- POST `/api/news` - Add news article (Admin only)
- PUT `/api/news/:id` - Update news article (Admin only)
- DELETE `/api/news/:id` - Delete news article (Admin only)

## Security Features

- JWT Authentication
- Rate Limiting
- Input Validation
- Role-based Access Control
- Request Logging

## Error Handling

The API implements comprehensive error handling with appropriate HTTP status codes and error messages. All errors are logged using Winston logger.

## File Upload

The system supports file uploads for:
- Movie posters
- Person (Cast/Crew) photos
- Other media assets

Files are stored locally in the `uploads` directory and can be configured to use cloud storage.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Support

For support, please open an issue in the repository.