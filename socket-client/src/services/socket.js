import { io } from "socket.io-client";

export const IO = io("https://xmtj9dn5-3002.use2.devtunnels.ms", {
  autoConnect: false,
});
