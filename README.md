URL Metadata Fetcher
Description
URL Metadata Fetcher is a full-stack web application that allows users to input a list of URLs and retrieve metadata (title, description, and image) for each URL. The application is built using React for the front-end and Node.js (Express) for the back-end. It is designed to handle multiple URL inputs, fetch metadata asynchronously, and display the results in a user-friendly interface.

Features
Input Multiple URLs: Users can input at least three URLs to fetch metadata.
Fetch Metadata: The application fetches metadata such as the title, description, and image associated with each URL.
Error Handling: Handles invalid URLs and displays appropriate error messages.
Rate Limiting: The backend is rate-limited to prevent abuse (5 requests per second).
Security: Basic security measures implemented using helmet and CORS.
Setup and Installation
Prerequisites
Node.js (v14.x or later)
npm or yarn
Git
Front-End Setup
Clone the Repository:

bash
Copy code
git clone https://github.com/YourUsername/url-metadata-fetcher.git
cd url-metadata-fetcher/frontend
Install Dependencies:

bash
Copy code
npm install
Build the Application:

bash
Copy code
npm run build
Run the Application Locally:

bash
Copy code
npm start
The front-end will be accessible at http://localhost:3000.

Back-End Setup
Navigate to the Backend Directory:

bash
Copy code
cd ../backend
Install Dependencies:

bash
Copy code
npm install
Build the Backend:

bash
Copy code
npm run build
Run the Backend Locally:

bash
Copy code
npm run dev
The backend will be accessible at http://localhost:5000/api.
