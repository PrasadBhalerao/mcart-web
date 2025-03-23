# Use official Node.js image to build the app
FROM node:20 AS build

# Set working directory
WORKDIR /app

# Copy files and install dependencies
COPY package*.json ./
RUN npm install
COPY . .

# Build Angular app
RUN npm run build --prod

# Use nginx to serve the Angular app
FROM nginx:alpine
COPY --from=build /app/dist/mcart-web /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]