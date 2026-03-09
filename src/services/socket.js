"use client";
import { io } from "socket.io-client";

// Socket instance
export const socket = io("https://gmp-backend.techforgeinnovations.com", {
  autoConnect:false,
  withCredentials: true,
  transports: ["websocket"],
  reconnection:true,
  reconnectionAttempts:5,
  reconnectionDelay:2000
});

// Connect socket
export const connectSocket = () => {
  try 
  {
    // Cleanup previous connection
    if(socket.connected)
    {
      socket.removeAllListeners();
      socket.disconnect();
    }
    
    socket.connect();
  } 
  catch(error) 
  {
    console.log("Failed to connect socket", error.message);
  }
};

// Disconnect socket
export const disconnectSocket = () => {
  try 
  {
    if(socket.connected)
    {
      socket.removeAllListeners();
      socket.disconnect();
    }
  } 
  catch(error) 
  {
    console.log("Failed to disconnect socket", error.message);
  }
};

// Subscribe to message events
export const subscribeToMessages = (callback) => {
  if (socket) socket.on("message", callback);
};

// Unsubscribe from message events
export const unsubscribeFromMessages = () => {
  if(socket) socket.off("message");
};
