# 🎓 PEER-POINT

<div align="center">

**A collaborative platform where students help students solve doubts together**

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2-6DB33F?style=flat&logo=springboot)](https://spring.io/projects/spring-boot)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-007ACC?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[Features](#-features) • [Architecture](#-architecture) • [Workflow](#-workflow) • [Quick Start](#-quick-start) • [Tech Stack](#-tech-stack)

</div>

---

## 💡 What is PEER-POINT?

PEER-POINT is a modern doubt-solving platform that connects learners in a collaborative community. Students can post academic questions, receive detailed answers through threaded discussions, and build a searchable knowledge base together.

**Perfect for**: Study groups, coding bootcamps, academic institutions, and online learning communities.

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 👤 For Students
- 📝 Post questions with rich text descriptions
- 💬 Engage in threaded discussions
- 🔍 Browse questions by subject/category
- 📊 Track your questions and replies
- 🔐 Secure authentication & profiles

</td>
<td width="50%">

### 🎯 Platform Capabilities
- 🏷️ Category-based organization (CSE, ECE, Math, Physics, AI/ML)
- 🔒 JWT-based secure authentication
- 👥 Role-based access control (User/Admin)
- ⚡ Real-time updates with React Query
- 📱 Fully responsive UI design

</td>
</tr>
</table>

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                       │
│              React + TypeScript + Tailwind CSS               │
│                    (Port 5173 - Vite Dev)                    │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ REST API (JSON)
                       │ Authorization: Bearer <JWT>
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                      API LAYER (REST)                        │
│                  Spring Boot 3.2 + Java 17                   │
│                     (Port 8080 - API)                        │
│                                                              │
│  Endpoints:                                                  │
│  • /api/auth/*        - Authentication & Registration        │
│  • /api/pages/*       - Subject Categories Management        │
│  • /api/questions/*   - Question CRUD Operations             │
│  • /api/replies/*     - Answer/Reply Management              │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ JPA/Hibernate
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                      DATA LAYER                              │
│              PostgreSQL (Prod) / H2 (Dev)                    │
│                                                              │
│  Entities: Users → Questions → Replies                       │
│           Pages (Categories)                                 │
└──────────────────────────────────────────────────────────────┘
```

### 🔄 Layer Breakdown

| Layer | Technology | Responsibility |
|-------|-----------|----------------|
| **Frontend** | React + TypeScript + Vite | UI components, routing, state management |
| **API Gateway** | Spring Boot REST Controllers | Request routing, validation, auth |
| **Business Logic** | Spring Services | Core application logic |
| **Data Access** | Spring Data JPA | Database operations |
| **Security** | Spring Security + JWT | Authentication & authorization |
| **Database** | PostgreSQL / H2 | Data persistence |

---

## 🔄 Workflow

### 1️⃣ **User Registration Flow**

```
User → Register Page → Backend API → Validate Data → Hash Password 
  → Save to DB → Generate JWT Token → Return to Client → Store Token 
  → Redirect to Home
```

### 2️⃣ **Post Question Flow**

```
Authenticated User → Fill Question Form → Send with JWT Token 
  → Validate Token → Check Permissions → Save Question to DB 
  → Return Question Data → Update UI
```

### 3️⃣ **Browse & Reply Flow**

```
User → Select Subject Category → Fetch Questions for Category 
  → Display Question Cards → Click Question → View Details & Replies
  → (If Authenticated) Write Reply → Save Reply → Update Thread
```

### 🔐 Security Flow

```
Login → Credentials → Backend Validation → Generate JWT (24h expiry)
  → Store in LocalStorage → Include in All Protected Requests
  → Backend Validates JWT → Allow/Deny Access
```

---

## 🚀 Quick Start

### Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js** 18+ and npm
  - Used for frontend development and build tooling
  - Check version: `node --version`
- **Java** 17+
  - Required for Spring Boot backend
  - Check version: `java --version`
- **Maven** 3.8+
  - Java dependency management and build tool
  - Check version: `mvn --version`
- **PostgreSQL** (for production) or H2 (auto-configured for dev)
  - H2 database included for development (no setup needed)
  - PostgreSQL recommended for production deployment

### 1. Clone the Repository

```bash
git clone https://github.com/lavansh1306/Peer--Point.git
cd Peer--Point
```

### 2. Start Backend

```bash
cd backend
mvn spring-boot:run
```

Backend runs on `http://localhost:8080`

### 3. Start Frontend

```bash
# From project root
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

### 4. Access the Application

Open your browser and navigate to: **http://localhost:5173**

**Default Categories**: CSE, ECE, Mathematics, Physics, AI/ML, General

---

## ⚙️ Configuration

### Frontend Environment (`.env`)

Create a `.env` file in the project root with the following configuration:

```env
VITE_API_URL=http://localhost:8080/api
```

**Configuration Options:**
- `VITE_API_URL` - The base URL for the backend API server
- Default value points to local development server
- Update this URL when deploying to production

### Backend Configuration (`backend/src/main/resources/application.properties`)

```properties
# Server
server.port=8080

# Database (H2 for Development)
spring.datasource.url=jdbc:h2:file:./data/sparkdb
spring.h2.console.enabled=true

# Database (PostgreSQL for Production)
# spring.datasource.url=jdbc:postgresql://localhost:5432/peerpoint
# spring.datasource.username=postgres
# spring.datasource.password=yourpassword

# JWT Configuration
jwt.secret=yourSecretKeyForJWTTokenGeneration
jwt.expiration=86400000

# CORS
cors.allowed-origins=http://localhost:5173
```

**Key Configuration Settings:**
- **Server Port**: Default is `8080` - Backend API runs on this port
- **H2 Database**: File-based in-memory database for development
  - Console accessible at `http://localhost:8080/h2-console`
  - Data persists in `./data/sparkdb` directory
- **PostgreSQL**: Production database configuration (commented out by default)
  - Uncomment and configure for production deployment
  - Requires PostgreSQL server running on port `5432`
- **JWT Settings**: 
  - `jwt.secret` - Secret key for signing JWT tokens (change in production!)
  - `jwt.expiration` - Token validity period in milliseconds (24 hours default)
- **CORS**: Allowed origins for cross-origin requests
  - Add your frontend URL when deploying to production

---

## 🛠️ Tech Stack

### Frontend Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.3 | UI Framework |
| TypeScript | 5.8 | Type Safety |
| Vite | 5.4 | Build Tool & Dev Server |
| TailwindCSS | 3.4 | Styling |
| shadcn/ui | Latest | Component Library |
| React Query | 5.83 | Server State Management |
| React Router | 6.30 | Client-side Routing |

### Backend Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Java | 17 | Programming Language |
| Spring Boot | 3.2 | Application Framework |
| Spring Security | 3.2 | Authentication & Security |
| Spring Data JPA | 3.2 | Database Abstraction |
| JWT | 0.12.3 | Token Authentication |
| PostgreSQL | - | Production Database |
| H2 | - | Development Database |
| Maven | 3.8+ | Dependency Management |

---

## 📁 Project Structure

```
Peer--Point/
├── src/                          # Frontend source
│   ├── pages/                    # Page components
│   │   ├── Index.tsx            # Home page
│   │   ├── Login.tsx            # Authentication
│   │   ├── Register.tsx         # User registration
│   │   ├── SubjectPage.tsx      # Category view
│   │   └── QuestionDetail.tsx   # Q&A thread
│   ├── components/              # Reusable components
│   ├── contexts/                # React contexts (Auth)
│   ├── lib/                     # API & utilities
│   └── hooks/                   # Custom React hooks
│
├── backend/
│   └── src/main/java/com/srm/spark/
│       ├── controller/          # REST endpoints
│       ├── service/             # Business logic
│       ├── repository/          # Data access
│       ├── model/               # JPA entities
│       ├── security/            # JWT & auth
│       └── dto/                 # Data transfer objects
│
├── public/                      # Static assets
├── package.json                 # Frontend dependencies
└── backend/pom.xml             # Backend dependencies
```

---

## 📚 API Documentation

### Authentication Endpoints
**User Registration & Login:**
- **`POST /api/auth/register`** - Register new user
  - Request body: `{ name, email, password }`
  - Returns: JWT token and user details
  - No authentication required
- **`POST /api/auth/login`** - Authenticate user
  - Request body: `{ email, password }`
  - Returns: JWT token (valid for 24 hours)
  - No authentication required

### Pages (Categories) Endpoints
**Subject Category Management:**
- **`GET /api/pages`** - List all categories
  - Returns: Array of all available subject categories
  - Public endpoint (no auth required)
- **`GET /api/pages/name/{name}`** - Get category by name
  - Returns: Category details and metadata
  - Public endpoint (no auth required)

### Questions Endpoints
**Question Management & Browsing:**
- **`GET /api/questions/page/name/{name}`** - Get questions by category
  - Returns: Paginated list of questions for a subject
  - Query params: `page`, `size` for pagination
  - Public endpoint (no auth required)
- **`GET /api/questions/{id}`** - Get question details
  - Returns: Full question with metadata
  - Public endpoint (no auth required)
- **`POST /api/questions`** - Create question
  - Request body: `{ title, description, pageId }`
  - Requires: JWT authentication
  - Returns: Created question with ID
- **`PUT /api/questions/{id}`** - Update question
  - Request body: `{ title, description }`
  - Requires: Owner or Admin role
  - Returns: Updated question
- **`DELETE /api/questions/{id}`** - Delete question
  - Requires: Owner or Admin role
  - Returns: Success confirmation

### Replies Endpoints
**Answer & Discussion Management:**
- **`GET /api/replies/question/{id}`** - Get replies for question
  - Returns: All replies/answers for a specific question
  - Public endpoint (no auth required)
- **`POST /api/replies/question/{id}`** - Post reply
  - Request body: `{ content }`
  - Requires: JWT authentication
  - Returns: Created reply with ID
- **`PUT /api/replies/{id}`** - Update reply
  - Request body: `{ content }`
  - Requires: Owner or Admin role
  - Returns: Updated reply
- **`DELETE /api/replies/{id}`** - Delete reply
  - Requires: Owner or Admin role
  - Returns: Success confirmation

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

**How to Contribute:**
1. **Fork the repository**
   - Click the 'Fork' button at the top right of this page
   - Clone your fork locally
2. **Create your feature branch**
   - `git checkout -b feature/AmazingFeature`
   - Use descriptive branch names (e.g., `feature/add-search`, `fix/login-bug`)
3. **Commit your changes**
   - `git commit -m 'Add some AmazingFeature'`
   - Write clear, concise commit messages
   - Follow existing code style and conventions
4. **Push to the branch**
   - `git push origin feature/AmazingFeature`
   - Ensure all tests pass before pushing
5. **Open a Pull Request**
   - Provide a clear description of your changes
   - Reference any related issues
   - Wait for code review and feedback

**Contribution Guidelines:**
- Follow the existing code style and formatting
- Add tests for new features when applicable
- Update documentation for significant changes
- Keep pull requests focused on a single feature or fix
- Be respectful and constructive in discussions

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🌟 Support

If you find this project helpful, please consider:
- ⭐ **Star this repository** on GitHub to show your support
- 🐛 **Report bugs** by opening an issue with detailed reproduction steps
- 💡 **Request features** through GitHub issues
- 📖 **Improve documentation** by submitting PRs
- 🔗 **Share the project** with others who might find it useful
- 💬 **Join discussions** and help answer questions from other users

---

<div align="center">

**Built with ❤️ by the PEER-POINT Team**

[Report Bug](https://github.com/lavansh1306/Peer--Point/issues) • [Request Feature](https://github.com/lavansh1306/Peer--Point/issues)

</div>
