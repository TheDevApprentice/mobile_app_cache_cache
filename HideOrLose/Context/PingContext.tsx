// import React, { createContext, useState, useEffect, FC, useContext } from 'react';
// import { io, Socket } from "socket.io-client";

// interface ContextProps {
//   startPing: () => void;
//   stopPing: () => void;
//   socket?: Socket;
//   setSocket: React.Dispatch<React.SetStateAction<Socket | undefined>>;
// }

// const PingContext = createContext<ContextProps>({
//   startPing: () => {},
//   stopPing: () => {},
//   setSocket: () => {}
// });

// export const PingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [pingInterval, setPingInterval] = useState<NodeJS.Timeout | null>(null);
//   const [socket, setSocket] = useState<Socket>();

//   useEffect(() => {
//     const newSocket = io("http://10.4.1.181:3000", {
//       autoConnect: false
//     });
//     setSocket(newSocket);

//     return () => {
//       if (pingInterval) {
//         clearInterval(pingInterval);
//       }
//       newSocket.disconnect();
//     };
//   }, [pingInterval]);

//   const startPing = () => {
//     if (socket) {
//       const id = setInterval(() => {
//         socket.emit('ping');
//       }, 4000);
//       setPingInterval(id);
//     }
//   };

//   const stopPing = () => {
//     if (pingInterval) {
//       clearInterval(pingInterval);
//       setPingInterval(null);
//     }
//   };

//   return (
//     <PingContext.Provider value={{ startPing, stopPing, socket, setSocket }}>
//       {children}
//     </PingContext.Provider>
//   );
// };

// export const useGlobalContext = () => {
//   const context = useContext(PingContext);
//   if (!context) {
//     throw new Error('useGlobalContext must be used within a GlobalContextProvider');
//   }
//   return context;
// };