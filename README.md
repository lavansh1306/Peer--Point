# 🚀 **PEER-POINT — Collaborative Doubt Solving Platform**

A full‑stack, production‑ready web application designed for students to share doubts, discuss solutions, and build a community-driven knowledge base.

---

## 🧠 **What is PEER-POINT?**

PEER-POINT is a modern doubt‑solving platform that enables learners to:

* Post academic questions with **text, code snippets, or images**
* Get answers with **threaded discussions**
* Vote or react to useful responses
* Maintain a **searchable history** of doubts
* Use secure **JWT‑based authentication** with roles

Built with a polished React + Vite frontend and a robust Spring Boot backend.

---

## 🛠️ **Tech Stack**

### **Frontend**

<p align="left">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/shadcn--ui-000000?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Radix_UI-161616?style=for-the-badge&logo=radix-ui&logoColor=white" />
  <img src="https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white" />
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" />
</p>

### **Backend**

<p align="left">
  <img src="https://img.shields.io/badge/Java-17-007396?style=for-the-badge&logo=openjdk&logoColor=white" />
  <img src="https://img.shields.io/badge/Spring_Boot-3.x-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/H2_Database-004085?style=for-the-badge" />
  <img src="https://img.shields.io/badge/JWT-Security-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
  <img src="https://img.shields.io/badge/Maven-CC0000?style=for-the-badge&logo=apache-maven&logoColor=white" />
</p>

## 📂 **Repository Structure**

**Repository Structure**

```
root/
│── frontend/ (React + Vite + TS)
│   └── src/
│
│── backend/ (Spring Boot)
│   └── src/main/java/com/peerpoint/
│
└── README.md
```

---

## 🚀 **Quick Start**

### **Frontend Setup**

```sh
cd "c:/Users/Aditya Mishra/Desktop/APP project/spark-animate-learn"
npm install
npm run dev
```

### **Backend Setup**

```sh
cd backend
mvn spring-boot:run
```

Or if using wrapper:

```sh
./mvnw spring-boot:run
```

---

## ⚙️ **Environment Configuration**

### **Backend (`application.properties`)**

```
spring.datasource.url=jdbc:postgresql://localhost:5432/peerpoint
spring.datasource.username=postgres
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
jwt.secret=your_jwt_secret_key
```

### **Frontend `.env`**

```
VITE_API_URL=http://localhost:8080/api
```

---

## 🔑 **Key Features**

* ✏️ Create doubt posts (text, images, code)
* 💬 Threaded comments + discussions
* 👍 Upvote/React to answers
* 🏷️ Tagging & search for quick discovery
* 🔐 JWT-based authentication
* 👥 Role-based access control

---

## 🧪 **Development Notes**

* H2 used in dev for easy bootstrapping
* PostgreSQL for production deployments
* React Query handles caching + API state
* Tailwind for responsive UI
* All UI components built using shadcn + Radix

---

## 🤝 **Contributing**

1. Fork the repo
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m "Add feature"`
4. Push: `git push origin feature-name`
5. Create a PR

---

## 📜 **License**

MIT — feel free to use and modify.

---

## 🌟 **Support**

If you like this project, consider ⭐ starring the repository!
