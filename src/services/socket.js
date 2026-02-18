import { io } from "socket.io-client";

// Socket configuration
export const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
  autoConnect: false, // Don't connect automatically
  transports: ["websocket"], // Use WebSocket transport only
  withCredentials: true, // Send cookies with requests
});

// connect socket
export const connectSocket = (authToken = null) => {
  // Destroy previous connection
  if (socket.connected) {
    socket.removeAllListeners();
    socket.disconnect();
  }

  // Check auth token
  if (authToken) {
    // Connect with auth token
    socket.auth = { authToken };
    socket.connect();
  }
};

// disconnect socket
export const disconnectSocket = () => {
  if (socket.connected) {
    socket.removeAllListeners();
    socket.disconnect();
  }
};

// logout k time pr call
// disconnectSocket()

// Subscribe to message events
export const subscribeToMessages = (callback) => {
  if (socket) {
    socket.on("message", callback);
  }
};

// Unsubscribe from message events
export const unsubscribeFromMessages = () => {
  if (socket) {
    socket.off("message");
  }
};
