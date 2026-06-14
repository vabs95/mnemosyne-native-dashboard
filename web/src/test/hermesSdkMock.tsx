import React, { useState } from 'react';
import { vi } from 'vitest';

export const fetchJSON = vi.fn();
export const authedFetch = vi.fn();
export const buildWsUrl = (url: string) => url;
export const useI18n = () => ({ t: (key: string) => key, locale: 'en' });
export const api = {};

type AnyProps = React.PropsWithChildren<Record<string, any>>;
type TabsProps = Omit<AnyProps, 'children'> & {
  children: React.ReactNode | ((activeValue: string, setActiveValue: (value: string) => void) => React.ReactNode);
  defaultValue: string;
};

const passthrough = (tag: keyof React.JSX.IntrinsicElements) => {
  const Component = ({ children, ...props }: AnyProps) => React.createElement(tag, props, children);
  return Component;
};

export const Card = passthrough('section');
export const CardHeader = passthrough('header');
export const CardTitle = passthrough('h2');
export const CardContent = passthrough('div');
export const Badge = passthrough('span');
export const Label = passthrough('label');
export const Separator = passthrough('hr');
export const PluginSlot = passthrough('div');

export const Button = ({ children, primary: _primary, ghost: _ghost, ...props }: AnyProps) => (
  <button type="button" {...props}>{children}</button>
);

export const Input = (props: AnyProps) => <input {...props} />;

export const Checkbox = ({ checked, onCheckedChange, ...props }: AnyProps) => (
  <input
    type="checkbox"
    checked={!!checked}
    onChange={(event) => onCheckedChange?.(event.currentTarget.checked)}
    {...props}
  />
);

export const Select = ({ children, value, onValueChange, disabled, ...props }: AnyProps) => (
  <select
    value={value}
    disabled={disabled}
    onChange={(event) => onValueChange?.(event.currentTarget.value)}
    {...props}
  >
    {children}
  </select>
);

export const SelectOption = ({ children, value, ...props }: AnyProps) => (
  <option value={value} {...props}>{children}</option>
);

export const Tabs = ({ children, defaultValue }: TabsProps) => {
  const [activeValue, setActiveValue] = useState(defaultValue);
  return <div>{typeof children === 'function' ? children(activeValue, setActiveValue) : children}</div>;
};

export const TabsList = passthrough('div');
export const TabsTrigger = ({ children, active: _active, value: _value, ...props }: AnyProps) => (
  <button type="button" {...props}>{children}</button>
);

export const cn = (...inputs: any[]) => inputs.filter(Boolean).join(' ');
export const timeAgo = () => 'some time ago';
export const isoTimeAgo = () => 'some time ago';
