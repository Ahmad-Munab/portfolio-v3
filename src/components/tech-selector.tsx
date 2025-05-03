"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  techIcons,
  techIconsByCategory,
  techCategories,
  TechIcon,
} from "@/data/tech-icons";

interface TechSelectorProps {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export function TechSelector({
  value = [],
  onChange,
  placeholder = "Select technologies...",
}: TechSelectorProps) {
  const [open, setOpen] = useState(false);
  const [selectedTechs, setSelectedTechs] = useState<TechIcon[]>([]);

  // Update selected techs when value changes
  useEffect(() => {
    const selected = techIcons.filter((tech) => value.includes(tech.name));
    setSelectedTechs(selected);
  }, [value]);

  const handleSelect = (tech: TechIcon) => {
    const isSelected = value.includes(tech.name);

    if (isSelected) {
      // Remove from selection
      onChange(value.filter((item) => item !== tech.name));
    } else {
      // Add to selection
      onChange([...value, tech.name]);
    }
  };

  const removeItem = (techName: string) => {
    onChange(value.filter((item) => item !== techName));
  };

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value.length > 0
              ? `${value.length} technologies selected`
              : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[300px]" align="start">
          <Command>
            <CommandInput placeholder="Search technologies..." />
            <CommandEmpty>No technology found.</CommandEmpty>
            <CommandList>
              <ScrollArea className="h-[300px]">
                {techCategories.map((category) => (
                  <CommandGroup key={category} heading={category}>
                    {techIconsByCategory[category].map((tech) => {
                      const isSelected = value.includes(tech.name);
                      const Icon = tech.icon;

                      return (
                        <CommandItem
                          key={tech.name}
                          value={tech.name}
                          onSelect={() => handleSelect(tech)}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <div
                            className={cn(
                              "flex h-4 w-4 items-center justify-center",
                              isSelected ? "opacity-100" : "opacity-0"
                            )}
                          >
                            <Check className="h-3 w-3" />
                          </div>
                          <div className="flex items-center gap-2 flex-1">
                            <Icon
                              style={{ color: tech.color }}
                              className="h-4 w-4"
                            />
                            <span>{tech.name}</span>
                          </div>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                ))}
              </ScrollArea>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Display selected technologies */}
      {selectedTechs.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {selectedTechs.map((tech) => {
            const Icon = tech.icon;
            return (
              <Badge
                key={tech.name}
                variant="secondary"
                className="flex items-center gap-1 py-1 px-2"
              >
                <Icon style={{ color: tech.color }} className="h-3 w-3" />
                <span>{tech.name}</span>
                <X
                  className="h-3 w-3 cursor-pointer ml-1"
                  onClick={() => removeItem(tech.name)}
                />
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
}
