The TripPlanner project is a comprehensive travel planning tool that allows users to authenticate, plan, and save trips by selecting various categories of interest such as hotels, restaurants, and tourist attractions. The project integrates with multiple APIs to fetch relevant information for a city based on user input. The dashboard displays these details in an interactive, user-friendly way, enabling users to explore and save specific destinations and attractions. Additionally, users can manage their saved trips, either by viewing, updating, or deleting them, offering flexibility and ease of use.

This platform is valuable because it centralizes the process of travel planning by providing real-time data about key points of interest in a city. By leveraging external APIs for dynamic content, it saves users the hassle of visiting multiple websites for accommodations, dining options, and attractions, streamlining their travel experience. The integration of features like JWT-based authentication, trip saving functionality, and user-specific data storage ensures personalized experiences, making travel planning more organized and enjoyable.

Usage Guide:
Node.js and npm/yarn: Make sure you have Node.js (v14 or higher) installed along with either npm (Node Package Manager) or yarn. You can download Node.js from here.

MongoDB: Install MongoDB locally or ensure access to a cloud MongoDB instance (such as MongoDB Atlas).

Git: Ensure that Git is installed to clone the repository from GitHub. Install Git.

API Keys: Obtain API keys for services like OpenTripMap and other APIs used for fetching trip-related data (hotels, restaurants, and tourist attractions).

Cloning repository to the local machine
git clone https://github.com/samarthya21/TripPlanner.git
cd TripPlanner

Installing frontend depedencies
cd frontend
npm install

Installing backend depedencies
cd ../backend
npm install

Starting backend
npm start

Starting frontned
cd ../frontend
npm run dev

Configurations 
You must use your own MongoDB url for the database
You must obtain the api-key for the OpenTripMap api