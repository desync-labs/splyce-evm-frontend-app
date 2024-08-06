# Build stage
FROM node:16 AS builder

# Set the working directory
WORKDIR /app

# Add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Install react-scripts globally
RUN npm install react-scripts@3.4.3 -g

# Copy the application code
COPY . ./

# Set Node.js options to increase memory limit
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Build the application
RUN npm run build:dev

# Production stage
FROM nginx:alpine

# Copy built files from the build stage
COPY --from=builder /app/build /usr/share/nginx/html

# Remove the default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Add custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d

# Expose port 3000
EXPOSE 3000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]