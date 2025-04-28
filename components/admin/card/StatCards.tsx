// components/admin/card/DashboardStatCard.tsx
"use client";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DashboardStatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  description?: string;
  className?: string;
}

export default function DashboardStatCard({
  icon,
  label,
  value,
  description,
  className,
}: DashboardStatCardProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 p-4 bg-dashboard-surface border border-dashboard-border rounded-xl shadow-sm min-w-max",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <div className="text-3xl text-white/80">{icon}</div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-xl font-bold text-white">{value}</p>
        </div>
      </div>
      {description && (
        <div className="text-right text-xs text-muted-foreground max-w-[120px]">
          {description}
        </div>
      )}
    </div>
  );
}
