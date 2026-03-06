// "use client";
// import { io } from "socket.io-client";

// // Socket instance
// export const socket = io("https://gmp-backend.techforgeinnovations.com", {
//   autoConnect:false,
//   withCredentials: true,
//   transports: ["websocket"],
//   reconnection:true,
//   reconnectionAttempts:5,
//   reconnectionDelay:2000
// });

// // Connect socket
// export const connectSocket = () => {
//   if(socket.connected) return;
//   socket.connect();
// };

// // Disconnect socket
// export const disconnectSocket = () => {
//   if(socket.connected)
//   {
//     socket.removeAllListeners();
//     socket.disconnect();
//   }
// };

// // Subscribe to message events
// export const subscribeToMessages = (callback) => {
//   if (socket) socket.on("message", callback);
// };

// // Unsubscribe from message events
// export const unsubscribeFromMessages = () => {
//   if(socket) socket.off("message");
// };


// src/services/socket.js
"use client";

import { io } from "socket.io-client";

const SOCKET_URL = "https://gmp-backend.techforgeinnovations.com"; // ya process.env.NEXT_PUBLIC_BACKEND_URL

// Singleton instance
export const socket = io(SOCKET_URL, {
  withCredentials: true,
  transports: ["websocket"],          // polling avoid karo agar possible
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 2000,
  reconnectionDelayMax: 10000,
  timeout: 20000,
  autoConnect: false,                 // ← important: manually connect karenge
});

// Global connect function (safe call)
export const connectSocket = () => {
  if (!socket.connected && !socket.connecting) {
    socket.connect();
  }
};

// Safe disconnect (logout / unmount pe)
export const disconnectSocket = () => {
  if (socket.connected) {
    socket.removeAllListeners(); // sab listeners hata do
    socket.disconnect();
  }
};

// Order-specific event helpers (reusable)
export const subscribeToOrderUpdates = (orderId, callback) => {
  const handler = (data) => {
    if (data?.orderId === orderId) {
      callback(data);
    }
  };

  socket.on("update-order-status", handler);

  // Return cleanup function
  return () => {
    socket.off("update-order-status", handler);
  };
};

// General message subscribe (jo pehle tha)
export const subscribeToMessages = (callback) => {
  socket.on("message", callback);
  return () => socket.off("message", callback);
};

export const unsubscribeFromMessages = () => {
  socket.off("message");
};