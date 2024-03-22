import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import "./App.css";

import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import ChatProvider from "./Context/ChatProvider";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 0,
            onError: (e) => {
                console.log(e);
            },
        },
    },
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Router>
            <QueryClientProvider client={queryClient}>
                <ChakraProvider>
                    <ChatProvider>
                        <App />
                    </ChatProvider>
                </ChakraProvider>
            </QueryClientProvider>
        </Router>
    </React.StrictMode>
);
