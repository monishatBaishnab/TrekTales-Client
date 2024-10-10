# [TrekTales (Travel Tips & Destination Guides)](https://trek-tales-client.vercel.app/)

[Live Link](https://trek-tales-client.vercel.app/)

### Admin Credentials

- **Email**: `monishat@gmail.com`
- **Password**: `11`

## Project Description

**TrekTales** is a full-stack web application designed to create an engaging platform for travel enthusiasts. Users can share their personal travel stories, provide valuable tips, and interact with a community of fellow travelers. The platform features user authentication, profile management, post creation, and social interaction. Premium features, such as exclusive content, are unlocked through a payment system. TrekTales is built to foster a dynamic community where users can discover new destinations, gain insights, and build memorable travel experiences.

## Technology Stack

### Frontend

- **Next.js**: Framework for building server-rendered React applications and static websites.
- **Typescript**: Type-safe development environment for both frontend and backend.
- **TanStack Query**: Data fetching, caching, and synchronization for managing API state.
- **Axios**: Promise-based HTTP client for API requests.

### Backend

- **Express**: Backend framework for building RESTful APIs and handling server logic.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB, simplifying data modeling and validation.
- **Cloudinary:**: Cloud-based image hosting for storing and delivering user-uploaded images efficiently.

### Database

- **MongoDB**: NoSQL database for storing user profiles, travel posts, comments, and other dynamic data.

### Additional Tools

- **JWT (JSON Web Tokens)**: Used for secure user authentication and session management.
- **Aamarpay**: Payment gateways for premium content access and profile verification.

## Project Features

### Public Features

1. **Home Page**
   - Navigation to key sections: home, about, authors, and user sign-up/login.
   - Display of featured travel posts and top user contributors.
2. **User Authentication**
   - Secure registration and login with JWT-based sessions.
3. **Content Creation**
   - Rich text editor for creating detailed travel tips, stories, and destination guides.
   - Support for image attachments upload to enhance the visual appeal of posts.
4. **Search and Filters**
   - Advanced search and filtering options for posts based on categories, upvotes, and popularity.
5. **Social Interaction**
   - Upvoting/downvoting system for posts.
   - Commenting and following features to foster community engagement.

### Premium Features

1. **Premium Content**
   - Users can unlock exclusive travel guides and stories by verified users.
   - Payment integration for accessing premium content and profile verification.

### Admin Features

1. **Admin Dashboard**
   - Management of user roles, posts, and premium content.
   - Overview of platform metrics: active users, posts, and payments.
2. **Payment Management**
   - Handle payments for profile verification and premium content access.

## Local Setup Instructions

1. **Clone the repository**:

   ```bash
   git clone https://github.com/monishatBaishnab/TrekTales-Client
   ```

2. **Navigate to the project directory**:

   ```bash
   cd TrekTales-Client
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Set up environment variables**:

   Create a `.env` file and add the necessary environment variables.

5. **Run the application**:

   ```bash
   npm run dev
   ```

6. **Access the application**:
   - Navigate to `http://localhost:3000` in your browser.