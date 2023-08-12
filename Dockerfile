# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port that the app runs on (usually 3000 for Next.js)
EXPOSE 8082

# Start the Next.js app
CMD ["npm", "run", "dev"]
