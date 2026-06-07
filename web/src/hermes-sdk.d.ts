declare global {
  interface Window {
    __HERMES_PLUGINS__: {
      register: (name: string, component: import('react').ComponentType<any>) => void;
      registerSlot: (slot: string, name: string, component: import('react').ComponentType<any>) => void;
    };
    __HERMES_PLUGIN_SDK__: any;
  }
}

declare module '@hermes/sdk' {
  import React from 'react';

  export const api: any;
  export const fetchJSON: (url: string, options?: any) => Promise<any>;
  export const authedFetch: (url: string, options?: any) => Promise<Response>;
  export const buildWsUrl: (url: string) => string;
  export const useI18n: () => { t: any; locale: string };
  
  export const Card: React.ComponentType<any>;
  export const CardHeader: React.ComponentType<any>;
  export const CardTitle: React.ComponentType<any>;
  export const CardContent: React.ComponentType<any>;
  export const Badge: React.ComponentType<any>;
  export const Button: React.ComponentType<any>;
  export const Checkbox: React.ComponentType<any>;
  export const Input: React.ComponentType<any>;
  export const Label: React.ComponentType<any>;
  export const Select: React.ComponentType<any>;
  export const SelectOption: React.ComponentType<any>;
  export const Separator: React.ComponentType<any>;
  export const Tabs: React.ComponentType<any>;
  export const TabsList: React.ComponentType<any>;
  export const TabsTrigger: React.ComponentType<any>;
  export const PluginSlot: React.ComponentType<any>;
  
  export const cn: (...inputs: any[]) => string;
  export const timeAgo: (date: any) => string;
  export const isoTimeAgo: (date: any) => string;
}
