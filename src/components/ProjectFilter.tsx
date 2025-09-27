import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

interface ProjectFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const ProjectFilter = ({ categories, activeCategory, onCategoryChange }: ProjectFilterProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Filter className="w-4 h-4" />
        Filter by Category:
      </div>
      
      <div className="flex flex-wrap justify-center gap-2">
        <Button
          variant={activeCategory === "All" ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange("All")}
          className="transition-all duration-300 hover:scale-105"
        >
          All Projects
        </Button>
        
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category)}
            className="transition-all duration-300 hover:scale-105"
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};