import { io } from "socket.io-client";

// Socket instance
export const socket = io(process.env.BACKEND_URL, {
  withCredentials: true,
  transports: ["websocket"],
  reconnection:true,
  reconnectionAttempts:5,
  reconnectionDelay:2000
});

// Connect socket
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

// logout k time pr call
// disconnectSocket()

// Subscribe to message events
export const subscribeToMessages = (callback) => {
  if (socket) socket.on("message", callback);
};

// Unsubscribe from message events
export const unsubscribeFromMessages = () => {
  if(socket) socket.off("message");
};
