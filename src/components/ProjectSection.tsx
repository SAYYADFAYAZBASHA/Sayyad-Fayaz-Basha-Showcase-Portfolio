import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ArrowRight, Code2 } from "lucide-react";
import { ProjectCard } from "./ProjectCard";
import { ProjectFilter } from "./ProjectFilter";

// Project data with enhanced structure
const projects = [
  {
    title: "Tech Academic Toolkit",
    description: "A comprehensive academic toolkit designed for technology students, featuring study materials, project templates, and interactive learning resources to enhance the educational experience.",
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap", "Responsive Design"],
    image: "https://i.postimg.cc/XYw1mCQs/tech-toolkit-preview.png",
    demoLink: "https://sayyadfayazbasha.github.io/Tech-Academic-Toolkit/",
    category: "Educational",
    year: "2024",
    features: ["Study Materials", "Project Templates", "Interactive Learning", "Resource Library"]
  },
  {
    title: "TechMart E-commerce",
    description: "A modern e-commerce platform for technology products with advanced filtering, shopping cart functionality, user authentication, and payment integration for seamless online shopping.",
    technologies: ["React", "Node.js", "MongoDB", "Express", "JWT", "Stripe"],
    image: "https://i.postimg.cc/d3bnSsdM/techmart-preview.png",
    demoLink: "https://sayyadfayazbasha.github.io/TechMart-E-commerce-Application-/",
    category: "E-commerce",
    year: "2024",
    features: ["Product Catalog", "Shopping Cart", "User Auth", "Payment Gateway"]
  }
];

const categories = [...new Set(projects.map(project => project.category))];

export const ProjectSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  
  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-10 left-10 w-40 h-40 border-2 border-primary rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 border-2 border-purple-500 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 border-2 border-cyan-500 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute top-20 right-1/3 w-28 h-28 border-2 border-accent rounded-lg rotate-45 animate-pulse delay-3000"></div>
        <div className="absolute bottom-1/3 left-1/2 w-20 h-20 border-2 border-emerald-500 rounded-full animate-pulse delay-4000"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Enhanced Section Header */}
        <div className="text-center mb-16 space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-purple-600/10 px-6 py-3 rounded-full border border-primary/20">
            <Code2 className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">Featured Work</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-purple-600 bg-clip-text text-transparent leading-tight">
            Project Portfolio
          </h2>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent w-24"></div>
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
            <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent w-24"></div>
          </div>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover my latest projects showcasing modern web development practices, 
            innovative solutions, and cutting-edge technologies that solve real-world problems.
          </p>
        </div>

        {/* Project Filter */}
        <ProjectFilter 
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        
        {/* Projects Grid with Staggered Animation */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto mb-16">
          {filteredProjects.map((project, index) => (
            <div 
              key={`${project.title}-${activeCategory}`}
              className="animate-fade-in"
              style={{ 
                animationDelay: `${index * 200}ms`,
                animationFillMode: 'both'
              }}
            >
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
        
        {/* Enhanced Call to Action */}
        <div className="text-center space-y-6 animate-fade-in">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Want to explore more of my work?
            </h3>
            <p className="text-muted-foreground mb-8">
              Check out my GitHub repository for more projects, open-source contributions, 
              and code samples that demonstrate my development journey.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 px-8"
              onClick={() => window.open('https://github.com/SAYYADFAYAZBASHA', '_blank', 'noopener,noreferrer')}
            >
              <Github className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              View GitHub Profile
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="group hover:bg-primary/5 border-primary/30 hover:border-primary/50 transition-all duration-300"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Let's Collaborate
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};