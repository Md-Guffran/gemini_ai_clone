<<<<<<< HEAD
# gemini_ai_clone
=======
# Gemini AI Clone

A beautiful, fully-featured clone of Google's Gemini AI with real API integration, user authentication, and conversation management.

![Gemini AI Clone](https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop)

## ✨ Features

- 🤖 **Real Gemini AI Integration** - Uses Google's actual Gemini API
- 🔐 **User Authentication** - Secure signup/login with email verification
- 💬 **Multi-conversation Support** - Manage multiple chat sessions
- 🎨 **Beautiful Modern Design** - Production-ready UI with smooth animations
- 📱 **Fully Responsive** - Works perfectly on all devices
- ⚡ **Real-time Typing Indicators** - See when AI is responding
- 🔄 **Context-aware Conversations** - Maintains conversation history
- 🎯 **Smart Suggestions** - Quick-start prompts for various use cases
- 🛡️ **Error Handling** - Graceful error handling with user feedback
- 💾 **Persistent Sessions** - Conversations saved across sessions

## 🚀 Live Demo

[View Live Demo](https://your-demo-url.netlify.app) *(Update with your deployed URL)*

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (Authentication, Database)
- **AI**: Google Gemini API
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Deployment**: Netlify (recommended)

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- A Google account for Gemini API access
- A Supabase account for authentication and database

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Md-Guffran/gemini_ai_clone.git
cd gemini-ai-clone
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

### 4. Get Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the API key

### 5. Set Up Supabase

1. Go to [Supabase](https://supabase.com) and create a new project
2. Wait for the project to be set up
3. Go to **Settings** → **API** in your Supabase dashboard
4. Copy your project URL and anon key

### 6. Configure Environment Variables

Update your `.env` file with your actual keys:

```env
# Gemini AI API Key
VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here

# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 7. Set Up Supabase Authentication

In your Supabase dashboard:

1. Go to **Authentication** → **Settings**
2. Configure your site URL (for local development: `http://localhost:5173`)
3. Add any additional redirect URLs if needed
4. Ensure email confirmation is enabled (default)

### 8. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── auth/            # Authentication components
│   ├── ChatInterface.tsx
│   ├── Sidebar.tsx
│   └── ...
├── hooks/               # Custom React hooks
├── services/            # API services
├── types/               # TypeScript type definitions
├── config/              # Configuration files
└── utils/               # Utility functions
```

## 🚀 Deployment

### Deploy to Netlify (Recommended)

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to Netlify

3. Set environment variables in Netlify:
   - Go to Site settings → Environment variables
   - Add your `VITE_GEMINI_API_KEY`, `VITE_SUPABASE_URL`, and `VITE_SUPABASE_ANON_KEY`

4. Update your Supabase site URL to your Netlify domain

### Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Set the environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## 🔐 Security Notes

- Never commit your `.env` file to version control
- Keep your API keys secure and rotate them regularly
- The Supabase anon key is safe to expose in frontend code
- Use Supabase Row Level Security (RLS) for data protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Google Gemini AI](https://ai.google.dev/) for the powerful AI capabilities
- [Supabase](https://supabase.com/) for authentication and database services
- [Tailwind CSS](https://tailwindcss.com/) for the beautiful styling
- [Lucide React](https://lucide.dev/) for the clean icons

## 📞 Support

If you have any questions or run into issues:

1. Check the [Issues](https://github.com/Md-Guffran/gemini_ai_clone/issues) page
2. Create a new issue if your problem isn't already reported
3. Provide as much detail as possible including error messages and steps to reproduce

## 🔄 Updates

This project is actively maintained. Check the [Releases](https://github.com/Md-Guffran/gemini_ai_clone/releases) page for the latest updates and features.

---

**Made with ❤️ by [Your Name](https://github.com/Md-Guffran)**
>>>>>>> f4a0c89 (Initial commit: Gemini AI Clone with full documentation)
