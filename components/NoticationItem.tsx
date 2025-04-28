"use client";

import React from "react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface NotificationItemProps {
  id: string;
  title?: string;
  content: string;
  createdAt: string;
  read: boolean;
  link?: string;
  onClick?: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  title,
  content,
  createdAt,
  read,
  link,
  onClick,
}) => {
  return (
    <a
      href={link || "#"}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      className={cn(
        "block rounded-md px-4 py-3 text-sm hover:bg-dark-4 transition-all",
        !read && "bg-dark-2 border-l-4 border-primary"
      )}
    >
      {title && <p className="font-semibold text-light-100 mb-1">{title}</p>}
      <p className="text-light-300">{content}</p>
      <p className="text-xs text-muted-foreground mt-2">
        {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
      </p>
    </a>
  );
};

export default NotificationItem;
