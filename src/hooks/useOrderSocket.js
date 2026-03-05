// src/hooks/useOrderSocket.js
"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { socket, subscribeToOrderUpdates, connectSocket } from "@/services/socket";

export function useOrderSocket(orderId) {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    if (!orderId) return;

    // Make sure connected hai
    connectSocket();

    const unsubscribe = subscribeToOrderUpdates(orderId, (data) => {
      console.log("Real-time order update received:", data);

      toast.info(`Order #${orderId} status → ${data.status}`, {
        position: "top-right",
        autoClose: 5000,
      });

      // Yahan state update karo (setOrder, setActiveStep, etc.)
      // Option 1: event dispatch karo (jaise pehle bataya)
      window.dispatchEvent(
        new CustomEvent("order-status-updated", { detail: data })
      );

      // Option 2: agar hook return kare state to setter pass karo (advanced)
    });

    setIsConnected(socket.connected);

    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));

    return () => {
      unsubscribe();
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [orderId]);

  return { isConnected };
}