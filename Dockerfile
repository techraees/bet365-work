# Use the official Node.js image as the base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the default Next.js port (3000)
EXPOSE 8082

# Start the Next.js app
CMD ["npm", "start"]
