import { io, Socket } from "socket.io-client";

const socket: Socket = io(process.env.NEXT_PUBLIC_SERVER_URL, {
  autoConnect: true,
  transports: ["websocket", "polling"],
});

// Handle connection error
socket.on("connect_error", (err) => {
  console.error("Socket connection error:", err.message);
});

// Handle disconnection
socket.on("disconnect", (reason) => {
  console.log("Socket disconnected:", reason);
});

export { socket };
