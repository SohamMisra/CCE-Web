
# 🌐 CCE-Web: Department Portal Platform

**A full-stack, production-ready web application for the Computer and Communication Engineering Department at NMAMIT**

---

## 🎯 Overview

CCE-Web is a comprehensive departmental portal built with modern web technologies and database architecture. This project demonstrates proficiency in building scalable, user-centric web applications with advanced frontend interactions, robust backend APIs, and database management.

**Live Stack:** HTML5 • CSS3 • JavaScript (Vanilla + Modular) • Express.js • Prisma ORM • PostgreSQL (Neon)

---

## ✨ Key Features

### 🎨 **Advanced Frontend Architecture**
- **Dynamic Typing Animation System** - Real-time text animation with smooth character-by-character rendering
- **Particle Effect Canvas Rendering** - GPU-accelerated interactive particle network with mouse-tracking physics
- **Responsive Design** - Mobile-first approach with Bootstrap framework integration
- **Dark Theme Support** - Context-aware dark mode for notes section with persistent styling
- **Smooth Card Hover Effects** - Vanilla JavaScript event handlers for interactive UI components
- **Lazy-loaded Content Sections** - Optimized image loading with webp format support

### 🔧 **Backend API Services**
- **Express.js Server** - RESTful API with automatic port fallback mechanism
- **Prisma ORM** - Type-safe database queries with schema-driven development
- **File Upload Management** - Multer integration for event poster uploads with sanitized filenames
- **CORS Configuration** - Cross-origin request handling for scalable architecture
- **Event Management System** - Complete CRUD operations for events (create, read, update, delete)
- **Date-based Filtering** - Intelligent query logic to separate past and upcoming events

### 📊 **Database Design**
- **Neon PostgreSQL** - Serverless PostgreSQL with connection pooling
- **Schema Management** - Organized data structure with relationships and constraints
- **Event Data Model** - Structured storage for events with metadata (date, title, description)
- **Environment-based Configuration** - Secure credential management with dotenv

### 🏗️ **Code Organization**
- **Modular CSS Architecture** - Separated stylesheets for different page components:
  - `index.css` - Home page specific styling
  - `navbar.css` - Navigation component
  - `faculty.css` - Faculty directory styling
  - `committee_members.css` - Committee management
  - `notes.css` - Academic resources
  - `upcoming_events.css` - Event calendar styling
  - `responsive.css` - Mobile adaptation

- **Standalone JavaScript Modules:**
  - `homeLogic.js` - Home page interactivity
  - `script.js` - Core application logic
  - `navbar.js` - Navigation functionality
  - `events.js` - Event management operations
  - `admin.js` - Administrative functions
  - `card-hover.js` - Interactive card effects
  - `particle-effect.js` - Canvas animation engine

### 📑 **Pages & Sections**
- **Home** - Hero section with animated typing and particle effects
- **Faculty Directory** - Comprehensive faculty information with searchable database
- **Committee Members** - Department committee information display
- **Placements** - Placement statistics and company information
- **Notes & Resources** - Academic resources with dark theme support
- **Events** - Upcoming and past event management
- **About Us** - Department information and mission/vision

---

## 🚀 Technical Highlights

### Frontend Excellence
- **Vanilla JavaScript** (16.1% of codebase) - No heavy framework dependencies, optimized performance
- **Advanced Canvas API** - Custom particle network with collision detection and alpha blending
- **Event-Driven Architecture** - Efficient event delegation and cleanup to prevent memory leaks
- **CSS Grid & Flexbox** - Modern layout techniques (52.5% HTML, 31.4% CSS)

### Backend Scalability
- **Automatic Port Management** - Graceful fallback to alternative ports if primary port is in use
- **Async/Await Pattern** - Proper error handling with try-catch blocks
- **Connection Pooling** - Database connection management through Prisma
- **Static File Serving** - Integrated Express static middleware for asset delivery

### Real-time Capabilities
- **API Endpoints:**
  - `POST /addEvent` - Create events with file uploads
  - `DELETE /deleteEvent` - Remove events by title
  - `GET /getEvents` - Retrieve events with optional date filtering

---

## 📦 Dependencies

```json
{
  "@neondatabase/serverless": "^0.10.4",
  "@prisma/client": "^6.3.1",
  "express": "^4.21.2",
  "cors": "^2.8.5",
  "body-parser": "^1.20.3",
  "multer": "latest",
  "cloudinary": "^2.5.1",
  "mysql2": "^3.12.0",
  "dotenv": "^16.4.7"
}
