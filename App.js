import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { Home, User, FolderKanban, FileText, Mail, ArrowRight, Sun, Moon, Download, Github, Linkedin, Twitter, Check, Sparkles, Send } from 'lucide-react';

/* * Shadcn-style Button Component
 * Reusable button with variants.
 * UPDATED: Added 'as' prop to support links.
 */
function Button({ as: Comp = 'button', variant = 'default', size = 'default', className = '', children, ...props }) {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";

  const variants = {
    default: "bg-black text-white dark:bg-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90",
    destructive: "bg-red-500 text-white hover:bg-red-500/90",
    outline: "border border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-100/80 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-800/80",
    ghost: "hover:bg-black/5 dark:hover:bg-white/5",
    link: "text-primary underline-offset-4 hover:underline",
  };

  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };

  const cn = (...classes) => classes.filter(Boolean).join(' ');

  return (
    <Comp
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </Comp>
  );
}

/* * NEW: Shadcn-style Input Component
 */
const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-black/20 dark:border-white/20 bg-white/50 dark:bg-black/50 px-3 py-2 text-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white",
        "placeholder:text-gray-500 dark:placeholder:text-gray-400",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

/* * NEW: Shadcn-style Textarea Component
 */
const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-black/20 dark:border-white/20 bg-white/50 dark:bg-black/50 px-3 py-2 text-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white",
        "placeholder:text-gray-500 dark:placeholder:text-gray-400",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})


/* * Utility function for class names
 */
const cn = (...classes) => classes.filter(Boolean).join(' ');

/* * Theme Provider and Hook
 * Manages light/dark mode state and persistence.
 */
const ThemeContext = createContext({
  theme: 'system',
  setTheme: () => {},
});

function ThemeProvider({ children, defaultTheme = 'system', storageKey = 'vite-ui-theme' }) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(storageKey) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

/* * Theme Toggle Component
 * With circular reveal animation.
 */
function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleToggle = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    document.documentElement.style.setProperty('--x', `${x}px`);
    document.documentElement.style.setProperty('--y', `${y}px`);
    document.documentElement.style.setProperty('--r', `${endRadius}px`);

    if (!document.startViewTransition) {
      setTheme(theme === 'light' ? 'dark' : 'light');
      return;
    }

    document.startViewTransition(() => {
      setTheme(theme === 'light' ? 'dark' : 'light');
    });
  };

  return (
    <Button variant="outline" size="icon" onClick={handleToggle} aria-label="toggle theme">
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">toggle theme</span>
    </Button>
  );
}

/* * Navigation Bar Component
 * UPDATED: Scroll-spy logic fixed for 'contact' section.
 */
function Navbar() {
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { name: 'home', id: 'home', icon: Home },
    { name: 'about', id: 'about', icon: User },
    // UPDATED: name, id
    { name: 'learn more using ai!', id: 'learn-more-ai', icon: Sparkles, tooltip: 'try me!' },
    { name: 'contact', id: 'contact', icon: Mail },
  ];

  // Scroll-spy logic
  useEffect(() => {
    const sections = navItems.map(item => document.getElementById(item.id));
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      let currentSection = 'home';
      for (const section of sections) {
        if (section) {
          const sectionTop = section.offsetTop - 100; 
          const sectionHeight = section.offsetHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.id;
            break;
          }
        }
      }

      // --- FIX for Contact Section Highlighting ---
      // Check if user is near the bottom of the page
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      // If scrolled past the (start of the last element - window height) OR very close to the bottom
      const contactSection = sections[sections.length - 1];
      if (contactSection) {
         if ((scrollPosition + windowHeight >= documentHeight - 50) || // 50px buffer from bottom
             (scrollPosition + windowHeight / 2 > contactSection.offsetTop)) { // Or past halfway point of last section
          currentSection = 'contact';
         }
      }
      // --- End Fix ---

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const NavLink = ({ item }) => {
    const { name, id, icon: Icon } = item;
    const isActive = activeSection === id;
    
    return (
      <a 
        href={`#${id}`}
        className="group relative flex items-center justify-center p-3"
        aria-label={name}
      >
        <Icon className={cn(
          "h-5 w-5 transition-all",
          isActive ? "text-black dark:text-white" : "text-gray-400 dark:text-gray-500 group-hover:text-black dark:group-hover:text-white"
        )} />
        {/* UPDATED: Use item.tooltip if it exists, otherwise item.name */}
        <span className={cn(
          "absolute left-full ml-4 px-3 py-1.5 bg-black dark:bg-white text-white dark:text-black text-xs rounded-md",
          "scale-0 group-hover:scale-100 origin-left transition-transform",
          "pointer-events-none lowercase" // Tooltip is now lowercase
        )}>
          {item.tooltip || item.name}
        </span>
      </a>
    );
  };

  return (
    <>
      {/* Desktop: Floating Vertical Pill */}
      <nav 
        className={cn(
          "hidden md:flex flex-col items-center fixed z-50 left-6 top-1/2 -translate-y-1/2",
          "bg-white/50 dark:bg-black/50 backdrop-blur-md",
          "border border-black/10 dark:border-white/10",
          "py-4 rounded-full shadow-lg shadow-black/10 dark:shadow-white/10"
      )}>
        <div className="flex flex-col items-center justify-center">
          {navItems.map((item) => (
              <NavLink 
                key={item.id} 
                item={item} 
              />
          ))}
        </div>
      </nav>

      {/* Mobile: Bottom Horizontal Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 z-50 bg-white/30 dark:bg-black/30 backdrop-blur-md border-t border-black/10 dark:border-white/10">
        <div className="flex items-center justify-around h-full">
          {navItems.map((item) => {
            const { id, icon: Icon } = item;
            const isActive = activeSection === id;
            return (
              <a 
                key={id} 
                href={`#${id}`}
                className="flex flex-col items-center justify-center p-2"
                aria-label={item.name}
              >
                <Icon className={cn(
                  "h-5 w-5 transition-all",
                  isActive ? "text-black dark:text-white" : "text-gray-500"
                )} />
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}

/* * React Bit - DecryptText Component
 * UPDATED: With randomized reveal and new `duration` prop for sync.
 */
function DecryptText({ text, className = '', duration = 1000 }) {
  // Initialize with non-breaking spaces to reserve width
  const [displayedText, setDisplayedText] = useState(text.replace(/./g, '\u00A0'));
  const intervalRef = useRef(null);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-=_+[]{}|;:,.<>/?';

  // Ref to store the shuffled indices
  const shuffledIndicesRef = useRef([]);
  // Ref to store the set of revealed indices
  const revealedIndicesRef = useRef(new Set());

  useEffect(() => {
    let iteration = 0;

    // 1. Create and shuffle indices
    const indices = Array.from(Array(text.length).keys());
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    shuffledIndicesRef.current = indices;
    revealedIndicesRef.current = new Set();
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // NEW: Calculate interval speed based on total duration
    // This ensures animations of different lengths can finish at the same time
    const intervalSpeed = duration / text.length;

    intervalRef.current = setInterval(() => {
      // 2. Add next shuffled index to the revealed set
      if (iteration < text.length) {
        revealedIndicesRef.current.add(shuffledIndicesRef.current[iteration]);
      }

      const newText = text
        .split('')
        .map((letter, index) => {
          // 3. Check if index is in the revealed set
          if (revealedIndicesRef.current.has(index)) {
            return text[index];
          }
          // Preserve spaces
          if (text[index] === ' ') {
            return ' ';
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');
      
      setDisplayedText(newText);
      
      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
        setDisplayedText(text); // Ensure final text is set
      }
      
      iteration += 1;
    }, intervalSpeed); // Speed of the reveal is now dynamic

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [text, duration]); // Re-run effect if text or duration prop changes

  return (
    <span className={cn(className, "font-mono")}>
      {displayedText}
    </span>
  );
}

/* * React Bit - Particles Background Component
 */
function ParticlesBackground() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let particlesArray = [];
    const particleColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)';
    // REMOVED: lineColor

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    class Particle {
      constructor(x, y, directionX, directionY, size) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = particleColor;
        ctx.fill();
      }
      update() {
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    function init() {
      setCanvasSize();
      particlesArray = [];
      let numberOfParticles = (canvas.height * canvas.width) / 9000;
      for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;
        particlesArray.push(new Particle(x, y, directionX, directionY, size));
      }
    }

    // REMOVED: connect() function

    let animationFrameId;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      // REMOVED: connect();
      animationFrameId = requestAnimationFrame(animate);
    }

    init();
    animate();

    const handleResize = () => {
      cancelAnimationFrame(animationFrameId);
      init();
      animate();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]); // Re-init particles if theme changes

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0"
    />
  );
}


/* * Hero (Home) Section Component
 * UPDATED: Lowercase text, fixed word break, removed period
 */
function HeroSection() {
  // NEW: Define a shared duration for both animations
  const decryptDuration = 1500; // 1.5 seconds

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
      
      {/* Particles Background */}
      <ParticlesBackground />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-1 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-black dark:via-black/80" />
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        
        {/* DecryptText Component */}
        <h1 className="text-5xl md:text-7xl font-bold text-black dark:text-white mx-auto min-h-[1.2em] break-words">
          <DecryptText text="krishan patel" duration={decryptDuration} />
        </h1>
        
        {/* UPDATED: Removed period from text prop */}
        <p className="mt-6 text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto min-h-[3em] break-words">
          <DecryptText 
            text="software engineer specializing in building scalable cloud solutions and intuitive full-stack applications"
            duration={decryptDuration}
          />
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          {/* UPDATED: href to #learn-more-ai */}
          <a href="#learn-more-ai"> 
            <Button size="lg" className="w-full sm:w-auto">
              view my work
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
          <a href="#contact">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              get in touch
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

/* * Timeline Item Component
 * UPDATED: Re-added IntersectionObserver for simple fade-in.
 */
function TimelineItem({ icon, title, subtitle, date, children, side }) {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef(null);

  // RE-ADDED: IntersectionObserver logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1, // Trigger when 10% of the item is visible
      }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(itemRef.current);
      }
    };
  }, []);
  
  const isRight = side === 'right';

  return (
    <div 
      ref={itemRef} // Added ref
      className={cn(
        "relative w-full my-6 transition-all duration-700 ease-out", // Added transition
        "flex flex-col md:flex-row",
        isRight ? "md:flex-row-reverse" : "",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4" // Added states
      )}
    >
      {/* Connector Dot */}
      <div 
        className={cn(
          "absolute top-5 h-8 w-8 rounded-full z-10",
          "flex items-center justify-center",
          "bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800",
          "left-1/2 -translate-x-1/2 -mt-4", // Centered
          "md:mt-0"
        )}
      >
        {icon}
      </div>
      
      {/* --- CONTENT HALF --- */}
      <div className="w-full md:w-1/2 px-4 py-4">
        <div className={cn(
          "w-full bg-white/50 dark:bg-black/50 backdrop-blur-md",
          "border border-black/10 dark:border-white/10",
          "p-6 rounded-lg shadow-lg shadow-black/5 dark:shadow-white/5"
        )}>
          <div className={cn(
            "flex flex-col",
            isRight ? "sm:items-start" : "sm:items-start md:items-end" // Align text
          )}>
            <time className={cn(
              "text-sm font-medium text-gray-500 dark:text-gray-400",
              isRight ? "" : "md:text-right"
            )}>
              {date}
            </time>
            <h3 className={cn(
              "text-xl font-semibold text-black dark:text-white mt-1",
              isRight ? "" : "md:text-right"
            )}>
              {title}
            </h3>
            <h4 className={cn(
              "text-md font-medium text-gray-700 dark:text-gray-300",
              isRight ? "" : "md:text-right"
            )}>
              {subtitle}
            </h4>
          </div>
          {/* UPDATED: Only render children if they exist */}
          {children && (
            <div className={cn(
              "mt-4 text-gray-600 dark:text-gray-400 text-left" // Always left-align list for readability
            )}>
              {children}
            </div>
          )}
        </div>
      </div>
      
      {/* --- LOGO HALF --- */}
      <div className="w-full md:w-12 px-4 py-4 hidden md:flex items-center justify-center">
         <div className="w-32 h-32 opacity-70 dark:opacity-50 transition-opacity">
           {React.cloneElement(icon, { className: "w-full h-full object-contain" })}
         </div>
      </div>
    </div>
  );
}

/* * About Section Component
 * UPDATED: Removed min-h-screen
 */
function AboutSection() {
  // Data for the timeline
  const timelineData = [
    {
      icon: <img src="https://upload.wikimedia.org/wikipedia/commons/e/e5/Georgia_Tech_Buzz_logo.svg" alt="Georgia Tech Logo" className="h-5 w-5" />,
      title: "georgia institute of technology",
      subtitle: "b.s. in computer science",
      date: "graduated may 2023",
      content: (
        <p className="text-gray-600 dark:text-gray-400 text-left">
          threads: intelligence & devices
        </p>
      )
    },
    {
      icon: <img src="https://upload.wikimedia.org/wikipedia/commons/1/13/Capital_One_logo.svg" alt="Capital One Logo" className="h-5 w-5" />,
      title: "capital one",
      subtitle: "senior associate software engineer",
      date: "aug 2023 - present",
      content: null // Simplified as requested
    }
  ];

  return (
    <section id="about" className="py-24 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto"> 
        <h2 className="text-center text-4xl md:text-5xl font-bold text-black dark:text-white mb-12">
          about me
        </h2>
        
        {/* REMOVED Blurb */}

        {/* Timeline */}
        <div className="relative w-full flex flex-col items-center">
          {/* Background Line */}
          <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-gray-200 dark:bg-gray-800 rounded-full" />
          
          {/* Timeline Items Container */}
          {timelineData.map((item, index) => (
            <TimelineItem
              key={index}
              icon={item.icon}
              title={item.title}
              subtitle={item.subtitle}
              date={item.date}
              side={index % 2 === 0 ? 'left' : 'right'} // Alternate sides
            >
              {item.content}
            </TimelineItem>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- NEW HELPER: Loading Spinner ---
function LoadingSpinner() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="animate-spin h-5 w-5"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

// --- NEW HELPER: Hardcoded Resume Text ---
const krishanResumeText = `
KRISHAN PATEL
krishanpatel00@gmail.com (571) 509-9536 github.com/kpatell US Citizen

EDUCATION
Georgia Institute of Technology, B.S. Computer Science | Graduated: May 2023 | GPA: 3.81/4.0
Skills & Technologies: Python, AWS (Lambda, ECS, DynamoDB, CloudWatch, Glue), Kubernetes/Docker, SQL/Postgres, Java, React, TypeScript, Node.js, NoSQL/MongoDB, Linux
Soft Skills: Problem-solving, attention to detail, verbal and written communication, teamwork, leadership, adaptability, time management, organizational skills

WORK EXPERIENCE:
Capital One | Senior Associate Software Engineer
August 2023 - Present
• Engineered enterprise-scale platform to streamline internal volunteer registrations and grant applications across 1,000+ employees and ~500 non-profit partner organizations.
• Architected and deployed a scalable AI-driven qualification platform using Selenium, BeautifulSoup, and Mistral 7B LLM. Implemented a Collaborative Filtering ML model to match applicants with skill-based volunteering opportunities, processing 200+ hours of automated matching workflows annually.
• Developed the Decrypt and Stream Lambda (DASL) Platform, a critical distributed systems service for daily transaction files, achieving 99.9% uptime through reliability engineering practices. Led multiple high-stakes demos for business leaders and stakeholders, expanding the platform's reach across the enterprise. Co-led the development of a full-stack replay tool, enabling downstream customers to efficiently recover failed transaction files.
• Established GitHub best practices across the organization, standardizing Conventional Commits across teams to enhance code quality, organization, and collaboration. These CI/CD checks are implemented enterprise-wide.
• Led efforts to onboard a vendor application using infrastructure automation and ETL pipelines with AWS Glue, designing for scalability across 3+ engineering teams enterprise-wide.
• TDP Program Council Lead (Aug 2024 Feb 2025), influencing program initiatives and mentoring new associates.

Goldman Sachs | Marcus Summer Analyst Intern
June 2022 August 2022
• Deployed an AWS scheduler that automates the start and stop of ECS instances, leveraging DynamoDB, AWS Lambda, and a Flask-based web framework, reducing AWS costs by 10% annually.
• Implemented monitoring and observability solutions, driving insights into cloud infrastructure performance.

KS Solutions LLC | Software Engineering Intern
April 2021 August 2021
• Developed an automated reporting solution using Java and SQL, generating on-demand PDF reports with uniform formatting, saving 10+ hours/week for the client that manually creates these reports.
• Enhanced user experience by implementing an autocomplete search function, improving efficiency and usability.
• Coordinated with business partners and tech team to ensure successful feature integration and launch.

PROJECTS:
Hit Your Macros (Python, Amazon Textract, Claude 4.0, Supabase, React Native)
December 2024 - Present
• A scalable full-stack nutrition intelligence platform, serving 100+ users to eat out while staying within their health goals.
• Architected scalable data pipeline using Amazon Textract and Claude 4.0, handling millions of restaurant menu items.
• Built optimized Supabase database with RESTful microservices, rate limiting, and monitoring capabilities for real-time location-based queries across thousands of restaurants.

Intelligent Tutoring Systems (JavaScript, MongoDB, REST, React, Node.js, Figma)
January 2021 - May 2022
• JavaScript learning platform with interactive challenges and progress tracking, partnering with Atlanta middle schools.
• Architected scalable database design using MongoDB with optimized schemas supporting real-time progress tracking.
• Created UI/UX designs in Figma, translating wireframes into a fully functional React and Node.js application.

ACHIEVEMENTS AND LEADERSHIP:
Board Member of Raas All-Stars | Non-Profit Organization
June 2023 - June 2025
Captain of Georgia Tech Ramblin' Raas | Collegiate Dance Team
May 2022 May 2023
Eagle Scout | Boy Scouts of America, Troop 1154, Ashburn, VA
March 5, 2019

Résumé - Krishan Patel
Page 1 of 1
`;

// --- NEW HELPER: Gemini API call with exponential backoff ---
async function fetchWithBackoff(apiUrl, payload, retries = 3, delay = 1000) {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      if (response.status === 429 && retries > 0) {
        // Throttled, retry with backoff
        await new Promise(resolve => setTimeout(resolve, delay));
        return fetchWithBackoff(apiUrl, payload, retries - 1, delay * 2);
      }
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    if (retries > 0) {
      // Network or other error, retry
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchWithBackoff(apiUrl, payload, retries - 1, delay * 2);
    }
    throw error;
  }
}

// --- NEW HELPER: Function to call Gemini API ---
async function getGeminiResponse(companyName, resumeText) {
  const apiKey = ""; // API key is handled by the environment
  const apiUrl = `https.generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

  // UPDATED: System prompt
  const systemPrompt = `You are a professional hiring manager and career coach. Your task is to analyze the provided resume and generate a concise, 3-bullet-point list explaining why this candidate (Krishan Patel) is a strong fit for a software engineering role at a specific company.

- Base your answer ONLY on the resume provided.
- Focus on matching Krishan's skills (AWS, Python, React, AI/LLM, platform engineering) with the company's domain or likely needs.
- Keep each bullet point to a single, impactful sentence.
- If the company is generic (e.g., "a startup"), focus on his adaptability and full-stack skills.
- The tone should be professional, confident, and persuasive.
- all text in the response must be lowercase.
- do not use periods at the end of sentences.`;

  const userQuery = `Here is the resume:
---
${resumeText}
---
The company I am hiring for is: "${companyName}"

Generate the 3 bullet points.`;

  const payload = {
    contents: [{ parts: [{ text: userQuery }] }],
    systemInstruction: {
      parts: [{ text: systemPrompt }]
    },
  };

  try {
    const result = await fetchWithBackoff(apiUrl, payload);
    const candidate = result.candidates?.[0];
    
    if (candidate && candidate.content?.parts?.[0]?.text) {
      return candidate.content.parts[0].text;
    } else {
      throw new Error("No valid response from API.");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate AI response. Please try again.");
  }
}


// --- NEW/RENAMED SECTION ---
/* * AI Assistant Section (Formerly ResumeSection)
 * UPDATED: Renamed section and title, removed min-h-screen
 */
function AiAssistantSection() {
  // State for the Gemini feature
  const [companyName, setCompanyName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [error, setError] = useState(null);

  const handleGenerateClick = async () => {
    if (!companyName.trim()) {
      setError("please enter a company name");
      return;
    }
    setIsLoading(true);
    setError(null);
    setAiResponse("");

    try {
      const response = await getGeminiResponse(companyName, krishanResumeText);
      setAiResponse(response);
    } catch (err) { // <--- FIXED: Added opening brace
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // UPDATED: id and removed min-h-screen
    <section id="learn-more-ai" className="py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* --- AI Hiring Assistant --- */}
        <div className="max-w-2xl mx-auto text-left">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-black dark:text-white" />
            {/* UPDATED: title */}
            <h3 className="text-2xl md:text-3xl font-bold text-center text-black dark:text-white">
              learn more using ai!
            </h3>
          </div>
          {/* UPDATED: Removed period */}
          <p className="text-center text-gray-700 dark:text-gray-300 mb-6">
            enter your company's name to see why i'm a great fit, powered by the gemini api
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="your company name..."
              disabled={isLoading}
            />
            <Button 
              size="lg" 
              onClick={handleGenerateClick} 
              disabled={isLoading || !companyName.trim()}
              className={cn(
                "w-full sm:w-auto",
                // UPDATED: Disabled state
                "disabled:bg-black/80 dark:disabled:bg-white/80 disabled:text-white/70 dark:disabled:text-black/70"
              )}
            >
              {isLoading ? (
                <>
                  <LoadingSpinner />
                  <span className="ml-2">generating...</span>
                </>
              ) : (
                "generate talking points"
              )}
            </Button>
          </div>

          {/* Response Area */}
          <div className="mt-6 min-h-[100px] p-4 rounded-md bg-white/50 dark:bg-black/50 border border-black/10 dark:border-white/10">
            {error && (
              <p className="text-red-500 text-center">{error}</p>
            )}
            {aiResponse && (
              <div 
                className="text-gray-900 dark:text-gray-100 space-y-2 whitespace-pre-line"
                style={{ whiteSpace: 'pre-line' }} // Ensures line breaks are respected
              >
                {aiResponse}
              </div>
            )}
            {!isLoading && !error && !aiResponse && (
              // UPDATED: Placeholder text
              <p className="text-gray-500 dark:text-gray-400 text-center">
                the ai magic will happen here...
              </p>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}

// --- REMOVED: StarBorder Component ---


/* * NEW: Contact Section Component
 * UPDATED: Removed min-h-screen, fixed LinkedIn URL, implemented mailto:
 */
function ContactSection() {
  // REMOVED: form state
  const myEmail = "krishanpatel00@gmail.com";

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Get data from form
    const formData = new FormData(e.target);
    const name = formData.get('name') || 'anonymous';
    const email = formData.get('email') || 'not provided'; // Optional for mailto
    const message = formData.get('message') || 'no message';

    // 2. Build mailto link
    const subject = encodeURIComponent(`message from portfolio - ${name}`);
    const body = encodeURIComponent(
      `you have a new message from ${name} (${email}):\n\n${message}`
    );
    
    // 3. Open user's email client
    window.location.href = `mailto:${myEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center text-4xl md:text-5xl font-bold text-black dark:text-white mb-6">
          contact
        </h2>
        <p className="text-center text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-12">
          let's connect. send me a message or find me on social media
        </p>

        <div className="max-w-xl mx-auto">
          {/* UPDATED: Form now uses mailto: handler */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">name</label>
              <Input 
                id="name"
                name="name" // Use name attribute for FormData
                type="text" 
                placeholder="name"
                required 
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">email</label>
              <Input 
                id="email"
                name="email"
                type="email" 
                placeholder="email" 
                required 
              />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">message</label>
              <Textarea 
                id="message"
                name="message"
                placeholder="your message..."
                rows={5}
                required 
              />
            </div>
            <div>
              <Button 
                type="submit" 
                size="lg" 
                className="w-full"
              >
                send message
              </Button>
            </div>
            
            {/* REMOVED: success/error messages */}
          </form>
          
          {/* Social Links */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <a href="https://github.com/kpatell" target="_blank" rel="noopener noreferrer" aria-label="github" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
              <Github className="h-6 w-6" />
            </a>
            {/* UPDATED: LinkedIn URL */}
            <a href="https://www.linkedin.com/in/krishanpatell/" target="_blank" rel="noopener noreferrer" aria-label="linkedin" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
          
        </div>
      </div>
    </section>
  );
}


/* * Main App Component
 * This will hold all the sections.
 */
export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      <AppContent />
    </ThemeProvider>
  );
}

/*
 * AppContent contains the actual app,
 * so it can access the theme context.
 */
function AppContent() {
  const { theme } = useTheme(); // Get theme for the button
  const resumeUrl = "KrishanPatel-Resume.pdf"; // Assumes file is in the public folder
  const resumeName = "KrishanPatel-Resume.pdf";
  
  return (
    <div className="bg-white text-black dark:bg-black dark:text-white font-inter">
      {/* Set 'Inter' as the default font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
        
        body { 
          font-family: 'Inter', sans-serif; 
          background-color: white; /* Base background for light */
        }
        .dark body {
          background-color: black; /* Base background for dark */
        }
        
        html {
          scroll-behavior: smooth;
        }

        /* Use mono font for decrypt text */
        .font-mono {
          font-family: 'Space Mono', monospace;
        }
        
        /* --- VIEW TRANSITION CSS (FLICKER FIX) --- */
        ::view-transition-old(root) {
          animation: none; /* Disable the default fade-out animation */
          mix-blend-mode: normal;
          z-index: 1;
        }

        ::view-transition-new(root) {
          /* The new view is layered on top */
          z-index: 999;
          mix-blend-mode: normal;
          
          /* Animate the clip-path from 0 to full */
          animation: reveal 0.5s ease-out forwards; /* Added 'forwards' */
          
          /* Start as a 0-size circle at the click position */
          clip-path: circle(0% at var(--x) var(--y));
        }

        @keyframes reveal {
          /* Expand to the full radius (farthest corner) */
          to { clip-path: circle(var(--r) at var(--x) var(--y)); }
        }

        /* --- REMOVED: StarBorder CSS --- */
        
      `}</style>
      
      {/* Load lucide-react icons */}
      <script src="https://unpkg.com/lucide-react@latest/dist/umd/lucide.min.js"></script>

      {/* Standalone Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* UPDATED: Floating Download Button */}
      <div className="fixed bottom-6 left-6 z-50 hidden md:block">
        <Button
          as="a"
          href={resumeUrl}
          download={resumeName}
          size="lg"
          className="w-auto"
        >
          <Download className="mr-2 h-5 w-5" />
          download resume
        </Button>
      </div>


      {/* Navigation */}
      <Navbar />
      
      {/* Add padding to main content to avoid overlapping the navbars */}
      <main className="pb-16 md:pb-0 md:pl-24">
        <HeroSection />
        
        <AboutSection />
        
        {/* NEW: Replaced placeholder with the actual AiAssistantSection */}
        <AiAssistantSection />
        
        {/* UPDATED: Replaced placeholder with ContactSection */}
        <ContactSection />
      </main>

      {/* Footer is less critical with a side-nav, but good for copyright. 
          We'll add padding to it as well to avoid the nav. */}
      <footer className="py-8 border-t border-black/10 dark:border-white/10 text-center text-gray-500 dark:text-gray-400 pb-24 md:pb-8 md:pl-24">
        © {new Date().getFullYear()} krishan patel. all rights reserved.
      </footer>
    </div>
  );
}