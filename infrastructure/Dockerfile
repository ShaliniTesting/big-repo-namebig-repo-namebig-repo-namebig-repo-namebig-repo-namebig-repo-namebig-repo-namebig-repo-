FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files first for better layer caching
COPY src/backend/package*.json ./

# Install only production dependencies for security and reduced image size
RUN npm ci --only=production

# Copy the application source code into the container
COPY src/backend/ ./

# Document that the container listens on port 3000 at runtime
EXPOSE 3000

# Set NODE_ENV environment variable to production
ENV NODE_ENV=production

# Switch to the non-root 'node' user for security best practices
USER node

# Specify the command to run when the container starts
CMD ["node", "index.js"]