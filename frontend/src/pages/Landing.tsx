import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Users, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContest";

const features = [
  {
    icon: CheckCircle,
    title: "Task Management",
    description: "Create, assign, and track tasks with ease. Stay organized and productive.",
  },
  {
    icon: Users,
    title: "Role-Based Access",
    description: "Admins, editors, and viewers — everyone gets the right level of access.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "JWT authentication keeps your data safe and your team in control.",
  },
];

const Landing = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" className="text-xl font-bold text-foreground">
            Task<span className="text-primary">Flow</span>
          </Link>
          <div className="flex gap-3">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button>Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Log in</Button>
                </Link>
                <Link to="/register">
                  <Button className="gradient-primary text-primary-foreground hover:opacity-90 transition-opacity">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="container mx-auto px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            Role-Based Task Management
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-foreground leading-tight max-w-3xl mx-auto">
            Manage tasks with
            <span className="text-primary"> clarity</span> and
            <span className="text-primary"> control</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
            A modern task management platform with role-based permissions. Assign the right access to the right people.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link to={isAuthenticated ? "/dashboard" : "/register"}>
              <Button size="lg" className="gradient-primary text-primary-foreground hover:opacity-90 transition-opacity gap-2">
                Get Started Free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="rounded-xl border border-border bg-card p-8 shadow-card hover:shadow-card-hover transition-shadow"
            >
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          © 2026 TaskFlow. Built with React & FastAPI.
        </div>
      </footer>
    </div>
  );
};

export default Landing;
