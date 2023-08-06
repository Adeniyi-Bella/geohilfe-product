# Use an official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React app (replace 'build' with your actual build command)
RUN npm run build

# Specify the port as an environment variable with a default value
ENV PORT=3000

# Specify the command to run when the container starts
CMD ["npm", "start"]
