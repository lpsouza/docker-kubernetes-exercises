# Use a lightweight and secure Node.js alpine base image
FROM node:18-alpine

# Set the environment variable for production
ENV NODE_ENV=production

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json first to leverage Docker layer caching
COPY package.json ./

# Install production dependencies and clean cache
RUN npm install --only=production && npm cache clean --force

# Copy the rest of the application files with ownership assigned to the non-root node user
COPY --chown=node:node app.js ./

# Switch to the non-root 'node' user provided by the alpine base image
USER node

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["node", "app.js"]
