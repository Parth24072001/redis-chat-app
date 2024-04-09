import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ToastContainer } from "react-toastify";
import ChatProvider from "./shared/provider/ChatProvider/ChatProvider";

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
                <ChatProvider>
                    <App />
                </ChatProvider>
            </QueryClientProvider>
        </Router>
        <ToastContainer />
    </React.StrictMode>
);
