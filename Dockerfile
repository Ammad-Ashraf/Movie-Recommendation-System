# Use the official Node.js image as the base
FROM node:21.1.0

# Set the working directory inside the container
WORKDIR /App

# Copy package files first to install dependencies
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the application code
COPY . .

# Expose the application port
EXPOSE 5001

# Run the app
CMD ["npm", "start"]
