import express from 'express';
import dotenv from 'dotenv';
import { specs } from './config/swagger.js';
import swaggerUi from 'swagger-ui-express';
import connectDB from './config/Database.js';
import userRoutes from './Routes/UserRoutes.js';
import movieRoutes from './Routes/MovieRoutes.js';
import reviewRoutes from './Routes/ReviewRoutes.js'
import personRoutes from './Routes/PersonRoutes.js';
import recommendationRoutes from './Routes/recommendationRoutes.js';
import newsRoutes from './Routes/NewsRoutes.js';
import listRoutes from './Routes/ListRoutes.js';
import searchRoutes from './Routes/Search.js';
import adminRoutes from './Routes/AdminRoutes.js';
import logger from './Utils/logger.js';
import path from 'path';


// -------------------------------------------------- 
// Load env vars
dotenv.config();
// Connect to database
connectDB();

const app = express();
// Middleware
app.use(express.json());
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(specs));
// ----------------------------------------------------


// User Routes
app.use('/api/users', userRoutes);
// Person routes
app.use('/api/people', personRoutes);
// Movie Routes
app.use('/api/movies', movieRoutes);
// Serve uploaded files
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
// Review Routes
app.use('/api/reviews', reviewRoutes);
// recommendation Routes
app.use('/api/recommendations', recommendationRoutes);
// List Routes
app.use('/api/lists', listRoutes);
//search Routes
app.use('/api/search', searchRoutes);
// News Routes
app.use('/api/news', newsRoutes);
// Admin Routes
app.use('/api/admin', adminRoutes);






// ----------------------------------------------------

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
