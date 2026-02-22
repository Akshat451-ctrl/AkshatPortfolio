import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  Github, Linkedin, Mail, ExternalLink, ArrowRight, ChevronDown,
  Code2, Server, Database, Brain, Shield, Award, Briefcase, Send, Sun, Moon, Menu, X, Phone,
  Atom, Code, Zap, FileText, Lock, Network, Check, AlertCircle, Download, Eye, Building2, MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTheme } from "@/context/ThemeContext";
// import { HeroBackground } from "@/components/3D/HeroBackground";
// import { Project3DCard } from "@/components/3D/Project3DCard";
import akshatPhoto from "@/assests/akshatphoto.jpeg";
import passwordphoto from "@/assests/passwordphoto.jpg";
import resume from "@/assests/AkshatMncResume (1).pdf";

/* ─── Data ─── */
const skills = [
  {
    category: "Frontend",
    icon: Code2,
    items: [
      { name: "React", level: 90, icon: Atom, color: "#61dafb" },
      { name: "HTML", level: 95, icon: Code, color: "#e34f26" },
      { name: "CSS", level: 95, icon: FileText, color: "#2965f1" },
      { name: "JavaScript", level: 88, icon: Zap, color: "#f7df1e" },
      { name: "TypeScript", level: 80, icon: FileText, color: "#3178c6" },
    ],
  },
  {
    category: "Backend",
    icon: Server,
    items: [
      { name: "Node.js", level: 85, icon: Server, color: "#339933" },
      { name: "Express", level: 82, icon: Server, color: "#000000" },
      { name: "FastAPI", level: 78, icon: Zap, color: "#009688" },
      { name: "Python", level: 85, icon: Code, color: "#3776ab" },
    ],
  },
  {
    category: "Database",
    icon: Database,
    items: [
      { name: "MySQL", level: 80, icon: Database, color: "#00758f" },
      { name: "MongoDB", level: 78, icon: Database, color: "#47a248" },
      { name: "PostgreSQL", level: 75, icon: Database, color: "#336791" },
    ],
  },
  {
    category: "AI / ML",
    icon: Brain,
    items: [
      { name: "Python ML", level: 75, icon: Brain, color: "#3776ab" },
      { name: "RAG Pipelines", level: 70, icon: Network, color: "#4a4aff" },
      { name: "Machine Learning", level: 72, icon: Brain, color: "#ff6a00" },
    ],
  },
  {
    category: "Cybersecurity",
    icon: Shield,
    items: [
      { name: "Network Security", level: 65, icon: Shield, color: "#00a8e8" },
      { name: "OWASP", level: 68, icon: Shield, color: "#f4633c" },
      { name: "Penetration Testing", level: 60, icon: Lock, color: "#ff4d4d" },
    ],
  },
];

const projects = [
  {
    title: "Shop-Hub E-commerce",
    description: "A full-stack e-commerce platform with dynamic product management, secure user authentication, and seamless payment integration.",
    tags: ["React", "Node js", "JWT", "Tailwind","express js"],
    github: "https://github.com/Akshat451-ctrl/shop-hub-mern",
    live: "https://shop-hub-mern.vercel.app/",
    image: "https://www.theclassictemplates.com/cdn/shop/files/Classic-Ecommerce-Pro.png?v=1714634334", // Replace with actual project image URL
  },
  {
    title: "Case Flow- Bulk csv Management System",
    description: "A web application for bulk CSV file management, featuring efficient data processing, dynamic table rendering, and user-friendly interface for seamless file uploads and management.",
    tags: ["React js", "Javascript", "Tailwind CSS", "Node js", "Express js" , "MongoDB"],
    github: "https://github.com/Akshat451-ctrl/caseflow",
    live: "https://caseflow-pi.vercel.app/",
    image: "https://support.currencycloud.com/hc/article_attachments/15640977687452", // Replace with actual project image URL
  },
  {
    title: "Instagram Clone- MERN Stack",
    description: "A Mern Stack Instagram clone wih features like photo uploading , like unlike the photos , and follow or unfollow the users. and much more features.",
    tags: ["Node.js", "Socket.io", "Crypto", "React"],
    github: "https://github.com/Akshat451-ctrl/Trueigtech-task1",
    live: "https://merninstagramclone.vercel.app/",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnpoyNi1CIwRwuNgaV1bndH37Cz2zbHAClMA&s", // Replace with actual project image URL
  },
  {
    title: "Printing Queue Management System",
    description: "A web-based application for managing printing queues in an College Environment, allowing users to submit print jobs, track their status, and optimize printer usage.",
    tags: ["React", "Framer Motion", "Tailwind","Node.js", "Express", "MongoDB", "JWT"],
    github: "https://github.com/Akshat451-ctrl/printing-website",
    live: "https://printing-webapp.netlify.app/",
    image: "https://png.pngtree.com/thumb_back/fh260/background/20230610/pngtree-commercial-office-with-a-printer-and-scanner-image_2970146.jpg", // Replace with actual project image URL
  },
  {
    title: "car rental - A car booking website",
    description: "Full-stack real estate platform with property listings, advanced filtering, and seamless booking system.",
    tags: ["MERN Stack", "MongoDB", "Google Maps", "Stripe"],
    github: "https://github.com/Akshat451-ctrl/Car-rental",
    live: "https://akshatmotors.netlify.app/",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1dO1HapybwSUbHWhFXdJeJ63RQ--zyjk0EA&s", // Replace with actual project image URL
  },
  {
    title: "A Role Based task management app with AI-powered features",
    description: "Personal health monitoring app with real-time analytics, fitness tracking, and health insights dashboard.(backend are under Maintenance)",
    tags: ["TypeScript", "FastAPI", "Ai chatbot", "Redux"],
    github: "https://github.com/Akshat451-ctrl/full-stack-project",
    live: "https://full-stack-project-chi-one.vercel.app/",
    image: "https://www.experro.com/mm-images/for-inner-image-100-9la7e2bn-iaiybgcl.jpg", // Replace with actual project image URL
  },
];

const experience = [
  {
    role: "Full Stack Developer Intern",
    company: "Zidio Development",
    period: "2 Month Internship",
    duration: "Jan 2025 – Feb 2025",
    logo: "https://media.licdn.com/dms/image/v2/D560BAQEuBbk89pIjuw/company-logo_200_200/B56ZnkJ9VnIsAI-/0/1760469440984/z_ultimateminds_logo?e=1773273600&v=beta&t=NL0UZO9QjAwJC7ZPGcMpMtAoCCvEr45UEfBnKb014ZA", // Placeholder emoji, replace with actual logo
    points: [
      "Developed responsive web applications using React and Tailwind CSS",
      "Built and integrated REST APIs with Express.js and Node.js backend",
      "Implemented user authentication and authorization systems",
      "Collaborated with team to fix bugs and optimize performance",
    ],
    certificate: "Zidio_Certificate",
    description: "Worked on full-stack web development projects with modern technologies",
  },
  {
    role: "Full Stack Developer Intern",
    company: "Nehvij Technologies",
    period: "3 Month Internship",
    duration: "jun 2025 – sep 2025",
    logo: "https://media.licdn.com/dms/image/v2/C560BAQHxnidyQ6-Swg/company-logo_200_200/company-logo_200_200/0/1630658352255?e=1773273600&v=beta&t=B7FbnVliUBL0Jv6ztrg1BVOQig3VYjHj-XPUORWJmRA", // Placeholder emoji, replace with actual logo
    points: [
      "Designed and developed database schemas using MongoDB and PostgreSQL",
      "Created reusable React components and custom hooks for better code organization",
      "Implemented real-time features using Socket.io and WebSockets",
      "Wrote unit and integration tests using Jest and React Testing Library",
    ],
    certificate: "Nehvij_Certificate",
    description: "Specialized in building scalable backend systems and interactive frontends",
  },
  {
    role: "Full Stack Developer",
    company: "Fealty Technologies",
    period: "Current Position",
    duration: "Jan 5, 2026 – Present",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQEaVHUnDDV4Pg/company-logo_200_200/B4DZhfZ3lHHYAU-/0/1753947273973?e=1773273600&v=beta&t=jJfQREMDZXiRGLdwGHYNMY2oyTEi3PUwn4QW54gcjek", // Placeholder emoji, replace with actual logo
    points: [
      "Developing enterprise-level applications with React, TypeScript, and Node.js",
      "Optimizing database queries and API performance for better user experience",
      "Implementing advanced security features including encryption and secure authentication",
      "Mentoring junior developers and conducting code reviews for quality assurance",
    ],
    certificate: "Fealty_Experience",
    description: "Currently working on cutting-edge full-stack projects with modern tech stack",
  },
];

const certifications = [
  {
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2024",
    detail: "Validated cloud fundamentals, shared responsibility models, and best practices.",
    link: "#",
  },
  {
    title: "Google Cybersecurity Certificate",
    issuer: "Coursera / Google",
    date: "2023",
    detail: "Cybersecurity foundations with networking, system hardening, and incident response.",
    link: "#",
  },
  {
    title: "Meta Frontend Developer",
    issuer: "Meta / Coursera",
    date: "2023",
    detail: "Front-end fundamentals, React hooks, and responsive interfaces.",
    link: "#",
  },
  // {
  //   title: "HackerRank Problem Solving",
  //   issuer: "HackerRank",
  //   date: "2022",
  //   detail: "Competitive programming skills spanning data structures and algorithms.",
  //   link: "#",
  // },
];

const contactChannels = [
  {
    label: "Email",
    detail: "akshatghatiya3@gmail.com",
    meta: "Primary inbox",
    href: "mailto:akshatghatiya3@gmail.com",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    detail: "/in/akshat-ghatiya-422748268/",
    meta: "Connect with me",
    href: "https://www.linkedin.com/in/akshat-ghatiya-422748268/",
    icon: Linkedin,
  },
  {
    label: "WhatsApp",
    detail: "+91 7999388296",
    meta: "Quick chat",
    href: "https://wa.me/917999388296",
    icon: Phone,
  },
];

const contactHighlights = [
  { label: "Avg. Response", value: "1 business day" },
  { label: "Projects Delivered", value: "10+" },
  { label: "Availability", value: "Open for freelance & internships" },
];

const education = [
  {
    degree: "Bachelor of Technology in Computer Science",
    institution: "Medicaps University",
    period: "2022 – 2026",
    gpa: "8/10",
    achievements: [
      "Dean's List for 3 consecutive semesters",
      "Led technical workshops on AI and web development",
      "Active member of Computer Science Society",
    ],
  },
  {
    degree: "Higher Secondary Certificate (12th)",
    institution: "MP Public Higher Secondary School",
    period: "2020 – 2022",
    gpa: "89%",
    achievements: [
      "School topper in Computer Science",
      "Participated in inter-school coding competitions",
    ],
  },
  {
    degree: "High School Certificate (10th)",
    institution: "MP Public Higher Secondary School",
    period: "2019 – 2020",
    gpa: "84%",
    achievements: [
      "School topper in Computer Science",
      "Participated in inter-school coding competitions",
    ],
  },
];

/* ─── Animated Section Wrapper ─── */
const Section = ({ children, id, className = "" }: { children: React.ReactNode; id?: string; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`py-20 md:py-28 ${className}`}
    >
      {children}
    </motion.section>
  );
};

/* ─── Counter Component ─── */
const Counter = ({ value, duration = 2000 }: { value: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const target = parseInt(value.replace('+', ''));

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 50);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 50);
    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count}{value.includes('+') ? '+' : ''}</span>;
};

/* ─── Skill Bar ─── */
const SkillBar = ({ level, delay, color }: { level: number; delay: number; color: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="h-1.5 rounded-full bg-border/30 overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ background: color }}
        initial={{ width: 0 }}
        animate={isInView ? { width: `${level}%` } : {}}
        transition={{ duration: 1.2, delay: delay * 0.1, ease: "easeOut" }}
      />
    </div>
  );
};

/* ─── Main Portfolio ─── */
const Portfolio = () => {
  const heroRef = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mailLoading, setMailLoading] = useState(false);
  const [mailMessage, setMailMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [selectedSkillCategory, setSelectedSkillCategory] = useState(0);
  const [typedText, setTypedText] = useState("");
  const fullText = "Building Scalable Web & AI Solutions";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // Initialize EmailJS
  emailjs.init(import.meta.env.VITE_PUBLIC_KEY || "");

  // Handle contact form submission
  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formRef.current) return;

    setMailLoading(true);
    setMailMessage(null);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_SERVICE_ID || "",
        import.meta.env.VITE_TEMPLATE_ID || "",
        formRef.current,
        import.meta.env.VITE_PUBLIC_KEY || ""
      );

      setMailMessage({
        type: "success",
        text: "Message sent successfully! I'll get back to you soon.",
      });

      // Reset form after successful submission
      formRef.current.reset();

      // Clear message after 5 seconds
      setTimeout(() => setMailMessage(null), 5000);
    } catch (error) {
      console.error("Email sending failed:", error);
      setMailMessage({
        type: "error",
        text: "Failed to send message. Please try again or contact me directly.",
      });

      // Clear error message after 5 seconds
      setTimeout(() => setMailMessage(null), 5000);
    } finally {
      setMailLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* ─── NAV ─── */}
      <nav className="fixed top-0 w-full z-50 glass-strong">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <a href="#hero" className="text-lg font-bold text-foreground tracking-tight">
            AG<span className="gradient-text">.</span>
          </a>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {["About", "Skills", "Projects", "Experience", "Education", "Contact"].map((s) => (
              <a
                key={s}
                href={`#${s.toLowerCase()}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {s}
              </a>
            ))}
          </div>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-foreground"
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            <a href="#contact">
              <Button size="sm" className="gradient-primary text-primary-foreground hover:opacity-90 transition-opacity">
                Let's Talk
              </Button>
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-foreground"
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-muted-foreground hover:text-foreground"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong border-t border-border"
          >
            <div className="container mx-auto px-6 py-4 space-y-4">
              {["About", "Skills", "Projects", "Experience", "Education", "Contact"].map((s) => (
                <a
                  key={s}
                  href={`#${s.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 py-2"
                >
                  {s}
                </a>
              ))}
              <a href="#contact" onClick={() => setIsMenuOpen(false)}>
                <Button size="sm" className="gradient-primary text-primary-foreground hover:opacity-90 transition-opacity w-full">
                  Let's Talk
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </nav>

      {/* ─── HERO ─── */}
      <section ref={heroRef} id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Animated Background */}
        <div className="absolute inset-0 opacity-50">
          {/* <HeroBackground /> */}
        </div>
        {/* Animated bg orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-[120px] animate-float" />
          <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-accent/10 blur-[120px] animate-float" style={{ animationDelay: "3s" }} />
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-10 md:gap-16">
            {/* Text */}
            <div className="text-center md:text-left">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <span className="inline-block rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-xs font-mono text-muted-foreground mb-8 tracking-wider uppercase">
                  Full Stack Developer • AI & Cybersecurity
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="text-5xl sm:text-6xl md:text-8xl font-black text-foreground leading-[0.95] tracking-tight"
              >
                Akshat
                <br />
                <span className="gradient-text">Ghatiya</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl"
              >
                {typedText}
                <span className="animate-pulse">|</span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45 }}
                className="mt-10 flex flex-col sm:flex-row justify-center md:justify-start gap-4 flex-wrap"
              >
                <a href="#projects">
                  <Button size="lg" className="gradient-primary text-primary-foreground hover:opacity-90 transition-opacity gap-2 w-full sm:w-auto">
                    View Projects <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
                <a href={resume} download="Akshat_Ghatiya_Resume.pdf">
                  <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto border-border hover:bg-secondary">
                    Download Resume <Download className="h-4 w-4" />
                  </Button>
                </a>
                <a href="#contact">
                  <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto border-border hover:bg-secondary">
                    Contact Me <Mail className="h-4 w-4" />
                  </Button>
                </a>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-6 text-base md:text-lg gradient-text font-medium"
              >
                Let's connect and create something productive together!
              </motion.p>
            </div>

            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="shrink-0 mt-14 md:-mt-16"
            >
              <div className="relative">
                <div className="absolute -inset-1 gradient-primary rounded-full blur-lg opacity-40" />
                <img
                  src={passwordphoto}
                  alt="Akshat Ghatiya"
                  className="relative w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-2 border-border shadow-glow"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground"
        >
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </section>

      {/* ─── ABOUT ─── */}
      <Section id="about">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              About <span className="gradient-text">Me</span>
            </h2>
            <div className="h-1 w-16 gradient-primary rounded-full mb-10" />
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="shrink-0">
                <img
                  src={akshatPhoto}
                  alt="Akshat Ghatiya"
                  className="w-40 h-52 md:w-52 md:h-64 rounded-2xl object-cover border border-border shadow-glow"
                />
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">
                I'm a Computer Science Engineering student passionate about building performant web applications
                and exploring the intersection of AI, machine learning, and cybersecurity. I enjoy working with
                modern frameworks, designing clean UIs, and solving complex problems with scalable solutions.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Projects", value: "10+" },
                { label: "Technologies", value: "15+" },
                { label: "Certifications", value: "4+" },
                { label: "Commits", value: "500+" },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="glass rounded-xl p-5 text-center"
                >
                  <div className="text-2xl font-bold gradient-text">
                    <Counter value={stat.value} />
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
            <div className="mt-10 flex justify-center md:justify-start">
              <a href={resume} download="Akshat_Ghatiya_Resume.pdf">
                <Button className="gradient-primary text-primary-foreground hover:opacity-90 transition-opacity gap-2">
                  <Download className="h-4 w-4" /> Download My Resume
                </Button>
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── SKILLS ─── */}
      <Section id="skills">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-3">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Tech <span className="gradient-text">Stack</span>
                </h2>
              </div>
              <p className="text-sm text-muted-foreground uppercase tracking-[0.4em]">Select a category</p>
            </div>
            <div className="h-1 w-16 gradient-primary rounded-full mb-6" />

            {/* Tab Navigation */}
            <div className="flex overflow-x-auto gap-2 mb-8 pb-2">
              <div className="flex gap-2 min-w-full">
                {skills.map((group, idx) => (
                  <motion.button
                    key={group.category}
                    onClick={() => setSelectedSkillCategory(idx)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 shrink-0 border ${
                      selectedSkillCategory === idx
                        ? "gradient-primary text-primary-foreground border-primary/50 shadow-lg shadow-primary/20"
                        : "glass border-border/40 text-muted-foreground hover:text-foreground hover:border-accent/50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <group.icon className="h-4 w-4" />
                      {group.category}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Content Area */}
            <motion.div
              key={selectedSkillCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="glass rounded-2xl p-8 border border-border/40"
            >
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills[selectedSkillCategory].items.map((skill, idx) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="group relative"
                  >
                    <div className="glass rounded-xl p-5 border border-border/40 hover:border-border/80 transition-all duration-300 h-full hover:shadow-glow">
                      {/* Icon */}
                      <div
                        className="h-14 w-14 flex items-center justify-center rounded-2xl mb-4 border border-border/40 bg-background/80"
                        style={{ borderColor: `${skill.color}40` }}
                      >
                        <skill.icon className="h-7 w-7" style={{ color: skill.color }} />
                      </div>

                      {/* Name and Level */}
                      <h4 className="font-semibold text-foreground mb-1">{skill.name}</h4>
                      <p className="text-xs text-muted-foreground uppercase tracking-[0.3em] mb-4">
                        Proficiency
                      </p>

                      {/* Progress Bar */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-mono text-accent">{skill.level}%</span>
                        </div>
                        <SkillBar level={skill.level} delay={idx} color={skill.color} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Category Footer */}
              <div className="mt-6 pt-4 border-t border-border/30 flex justify-between items-center">
                <p className="text-xs text-muted-foreground uppercase tracking-[0.35em]">
                  {skills[selectedSkillCategory].items.length} technologies
                </p>
                <p className="text-xs text-accent font-semibold uppercase tracking-[0.35em]">
                  {((skills[selectedSkillCategory].items.reduce((acc, skill) => acc + skill.level, 0) / skills[selectedSkillCategory].items.length) | 0)}% avg proficiency
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ─── PROJECTS ─── */}
      <Section id="projects">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <div className="h-1 w-16 gradient-primary rounded-full mb-12" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, i) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ y: -8 }}
                  className="glass rounded-xl overflow-hidden group h-full flex flex-col hover:shadow-glow transition-all duration-300"
                >
                  {/* Project Header with Image */}
                  <div className="relative h-40 overflow-hidden group">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white text-center">
                        <Eye className="h-8 w-8 mx-auto mb-2" />
                        <span className="text-sm font-semibold">View Project</span>
                      </div>
                    </div>

                    {/* Project Category Badge */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary border border-primary/30">
                        Featured
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex flex-col flex-1">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2 group-hover:gradient-text transition-all">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                      {project.description}
                    </p>

                    {/* Technologies Tags */}
                    <div className="mb-4 pb-4 border-b border-border/50">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag, idx) => (
                          <motion.span
                            key={tag}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            className="rounded-full bg-gradient-to-r from-primary/10 to-accent/10 hover:from-primary/20 hover:to-accent/20 px-2.5 py-1 text-xs font-mono text-foreground border border-primary/20 transition-all hover:border-primary/50"
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2.5 pt-2">
                      <a href={project.github} target="_blank" rel="noreferrer" className="flex-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-2 border-border hover:border-primary hover:text-primary hover:bg-primary/5 w-full transition-all"
                        >
                          <Github className="h-4 w-4" />
                          <span className="text-xs font-semibold">Code</span>
                        </Button>
                      </a>
                      <a href={project.live} target="_blank" rel="noreferrer" className="flex-1">
                        <Button
                          size="sm"
                          className="gradient-primary text-primary-foreground hover:opacity-90 gap-2 w-full transition-all"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span className="text-xs font-semibold">Live</span>
                        </Button>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ─── EXPERIENCE ─── */}
      <Section id="experience">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Experience & <span className="gradient-text">Achievements</span>
            </h2>
            <div className="h-1 w-16 gradient-primary rounded-full mb-12" />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {experience.map((exp) => (
                <Dialog key={exp.company}>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <DialogTrigger asChild>
                      <div className="glass rounded-xl p-6 cursor-pointer h-full flex flex-col hover:shadow-glow transition-all duration-300 group">
                        {/* Company Logo */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 flex items-center justify-center shrink-0">
                            {exp.logo.startsWith("http") ? (
                              <img src={exp.logo} alt={exp.company} className="w-12 h-12 object-cover rounded-lg" />
                            ) : (
                              <span className="text-4xl">{exp.logo}</span>
                            )}
                          </div>
                          <Eye className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>

                        {/* Company Details */}
                        <h3 className="text-lg font-bold text-foreground mb-1">{exp.company}</h3>
                        <p className="text-accent text-sm font-semibold mb-2">{exp.role}</p>
                        <p className="text-xs text-muted-foreground mb-4">{exp.duration}</p>

                        {/* Brief description */}
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{exp.description}</p>

                        {/* View Certificate button */}
                        <div className="mt-auto pt-4 border-t border-border/50">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full text-xs text-accent hover:text-accent hover:bg-accent/10"
                          >
                            <Eye className="h-3 w-3 mr-2" /> View Certificate
                          </Button>
                        </div>
                      </div>
                    </DialogTrigger>
                  </motion.div>

                  {/* Modal Content */}
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl flex items-center gap-3">
                        <div className="w-10 h-10 flex items-center justify-center shrink-0">
                          {exp.logo.startsWith("http") ? (
                            <img src={exp.logo} alt={exp.company} className="w-10 h-10 object-cover rounded-lg" />
                          ) : (
                            <span className="text-3xl">{exp.logo}</span>
                          )}
                        </div>
                        {exp.company}
                      </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6">
                      {/* Role and Period */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Position</p>
                          <p className="text-lg font-semibold text-foreground">{exp.role}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Duration</p>
                          <p className="text-lg font-semibold text-foreground">{exp.duration}</p>
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">About</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
                      </div>

                      {/* Achievements */}
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-3">Key Achievements</p>
                        <ul className="space-y-2">
                          {exp.points.map((point, idx) => (
                            <li key={idx} className="flex gap-3">
                              <span className="text-accent text-sm font-bold mt-0.5">✓</span>
                              <span className="text-sm text-muted-foreground">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Certificate Placeholder */}
                      <div className="pt-4 border-t border-border">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-3">Certificate</p>
                        <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-8 text-center border border-primary/20">
                          <Building2 className="h-12 w-12 text-primary/40 mx-auto mb-3" />
                          <p className="text-sm font-semibold text-foreground mb-1">{exp.certificate}</p>
                          <p className="text-xs text-muted-foreground">Internship Certificate</p>
                          <Button className="mt-4 gradient-primary text-primary-foreground hover:opacity-90">
                            <Download className="h-4 w-4 mr-2" /> Download Certificate
                          </Button>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>

            <div className="flex items-center justify-between gap-3 mt-8 mb-6 text-foreground">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-accent" />
                <h3 className="text-xl font-bold">Certifications</h3>
              </div>
              <p className="text-sm text-muted-foreground">Keep credentials hands-on and up to date</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {certifications.map((cert, idx) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  viewport={{ once: true }}
                  className="glass rounded-2xl p-6 relative overflow-hidden border border-border/50 group"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity pointer-events-none" />
                  <div className="relative space-y-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground uppercase tracking-[0.4em]">
                      <span>Certified</span>
                      <span className="text-accent">{cert.date}</span>
                    </div>
                    <h4 className="text-lg font-bold text-foreground leading-tight">{cert.title}</h4>
                    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{cert.detail}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-accent" />
                      <span>Verified credential</span>
                    </div>
                    <a href={cert.link} target="_blank" rel="noreferrer" className="inline-flex">
                      <Button size="sm" variant="outline" className="gap-2 border-border hover:border-accent text-xs font-semibold">
                        View Credential
                      </Button>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ─── EDUCATION ─── */}
      <Section id="education">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              <span className="gradient-text">Education</span>
            </h2>
            <div className="h-1 w-16 gradient-primary rounded-full mb-12" />

            <div className="grid md:grid-cols-3 gap-8">
              {education.map((edu, idx) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, y: -50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="group"
                >
                  <div className="glass rounded-xl p-6 h-full hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
                    {/* Header with Icon */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="p-3 rounded-lg gradient-primary">
                        <Award className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <span className="text-xs font-mono text-accent bg-accent/10 px-2.5 py-1 rounded-full">
                        {edu.period}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-bold text-foreground mb-1">{edu.degree}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{edu.institution}</p>
                    
                    {/* GPA Badge */}
                    <div className="inline-block bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg px-3 py-1.5 mb-4">
                      <p className="text-sm font-semibold text-accent">GPA: <span className="text-foreground">{edu.gpa}</span></p>
                    </div>

                    {/* Achievements */}
                    <div className="space-y-2 pt-4 border-t border-border">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-3">Achievements</p>
                      {edu.achievements.map((achievement, aidx) => (
                        <motion.div
                          key={achievement}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: (idx * 0.15) + (aidx * 0.1) }}
                          viewport={{ once: true }}
                          className="flex gap-2"
                        >
                          <span className="text-accent text-lg shrink-0">★</span>
                          <span className="text-sm text-muted-foreground leading-relaxed">{achievement}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ─── CONTACT ─── */}
      <Section id="contact">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center lg:text-left mb-10 space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Get in <span className="gradient-text">Touch</span>
              </h2>
              <div className="h-1 w-16 gradient-primary rounded-full mx-auto lg:mx-0" />
              <p className="text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                Let&apos;s build something meaningful together — whether you need help with product strategy,
                a short-term collaboration, or a long-term partnership.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="grid gap-8 lg:grid-cols-[1.05fr,1fr]"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-8 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-accent/20 to-transparent opacity-60 blur-3xl pointer-events-none" />
                <div className="relative space-y-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-semibold">Contact</p>
                    <h3 className="text-2xl font-bold text-foreground">Reach out directly</h3>
                  </div>
                  <div className="space-y-4">
                    {contactChannels.map((channel) => (
                      <a
                        key={channel.label}
                        href={channel.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between gap-4 rounded-2xl border border-border/40 bg-background/60 px-4 py-3 text-sm text-foreground transition hover:border-accent"
                      >
                        <div className="flex items-center gap-3">
                          <channel.icon className="h-5 w-5 text-accent" />
                          <div>
                            <p className="text-sm font-semibold text-foreground">{channel.label}</p>
                            <p className="text-xs text-muted-foreground">{channel.detail}</p>
                          </div>
                        </div>
                        <span className="text-xs text-primary font-semibold">{channel.meta}</span>
                      </a>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      I respond fast, share honest timelines, and can jump on a quick call to understand your goals.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {contactHighlights.map((highlight) => (
                        <span
                          key={highlight.label}
                          className="border border-border/80 rounded-full px-3 py-1.5 text-xs text-muted-foreground font-semibold bg-background/70"
                        >
                          <span className="text-foreground font-bold mr-1">{highlight.value}</span>
                          {highlight.label}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <a href="mailto:akshatghatiya3@gmail.com" className="w-full inline-flex">
                      <Button size="sm" className="gradient-primary text-primary-foreground w-full">
                        Schedule a quick call
                      </Button>
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.form
                ref={formRef}
                onSubmit={handleContactSubmit}
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-8 space-y-4 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent opacity-40 -z-10" />
                <div className="relative grid sm:grid-cols-2 gap-4">
                  <Input
                    name="name"
                    placeholder="Your Name"
                    className="bg-secondary/50 border-border"
                    required
                    disabled={mailLoading}
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    className="bg-secondary/50 border-border"
                    required
                    disabled={mailLoading}
                  />
                </div>
                <Input
                  name="title"
                  placeholder="Subject"
                  className="bg-secondary/50 border-border"
                  required
                  disabled={mailLoading}
                />
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  rows={4}
                  className="bg-secondary/50 border-border"
                  required
                  disabled={mailLoading}
                />

                {/* Status Message */}
                {mailMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex items-center gap-2 p-3 rounded-lg ${
                      mailMessage.type === "success"
                        ? "bg-success/10 text-success border border-success/30"
                        : "bg-destructive/10 text-destructive border border-destructive/30"
                    }`}
                  >
                    {mailMessage.type === "success" ? (
                      <Check className="h-4 w-4 shrink-0" />
                    ) : (
                      <AlertCircle className="h-4 w-4 shrink-0" />
                    )}
                    <span className="text-sm font-medium">{mailMessage.text}</span>
                  </motion.div>
                )}

                <Button
                  type="submit"
                  disabled={mailLoading}
                  className="gradient-primary text-primary-foreground hover:opacity-90 transition-opacity gap-2 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {mailLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="h-4 w-4"
                      >
                        <Send className="h-4 w-4" />
                      </motion.div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </motion.form>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ─── FLOATING SOCIAL PANEL ─── */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="fixed right-0 bottom-0 z-30 flex flex-col gap-4"
      >
        {/* Glassmorphism Background Panel */}
        <div className=" rounded-full p-4 flex flex-col gap-3">
          {/* Email */}
          <motion.a
            href="mailto:akshatghatiya3@gmail.com"
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="group relative"
            title="Send Email"
          >
            <div className="p-3 rounded-full bg-gradient-to-br from-red-500 to-orange-500 text-white shadow-lg hover:shadow-glow transition-all duration-300 cursor-pointer">
              <Mail className="h-5 w-5" />
            </div>
            <div className="absolute right-14 top-1/2 -translate-y-1/2 bg-foreground text-background px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Email
            </div>
          </motion.a>

          {/* LinkedIn */}
          <motion.a
            href="https://www.linkedin.com/in/akshat-ghatiya-422748268/"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="group relative"
            title="Open LinkedIn"
          >
            <div className="p-3 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-glow transition-all duration-300 cursor-pointer">
              <Linkedin className="h-5 w-5" />
            </div>
            <div className="absolute right-14 top-1/2 -translate-y-1/2 bg-foreground text-background px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              LinkedIn
            </div>
          </motion.a>

          {/* WhatsApp */}
          <motion.a
            href="https://wa.me/917999388296"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="group relative"
            title="Chat on WhatsApp"
          >
            <div className="p-3 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg hover:shadow-glow transition-all duration-300 cursor-pointer">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div className="absolute right-14 top-1/2 -translate-y-1/2 bg-foreground text-background px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              WhatsApp
            </div>
          </motion.a>
        </div>
      </motion.div>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-border py-12 bg-secondary/20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Akshat Ghatiya</h3>
              <p className="text-sm text-muted-foreground">Full Stack Developer passionate about creating innovative solutions.</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" className="hover:text-accent transition-colors">About</a></li>
                <li><a href="#skills" className="hover:text-accent transition-colors">Skills</a></li>
                <li><a href="#projects" className="hover:text-accent transition-colors">Projects</a></li>
                <li><a href="#experience" className="hover:text-accent transition-colors">Experience</a></li>
                <li><a href="#education" className="hover:text-accent transition-colors">Education</a></li>
                <li><a href="#contact" className="hover:text-accent transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="https://github.com/Akshat451-ctrl" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
                  <Github className="h-5 w-5" />
                </a>
                <a href="https://www.linkedin.com/in/akshat-ghatiya-422748268/" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="mailto:akshatghatiya3@gmail.com" className="hover:text-accent transition-colors">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Contact</h4>
              <p className="text-sm text-muted-foreground">akshatghatiya3@gmail.com</p>
              <p className="text-sm text-muted-foreground">+91 7999388296</p>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2026 Akshat Ghatiya. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
