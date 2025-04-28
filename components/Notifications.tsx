"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Icons from "@/components/UseIcons";
import { useMotion } from "@/hooks/use-motion";
import { useNotifications } from "@/hooks/use-notifications";
import { AnimatePresence } from "framer-motion";
import NotificationItem from "@/components/NoticationItem";

const Notifications = () => {
  const { motion, animatePresences, animations, isOpen, setIsOpen } =
    useMotion();
  const { Bell } = Icons();
  const [loading, setLoading] = useState(false);
  const { notifications, markAsRead } = useNotifications();

  return (
    <motion.div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      whileHover={{ scale: 1.05 }}
      whileFocus={{ scale: 1.05 }}
    >
      <Popover open={isOpen} onOpenChange={setIsOpen} modal={false}>
        <PopoverTrigger className="relative flex size-10 items-center justify-center rounded-lg">
          <Bell
            className="text-light-100"
            size={24}
            aria-hidden="true"
            aria-label="Notifications"
            color="currentColor"
          />
          {notifications.some((n) => !n.read) && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
              {notifications.filter((n) => !n.read).length}
            </span>
          )}
        </PopoverTrigger>
        <PopoverContent>
          {loading ? (
            <p className="text-xs text-muted">Loading...</p>
          ) : notifications.length === 0 ? (
            <p className="text-xs text-muted">No notifications yet</p>
          ) : (
            <ul className="space-y-2 max-h-64 overflow-y-auto">
              {notifications.map((notif) => (
                <NotificationItem
                  key={notif.id}
                  {...notif}
                  onClick={() => markAsRead([notif.id])}
                />
              ))}
            </ul>
          )}
        </PopoverContent>
      </Popover>
    </motion.div>
  );
};

export default Notifications;
