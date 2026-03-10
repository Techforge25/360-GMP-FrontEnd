import { useEffect } from "react";
import { socket } from "@/services/socket";

const useSocket = (event, callback) => {
    useEffect(() => {
        if (!socket || !event || !callback || typeof callback !== "function") return;

        // Listen for the specified event
        socket.on(event, callback);

        // Cleanup on unmount or when event/callback changes
        return () => socket.off(event, callback);
    }, [event, callback]);
};

export default useSocket;