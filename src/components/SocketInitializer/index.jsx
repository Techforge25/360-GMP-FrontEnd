"use client";
import { useEffect } from "react";
import { socket } from "@/services/socket";

export default function SocketInitializer() 
{
    useEffect(() => {
        socket.on("connect", () => console.log("Socket connected:", socket.id));
        socket.on("disconnect", () => console.log("Socket disconnected"));

        return () => {
            socket.off("connect");
            socket.off("disconnect");
        };
    }, []);
    return null;
}