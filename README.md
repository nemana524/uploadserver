# Photo Upload Server

A simple server for handling photo uploads with Express and Multer.

## Features

- Upload photos (JPEG, PNG, GIF)
- File size limit: 5MB
- List all uploaded files
- CORS enabled
- Error handling
- Static file serving

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with:
   ```
   PORT=3001
   NODE_ENV=development
   ```
4. Start the server:
   ```bash
   npm start
   ```
   For development with auto-reload:
   ```bash
   npm run dev
   ```

## API Endpoints

### Upload a Photo
- **POST** `/upload`
  - Content-Type: `multipart/form-data`
  - Body: `file` (image file)
  - Response: JSON with file information

### Get All Uploaded Files
- **GET** `/files`
  - Response: JSON array of file information

## Deployment

The server is ready to be deployed to any cloud platform that supports Node.js applications. Here are some options:

1. **Heroku**:
   ```bash
   heroku create
   git push heroku main
   ```

2. **Render**:
   - Connect your GitHub repository
   - Set the build command: `npm install`
   - Set the start command: `npm start`

3. **Railway**:
   - Connect your GitHub repository
   - Set the start command: `npm start`

## Environment Variables

- `PORT`: Server port (default: 3001)
- `NODE_ENV`: Environment (development/production)

## Security Considerations

- File size limit is set to 5MB
- Only image files (JPEG, PNG, GIF) are allowed
- CORS is enabled for cross-origin requests
- Files are stored with unique names to prevent overwriting 