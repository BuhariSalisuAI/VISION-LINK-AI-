import * as React from "react";

import { cn } from "@/lib/utils";

type TabsValue = string;

type TabsContextValue = {
  value: TabsValue;
  setValue: (v: TabsValue) => void;
};

const TabsContext = React.createContext<TabsContextValue | null>(null);

export function Tabs({
  defaultValue,
  value: controlledValue,
  onValueChange,
  className,
  children,
}: {
  defaultValue?: TabsValue;
  value?: TabsValue;
  onValueChange?: (v: TabsValue) => void;
  className?: string;
  children: React.ReactNode;
}) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<TabsValue>(defaultValue ?? "");
  const value = controlledValue ?? uncontrolledValue;

  const setValue = React.useCallback(
    (v: TabsValue) => {
      onValueChange?.(v);
      if (controlledValue === undefined) setUncontrolledValue(v);
    },
    [controlledValue, onValueChange]
  );

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-slate-100 p-1 text-slate-600",
        className
      )}
      {...props}
    />
  );
}

export function TabsTrigger({
  value,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { value: TabsValue }) {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error("TabsTrigger must be used within Tabs");

  const active = ctx.value === value;
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:pointer-events-none disabled:opacity-50",
        active ? "bg-white text-slate-950 shadow-sm" : "text-slate-600 hover:text-slate-900",
        className
      )}
      onClick={(e) => {
        props.onClick?.(e);
        ctx.setValue(value);
      }}
      {...props}
    />
  );
}

export function TabsContent({
  value,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { value: TabsValue }) {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error("TabsContent must be used within Tabs");

  if (ctx.value !== value) return null;
  return (
    <div className={cn("mt-2", className)} {...props}>
      {children}
    </div>
  );
}

