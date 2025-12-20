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
- **Node.js** 18+ and npm
- **Java** 17+
- **Maven** 3.8+
- **PostgreSQL** (for production) or H2 (auto-configured for dev)

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

```env
VITE_API_URL=http://localhost:8080/api
```

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

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Authenticate user

### Pages (Categories)
- `GET /api/pages` - List all categories
- `GET /api/pages/name/{name}` - Get category by name

### Questions
- `GET /api/questions/page/name/{name}` - Get questions by category
- `GET /api/questions/{id}` - Get question details
- `POST /api/questions` - Create question (Auth required)
- `PUT /api/questions/{id}` - Update question (Owner/Admin)
- `DELETE /api/questions/{id}` - Delete question (Owner/Admin)

### Replies
- `GET /api/replies/question/{id}` - Get replies for question
- `POST /api/replies/question/{id}` - Post reply (Auth required)
- `PUT /api/replies/{id}` - Update reply (Owner/Admin)
- `DELETE /api/replies/{id}` - Delete reply (Owner/Admin)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🌟 Support

If you find this project helpful, please consider giving it a ⭐ on GitHub!

---

<div align="center">

**Built with ❤️ by the PEER-POINT Team**

[Report Bug](https://github.com/lavansh1306/Peer--Point/issues) • [Request Feature](https://github.com/lavansh1306/Peer--Point/issues)

</div>
