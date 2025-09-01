# 🚀 Nova Coders - Community Website

<div align="center">
  <img src="./public/logo.png" alt="Nova Coders Logo" width="120" height="120">
  
  **A modern, production-ready community platform for developers and tech enthusiasts**
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.5.0-black)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19.1.0-blue)](https://reactjs.org/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)](https://mongodb.com/)
  [![EmailJS](https://img.shields.io/badge/EmailJS-0078d4)](https://emailjs.com/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38bdf8)](https://tailwindcss.com/)
  [![Three.js](https://img.shields.io/badge/Three.js-0.179.1-green)](https://threejs.org/)
</div>

## 📋 Table of Contents
- [🌟 Overview](#-overview)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🔧 Environment Setup](#-environment-setup)
- [🎨 Design System](#-design-system)
- [📱 Components](#-components)
- [🌐 Deployment](#-deployment)
- [👥 Contributing](#-contributing)
- [📄 License](#-license)

## 🌟 Overview

Nova Coders is a modern, responsive community website built with Next.js and React. It features an impressive 3D globe hero section, dark/light theme support, and a comprehensive component library designed for scalability and maintainability.

### 🎯 Mission
To create a collaborative environment where developers, designers, and tech enthusiasts can learn, build innovative projects, and grow their professional network.

## ✨ Features

### 🎨 UI/UX Features
- **3D Interactive Globe** - Rotating globe with company logo using Three.js
- **Dark/Light Theme** - Seamless theme switching with system preference detection
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Gradient Components** - Custom gradient buttons and elements
- **Smooth Animations** - CSS animations and transitions
- **Modern Typography** - Optimized font loading and hierarchy

### 🔧 Technical Features
- **Next.js App Router** - Latest Next.js architecture with API routes
- **MongoDB Database** - Reliable subscriber data storage with Mongoose ODM
- **EmailJS Integration** - Client-side email sending for newsletter subscriptions
- **Server/Client Components** - Optimized rendering strategy
- **Dark Theme Email Templates** - Beautiful email templates that work across all clients
- **Form Validation** - Comprehensive input validation and error handling
- **Toast Notifications** - Real-time user feedback system
- **Performance Optimized** - Image optimization and lazy loading
- **SEO Optimized** - Meta tags and structured data

### 🧩 Interactive Elements
- **Newsletter Subscription** - Complete email subscription system with EmailJS
- **Navigation Menu** - Responsive hamburger menu for mobile
- **FAQ Accordion** - Collapsible FAQ sections with theme support
- **Count-up Animations** - Animated statistics counters
- **Theme Toggle** - Smooth dark/light mode switching

## 🛠️ Tech Stack

### **Frontend Framework**
- **[Next.js 15.5.0](https://nextjs.org/)** - React framework with App Router
- **[React 19.1.0](https://reactjs.org/)** - UI library
- **[React DOM 19.1.0](https://reactjs.org/)** - DOM rendering

### **Styling & UI**
- **[Tailwind CSS 4.0](https://tailwindcss.com/)** - Utility-first CSS framework
- **[React Icons](https://react-icons.github.io/react-icons/)** - Popular icon packs
- **[React Toastify 11.0.5](https://fkhadra.github.io/react-toastify/)** - Toast notifications

### **Database & Backend**
- **[MongoDB](https://mongodb.com/)** - NoSQL database for subscriber storage
- **[Mongoose](https://mongoosejs.com/)** - MongoDB ODM for data modeling

### **Email Service**
- **[EmailJS](https://emailjs.com/)** - Client-side email sending service
- **[@emailjs/browser](https://www.npmjs.com/package/@emailjs/browser)** - EmailJS browser SDK

### **3D Graphics & Animation**
- **[Three.js 0.179.1](https://threejs.org/)** - 3D graphics library
- **[@types/three](https://www.npmjs.com/package/@types/three)** - TypeScript definitions

### **Theme Management**
- **[Next Themes](https://github.com/pacocoursey/next-themes)** - Theme switching

### **Development Tools**
- **[ESLint 9](https://eslint.org/)** - Code linting
- **[PostCSS](https://postcss.org/)** - CSS processing

## 📁 Project Structure

```
nova_coders/
├── 📁 app/                          # Next.js App Router
│   ├── 📁 api/                      # API Routes
│   │   └── 📁 newsletter/           # Newsletter API
│   │       └── route.js             # Newsletter subscription endpoint
│   ├── 📁 update-template/          # Email template reference
│   │   └── page.js                  # Dark theme email template
│   ├── favicon.ico                  # Site favicon
│   ├── globals.css                  # Global styles and Tailwind imports
│   ├── layout.jsx                   # Root layout component
│   └── page.jsx                     # Home page component
│
├── 📁 backend/                      # Clean Production Backend
│   ├── 📁 config/                   # Configuration files
│   │   ├── database.js              # MongoDB connection
│   │   └── index.js                 # Configuration exports
│   ├── 📁 controllers/              # Business logic controllers
│   │   └── NewsletterMongoController.js # Newsletter subscription logic
│   ├── 📁 middleware/               # Request processing middleware
│   │   └── index.js                 # Essential middleware exports
│   ├── 📁 models/                   # Data models
│   │   └── SubscriberMongo.js       # MongoDB subscriber model
│   └── 📁 utils/                    # Utility functions
│
├── 📁 Components/                   # React components
│   ├── Nav.jsx                      # Main navigation
│   ├── Newsletter.jsx               # Newsletter subscription component
│   │
│   └── 📁 Utility/                  # Utility components
│       ├── GradientButton.jsx       # Custom gradient button
│       └── Logo.jsx                 # Company logo component
│
├── 📁 public/                       # Static assets
│   ├── 📁 icon/                     # App icons and favicons
│   │   ├── android-chrome-192x192.png    # Android app icon (192x192)
│   │   ├── android-chrome-512x512.png    # Android app icon (512x512)
│   │   ├── apple-touch-icon.png          # iOS app icon (180x180)
│   │   ├── favicon-16x16.png             # Browser favicon (16x16)
│   │   ├── favicon-32x32.png             # Browser favicon (32x32)
│   │   ├── favicon.ico                   # Main favicon file
│   │   └── site.webmanifest              # Web app manifest
│   └── logo.png                     # Company logo
│
├── 📁 Configuration Files
│   ├── .env                         # Environment variables
│   ├── .gitignore                   # Git ignore rules
│   ├── eslint.config.mjs            # ESLint configuration
│   ├── jsconfig.json                # JavaScript config
│   ├── next.config.mjs              # Next.js configuration
│   ├── package.json                 # Dependencies and scripts
│   ├── postcss.config.mjs           # PostCSS configuration
│   └── tailwind.config.js           # Tailwind CSS configuration
│
└── README.md                        # Project documentation
```

## � Production Status

✅ **Production Ready** - All debugging files and development code have been removed:
- 🗑️ Removed all debug log files and test HTML files
- 🧹 Cleaned up Newsletter component (removed debugging, shake animations)
- 🔧 Simplified backend architecture (core functionality only)
- 📁 Removed unused directories (test routes, admin panels)
- 📝 Updated documentation to reflect clean production structure
- 🛡️ Enhanced .gitignore to prevent future debug file commits
- 🌍 Streamlined environment configuration (single `.env` file)

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **npm**, **yarn**, **pnpm**, or **bun**
- **Git**
- **Resend Account** (for email functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hritik2004-cse/Nova_Coders.git
   cd Nova_Coders
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration values (see Environment Setup section).

4. **Set up MongoDB Database**
   - Create a MongoDB Atlas account or use local MongoDB
   - Get your connection string
   - Add it to your `.env.local` file

5. **Set up EmailJS**
   - Create an EmailJS account at [emailjs.com](https://emailjs.com)
   - Create an email service and template
   - Add your credentials to `.env.local`

6. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🔧 Environment Setup

Create a `.env.local` file in the root directory:

```env
# MongoDB Database (Required)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/novacoders

# EmailJS Configuration (Required for newsletter functionality)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

# Optional: Social Media URLs
NEXT_PUBLIC_DISCORD_URL=your_discord_server_url
NEXT_PUBLIC_LINKEDIN_URL=your_linkedin_url
NEXT_PUBLIC_GITHUB_URL=your_github_url
NEXT_PUBLIC_INSTAGRAM_URL=your_instagram_url
```

### Setting up MongoDB

1. **Create a MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for a free account

2. **Create a Cluster**
   - Create a new cluster (free tier available)
   - Get your connection string
   - Replace `<username>`, `<password>`, and `<cluster>` with your values

3. **Add to Environment**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/novacoders
   ```

### Setting up EmailJS

1. **Create an EmailJS Account**
   - Go to [EmailJS.com](https://emailjs.com)
   - Sign up for a free account (200 emails/month)

2. **Create an Email Service**
   - Add your email provider (Gmail, Outlook, etc.)
   - Note the Service ID

3. **Create an Email Template**
   - Create a new email template
   - Use variables: `{{name}}` and `{{email}}`
   - Note the Template ID

4. **Get your Public Key**
   - Go to Account settings
   - Copy your Public Key

5. **Add to Environment**
   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
   ```

## 🔌 API Endpoints

### Newsletter Management

#### Public Endpoints
| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| `POST` | `/api/newsletter` | Subscribe to newsletter | `{ "email": "user@example.com", "firstName": "John" }` |
| `GET` | `/api/newsletter?action=stats` | Get newsletter statistics | - |

### Example API Usage

#### Subscribe to Newsletter
```javascript
const response = await fetch('/api/newsletter', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        email: 'user@example.com',
        firstName: 'John'
    })
});

const result = await response.json();
console.log(result); // { success: true, message: "Successfully subscribed!" }
```

#### Get Newsletter Statistics
```javascript
const response = await fetch('/api/newsletter?action=stats');
const stats = await response.json();
console.log(stats); // { success: true, stats: { total: 150, active: 140 } }
```
## 🏗️ Backend Architecture

### Clean Production Architecture

Our backend follows a simplified, production-ready architecture:

#### **Database Layer**
- **MongoDB with Mongoose**: Reliable data persistence for subscriber management
- **Connection Utilities**: Optimized database connection handling
- **Data Models**: Clean subscriber schema with validation

#### **Controllers** (`backend/controllers/`)
- **NewsletterMongoController.js**: Simplified newsletter operations
  - Email subscription handling
  - Database integration with MongoDB
  - Input validation and error handling
  - Statistics generation

#### **Models** (`backend/models/`)
- **SubscriberMongo.js**: MongoDB subscriber model
  - Schema definition with validation
  - Built-in methods for statistics
  - Email format validation
  - Status management (active/unsubscribed)

#### **Configuration** (`backend/config/`)
- **database.js**: MongoDB connection configuration
- **index.js**: Central configuration exports

#### **Email Integration**
- **EmailJS Client-Side**: Reliable email sending via browser
- **Dark Theme Templates**: Production-ready email templates
- **Template Reference**: Working templates in `app/update-template/`

### Data Schema

#### Subscriber Model (MongoDB)
```javascript
{
  email: String,           // Unique email address
  firstName: String,       // Optional first name
  status: String,          // 'active' | 'unsubscribed'
  source: String,          // 'website' (default)
  subscribedAt: Date,      // Subscription timestamp
  unsubscribedAt: Date,    // Unsubscription timestamp (if applicable)
  preferences: {
    topics: [String]       // Subscription preferences
  },
  metadata: Object         // Additional data
}
```

### API Architecture

The API follows RESTful principles with clean endpoints:

- **POST /api/newsletter**: Subscribe to newsletter (saves to DB + sends email)
- **GET /api/newsletter?action=stats**: Get subscription statistics

### Security & Validation

- **Input Validation**: Comprehensive email format checking
- **Data Sanitization**: Clean and validate all inputs
- **Error Handling**: Graceful error responses without sensitive data
- **Database Security**: Mongoose validation and sanitization

## 🎨 Design System

### Color Palette
```css
/* Light Mode */
--primary-blue: #2563eb
--secondary-sky: #0ea5e9
--accent-cyan: #06b6d4

/* Dark Mode */
--primary-cyan: #64ffda
--secondary-blue: #4ade80
--background-dark: #0a192f
--surface-dark: #112240
```

### Typography
- **Headings**: Font weights 600-900
- **Body**: Font weight 400-500
- **Responsive**: Scales from mobile to desktop

### Component Variants
- **Buttons**: Primary, secondary, ghost, gradient
- **Cards**: Default, elevated, outlined
- **Navigation**: Desktop, mobile hamburger

## 📱 Components

### Core Components

#### `<Newsletter />`
- Complete email subscription system with EmailJS integration
- MongoDB database storage for subscribers
- Form validation and error handling
- Toast notifications for user feedback
- Theme-aware styling with CSS variables
- Client-side email sending for reliability

#### `<GradientButton />`
- Customizable gradient backgrounds
- Multiple size variants
- Icon support
- Theme-aware styling

#### `<Nav />`
- Responsive navigation
- Theme toggle integration
- Mobile-first hamburger menu

### Email Templates

#### Dark Theme Template
- Email-client compatible HTML structure
- Inline CSS styling for maximum compatibility
- Professional dark theme design
- Working template available in `app/update-template/`

### UI Components

#### Theme Support
- Consistent CSS variables across all components
- Automatic dark/light mode detection
- Smooth theme transitions

## 🎨 Assets & Icons

### App Icons & Favicons
The project includes a complete set of optimized icons for various platforms and devices:

| Icon Type | File | Size | Usage |
|-----------|------|------|-------|
| **Android Chrome** | `android-chrome-192x192.png` | 192x192 | Android home screen |
| **Android Chrome** | `android-chrome-512x512.png` | 512x512 | Android splash screen |
| **Apple Touch** | `apple-touch-icon.png` | 180x180 | iOS home screen |
| **Browser Favicon** | `favicon-16x16.png` | 16x16 | Browser tab (small) |
| **Browser Favicon** | `favicon-32x32.png` | 32x32 | Browser tab (large) |
| **Main Favicon** | `favicon.ico` | Multi-size | Legacy browser support |
| **Web Manifest** | `site.webmanifest` | - | PWA configuration |
| **Company Logo** | `logo.png` | Variable | Brand identity |

### PWA Support
The included `site.webmanifest` file enables Progressive Web App features:
- **Add to Home Screen** functionality
- **Splash Screen** customization
- **App-like experience** on mobile devices
- **Offline capabilities** (when service worker is added)

### Usage in Components
```jsx
// Logo component usage
<img src="/logo.png" alt="Nova Coders" />

// Favicon automatically loaded in layout
<link rel="icon" href="/icon/favicon.ico" />
<link rel="apple-touch-icon" href="/icon/apple-touch-icon.png" />
```

## 🌐 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy automatically on push

### Other Platforms
- **Netlify**: Configure build command as `npm run build`
- **Railway**: Use the Next.js template
- **DigitalOcean**: Deploy with App Platform

### Build Optimization
```bash
npm run build        # Creates optimized production build
npm run start        # Serves the production build
```

## 👥 Contributing

We welcome contributions from the community! Please follow these steps:

### Development Workflow
1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Follow coding standards**
   - Use ESLint configuration
   - Follow component naming conventions
   - Add proper TypeScript types
5. **Test your changes**
6. **Commit with conventional commits**
   ```bash
   git commit -m "feat: add amazing feature"
   ```
7. **Push and create a Pull Request**

### Coding Standards
- Use functional components with hooks
- Follow Tailwind CSS utility-first approach
- Implement proper error boundaries
- Add proper accessibility attributes
- Optimize for performance

### Component Guidelines
- Each component should have a single responsibility
- Use TypeScript for type safety
- Include proper prop validation
- Add documentation comments
- Follow the established file structure

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📚 Additional Documentation

For detailed setup guides and troubleshooting, check out our comprehensive documentation:

- **[📋 Documentation Index](./DOCS_INDEX.md)** - Overview of all documentation files
- **[📧 Newsletter Setup Guide](./NEWSLETTER_SETUP.md)** - Complete EmailJS and MongoDB setup
- **[🗃️ MongoDB Setup Guide](./MONGODB_SETUP.md)** - Database configuration for Atlas and local
- **[📧 EmailJS Template Setup](./EMAILJS_TEMPLATE_SETUP.md)** - Email template configuration
- **[🛠️ EmailJS Troubleshooting](./EMAILJS_TROUBLESHOOTING.md)** - Common issues and solutions
- **[🎨 Email Template Reference](./UPDATED_EMAILJS_TEMPLATE.md)** - Dark theme email template

---

<div align="center">
  <p>Built with ❤️ by the Nova Coders Team</p>
  <p>
    <a href="https://discord.gg/your-discord">Discord</a> •
    <a href="https://github.com/hritik2004-cse/Nova_Coders">GitHub</a> •
    <a href="https://linkedin.com/company/novacoders007">LinkedIn</a>
  </p>
</div>
