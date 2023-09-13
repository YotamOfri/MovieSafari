import React from "react";
import ReactDOM from "react-dom/client";
import MainRoutes from "./routes";
import "./assets/index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MainRoutes></MainRoutes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
