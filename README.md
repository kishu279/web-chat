# BuzzChat Documentation

## Overview
BuzzChat is a real-time web chat application built using WebSockets and HTTP. It allows users to communicate dynamically in temporary chat groups. User details are stored in MongoDB, but chat groups are recreated each time users join the platform.

## Features
- Real-time messaging using WebSockets.
- Temporary chat groups that are created each time users join.
- User details are persistently stored in MongoDB.
- Scalable and efficient communication.

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js with Express
- **Database**: MongoDB (for storing user details)
- **Real-time Communication**: WebSockets (via `ws`)

## System Architecture
1. **User Authentication**: Users can enter the chat without prior registration, but their details (such as username and session info) are stored in MongoDB.
2. **Temporary Chat Groups**: Each session creates a new chat group where users can communicate. Once they leave, the group is dissolved.
3. **Messaging**: WebSockets enable instant message delivery between users.
4. **Database Interaction**: MongoDB is used to store user details but not chat history.

## Installation
### Prerequisites
- Node.js installed
- MongoDB setup (local or cloud-based)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/kishu279/web-chat.git
   cd buzzchat
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```env
   MONGO_URI=<your-mongodb-connection-string>
   PORT=3000
   ```
4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints
| Method | Endpoint       | Description                      |
|--------|---------------|----------------------------------|
| GET    | `/`           | Home page                        |
| POST   | `/signup`     | Register a new user              |
| POST   | `/signin`     | Login a user                     |
<!-- | GET    | `/chat`       | Create/join a new chat session   | -->

## WebSocket Events
| Event Name       | Description                                |
|-----------------|--------------------------------------------|
| `chatpage`       | Sends a message to the chat group         |

## Future Improvements
- Persistent chat history storage
- User authentication with OAuth
- Private messaging feature

## License
This project is open-source under the MIT License.

