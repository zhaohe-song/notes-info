# Notes Info App

> Notes Info application built with Node.js Express MongoDB for backend, React Redux Bootstrap AntD for frontend; the chat room is built using WebSocket

## Quick Start
Add config.env file to the config folder. Make sure you set an env each for PORT, MONGODB_URI, JWTSECRET

```bash
# Install dependencies for backend
npm install

# Install dependencies for frontend
cd frontend && yarn

# Run the server & frontedn with concurrently(in the root folder)
npm run dev

# Build the app frontend for production to the build folder
cd frontend && yarn build

# Run the app in production mode(in the root folder)
npm start
```