# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Expose the port that the app runs on (usually 3000 for React)
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
