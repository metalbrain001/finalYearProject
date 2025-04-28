// Send notification component for admin

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminPushSender() {
  const [token, setToken] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const sendNotification = async () => {
    const res = await fetch("/api/admin/send-notification", {
      method: "POST",
      body: JSON.stringify({ token, title, message, link: "/" }),
    });
    const result = await res.json();
    console.log(result);
  };

  return (
    <div className="p-4 space-y-4">
      <Input
        placeholder="FCM Token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        className="mb-4 create_movie_input"
      />
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button onClick={sendNotification}>Send Push</Button>
    </div>
  );
}
