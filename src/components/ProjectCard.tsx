import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Github, Calendar, Lightbulb } from "lucide-react";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  demoLink: string;
  category: string;
  year: string;
  features: string[];
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <Card className="group relative overflow-hidden bg-gradient-to-br from-background via-background to-background/95 border-2 border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 animate-fade-in">
      {/* Category Badge */}
      <div className="absolute top-4 left-4 z-20">
        <Badge 
          variant="outline" 
          className="bg-background/90 backdrop-blur-sm border-primary/40 text-primary font-medium"
        >
          {project.category}
        </Badge>
      </div>
      
      {/* Year Badge */}
      <div className="absolute top-4 right-4 z-20">
        <Badge 
          variant="secondary" 
          className="bg-background/90 backdrop-blur-sm flex items-center gap-1"
        >
          <Calendar className="w-3 h-3" />
          {project.year}
        </Badge>
      </div>

      {/* Project Image with Overlay */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
        />
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Floating Tech Icons */}
        <div className="absolute bottom-4 left-4 flex gap-2">
          {project.technologies.slice(0, 3).map((tech, techIndex) => (
            <div 
              key={techIndex} 
              className="w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-border/50 transition-all duration-300 hover:scale-110 hover:bg-primary/10"
              title={tech}
            >
              <div className="w-2 h-2 bg-primary rounded-full"></div>
            </div>
          ))}
        </div>
      </div>

      <CardContent className="p-6 space-y-4">
        {/* Project Title */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {project.title}
          </h3>
          <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all duration-300 group-hover:scale-110 flex-shrink-0 mt-0.5" />
        </div>

        {/* Project Description */}
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Key Features */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Lightbulb className="w-3 h-3" />
            Key Features
          </div>
          <div className="flex flex-wrap gap-1">
            {project.features.slice(0, 3).map((feature, featureIndex) => (
              <Badge 
                key={featureIndex} 
                variant="secondary" 
                className="text-xs py-0.5 px-2 bg-muted hover:bg-primary/10 transition-colors"
              >
                {feature}
              </Badge>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="space-y-2">
          <div className="text-xs font-medium text-muted-foreground">Technologies</div>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech, techIndex) => (
              <Badge 
                key={techIndex} 
                variant="outline" 
                className="text-xs hover:bg-primary/5 hover:border-primary/40 transition-all duration-200"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Button 
            size="sm" 
            className="w-full group/btn bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => window.open(project.demoLink, '_blank', 'noopener,noreferrer')}
          >
            <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform duration-300" />
            View Live Demo
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};