import React from 'react';

// Button component props
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: React.ElementType;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  children: React.ReactNode;
}

// Input component props
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

// Textarea component props
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

// Theme context types
export interface ThemeContextType {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: 'light' | 'dark' | 'system';
  storageKey?: string;
}

// DecryptText component props
export interface DecryptTextProps {
  text: string;
  className?: string;
  duration?: number;
}

// Timeline item props
export interface TimelineItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  date: string;
  children?: React.ReactNode;
  side: 'left' | 'right';
}

// Timeline data structure
export interface TimelineData {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  date: string;
  content?: React.ReactNode;
}

// Navigation item
export interface NavItem {
  name: string;
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  tooltip?: string;
}
