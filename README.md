# Book Review API

A RESTful API for managing books and reviews with JWT authentication using Node.js, Express, and MongoDB.

---

## Project Setup

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/book-review-api.git
cd book-review-api

```

2. **Install dependencies:**

```bash
npm install
```

3. **Create a .env file in the project root and add:**

```bash
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. **Start the development server**

```bash
npm run dev
```

5. **Example to check API endpoint in Postman**

```bash
## Example API Request with Postman
 First we need to signup , login and then copy bearer token and paste it in Authorisation tab so that we are authenticated for the route and then we can apply these to api/books or api/reviews etc.

### Get all books

- **Method:** GET  
- **URL:** `http://localhost:3000/api/books`  
- **Headers:** None required for public route  
- **Params:**  
  - `page` (optional): Page number for pagination, e.g., 1  
  - `limit` (optional): Number of results per page, e.g., 10  
  - `author` (optional): Filter by author name  
  - `genre` (optional): Filter by genre  

#### Steps in Postman:

1. Open Postman and create a new GET request.  
2. Enter the URL: `http://localhost:3000/api/books`  
3. Add any query parameters (e.g., `page=1&limit=5`) in the Params tab.  
4. Click **Send**.  
5. You should get a JSON response with a list of books.

---

### Example Response

```json
{
  "success": true,
  "books": [
    {
      "_id": "682ce44532b416c1f577f7f8",
      "title": "Atomic Habits",
      "author": "James Clear",
      "genre": "Self-help",
      "averageRating": 4.5,
      "reviewsCount": 10
    },
    ...
  ],
  "page": 1,
  "totalPages": 3
}

```

6. **Database Schema Design**

This project uses **MongoDB** with **Mongoose** for object modeling. Below are the primary schemas and their relationships.

---

### 👤 User Schema

```js
{
  _id: ObjectId,
  name: String,
  email: { type: String, unique: true },
  password: String,
  verificationToken: String,
  verificationTokenExpiresAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### 📚 Book Schema

```js
{
  _id: ObjectId,
  title: String,
  author: String,
  genre: String,
  description: String,
  createdBy: { type: ObjectId, ref: "User" },
  createdAt: Date,
  updatedAt: Date
}
```

### 📝 Review Schema

```js
{
  _id: ObjectId,
  book: { type: ObjectId, ref: "Book" },
  user: { type: ObjectId, ref: "User" },
  rating: { type: Number, min: 1, max: 5 },
  comment: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 🔗 Relationships
A User can post one review per Book

A Book can have multiple Reviews

Each Review references both a User and a Book