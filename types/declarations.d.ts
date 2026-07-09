// expo-router — build/index.d.ts is missing from the installed package;
// re-export the public surface we actually use so TypeScript is satisfied.
declare module 'expo-router' {
  import * as React from 'react';

  export type Href = string | { pathname: string; params?: Record<string, string> };

  export interface Router {
    push(href: Href): void;
    replace(href: Href): void;
    back(): void;
    canGoBack(): boolean;
  }

  export function useRouter(): Router;
  export function useLocalSearchParams<T extends Record<string, string> = Record<string, string>>(): T;
  export function useSegments(): string[];
  export function usePathname(): string;

  export interface LinkProps {
    href: Href;
    children?: React.ReactNode;
    [key: string]: any;
  }
  export const Link: React.FC<LinkProps>;

  export interface StackProps {
    screenOptions?: Record<string, any>;
    children?: React.ReactNode;
    [key: string]: any;
  }
  export const Stack: React.FC<StackProps> & {
    Screen: React.FC<{ name?: string; options?: Record<string, any> }>;
  };

  export const Slot: React.FC<{ [key: string]: any }>;
  export const Tabs: React.FC<{ [key: string]: any }> & {
    Screen: React.FC<{ name?: string; options?: Record<string, any> }>;
  };

  export function Redirect(props: { href: Href }): React.ReactElement;
}
