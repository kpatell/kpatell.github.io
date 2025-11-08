# Krishan Patel - Personal Portfolio

A modern, minimalistic personal portfolio website built with React, TypeScript, and Tailwind CSS. Features a clean design with dark mode support, animated components, and an AI-powered assistant.

## 🚀 Features

- **Modern Tech Stack**: Built with React 18, TypeScript, and Vite for optimal performance
- **Responsive Design**: Fully responsive layout that works on all devices
- **Dark Mode**: Smooth theme switching with circular reveal animation
- **Type Safety**: Full TypeScript implementation for better code quality
- **Component-Based Architecture**: Well-organized, reusable components
- **AI Assistant**: Gemini API integration for personalized company fit analysis
- **Animated Effects**: 
  - Decrypt text animation for hero section
  - Particle background effects
  - Smooth scroll-spy navigation
  - Intersection observer animations
- **Accessibility**: ARIA labels, semantic HTML, and keyboard navigation support

## 📁 Project Structure

```
kpatell.github.io/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Textarea.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   ├── layout/          # Layout components
│   │   │   ├── Navbar.tsx
│   │   │   └── ThemeToggle.tsx
│   │   ├── features/        # Feature components
│   │   │   ├── DecryptText.tsx
│   │   │   ├── ParticlesBackground.tsx
│   │   │   └── TimelineItem.tsx
│   │   └── sections/        # Page sections
│   │       ├── HeroSection.tsx
│   │       ├── AboutSection.tsx
│   │       ├── AiAssistantSection.tsx
│   │       └── ContactSection.tsx
│   ├── hooks/               # Custom React hooks
│   │   └── useTheme.tsx
│   ├── lib/                 # Utilities and helpers
│   │   ├── utils.ts
│   │   └── api.ts
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts
│   ├── styles/              # Global styles
│   │   └── index.css
│   ├── App.tsx              # Main app component
│   └── main.tsx             # Entry point
├── public/                  # Static assets
│   └── KrishanPatel-Resume.pdf
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions deployment
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## 🛠️ Technologies Used

### Core
- **React 18** - UI library
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and dev server

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

### UI Components
- **Lucide React** - Beautiful icon library
- **Custom shadcn-style components** - Accessible, customizable UI components

### Deployment
- **GitHub Pages** - Static site hosting
- **GitHub Actions** - CI/CD pipeline

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kpatell/kpatell.github.io.git
cd kpatell.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run deploy` - Build and deploy to GitHub Pages (manual)

## 🌐 Deployment

### Automatic Deployment (Recommended)

The site automatically deploys to GitHub Pages when you push to the `main` branch using GitHub Actions.

**Setup Steps:**

1. Go to your repository settings on GitHub
2. Navigate to **Pages** under **Code and automation**
3. Under **Build and deployment**, set:
   - Source: **GitHub Actions**
4. Push to the `main` branch to trigger deployment

### Manual Deployment

```bash
npm run deploy
```

This will build the project and push the `dist` folder to the `gh-pages` branch.

## 🎨 Customization

### Updating Personal Information

1. **Resume**: Replace `/public/KrishanPatel-Resume.pdf` with your resume
2. **Resume Text**: Update `RESUME_TEXT` in `/src/lib/utils.ts`
3. **Contact Info**: Update email and social links in `/src/components/sections/ContactSection.tsx`
4. **Timeline**: Modify `timelineData` in `/src/components/sections/AboutSection.tsx`

### Styling

- Global styles: `/src/styles/index.css`
- Tailwind config: `tailwind.config.js`
- Theme colors and fonts can be customized in the Tailwind config

### AI Assistant

To enable the AI assistant feature:

1. Get a Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Update the `apiKey` in `/src/lib/api.ts` (or use environment variables)

**Note**: For production, use environment variables to keep your API key secure.

## 🔒 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

Then update `/src/lib/api.ts` to use:
```typescript
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are welcome! Feel free to open an issue or submit a pull request.

## 📄 License

MIT License - feel free to use this project as a template for your own portfolio!

## 👤 Author

**Krishan Patel**
- GitHub: [@kpatell](https://github.com/kpatell)
- LinkedIn: [krishanpatell](https://www.linkedin.com/in/krishanpatell/)
- Email: krishanpatel00@gmail.com

## 🙏 Acknowledgments

- Design inspired by modern minimalist portfolios
- Icons from [Lucide](https://lucide.dev/)
- UI components inspired by [shadcn/ui](https://ui.shadcn.com/)
- Fonts from [Google Fonts](https://fonts.google.com/)

---

Built with ❤️ by Krishan Patel
