"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { PencilSimple } from "@phosphor-icons/react";

interface InlineEditProps {
  value: string;
  onSave: (value: string) => void;
  as?: "input" | "textarea";
  className?: string;
  placeholder?: string;
  showIcon?: boolean;
}

export function InlineEdit({ 
  value, 
  onSave, 
  as = "input", 
  className, 
  placeholder, 
  showIcon = true 
}: InlineEditProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value || "");
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setCurrentValue(value || "");
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    setIsEditing(false);
    if (currentValue !== value && currentValue.trim() !== "") {
      onSave(currentValue);
    } else {
      setCurrentValue(value); // Revert on empty input if not allowed? Let's just allow it or revert
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && as === "input") {
      handleSave();
    }
    if (e.key === "Escape") {
      setCurrentValue(value);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    const Component = as;
    return (
      <Component
        ref={inputRef as any}
        value={currentValue}
        onChange={(e) => setCurrentValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={cn(
          "w-full bg-transparent border-b border-black/20 focus:outline-none focus:border-black py-1",
          className
        )}
      />
    );
  }

  return (
    <div 
      className={cn("group cursor-text flex flex-wrap items-center gap-2", className)}
      onClick={() => setIsEditing(true)}
    >
      <span className={cn(value ? "" : "text-gray-400 italic font-semibold")}>
        {value || placeholder}
      </span>
      {showIcon && <PencilSimple weight="bold" className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />}
    </div>
  );
}
