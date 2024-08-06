import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { MobileNavigationProvider } from "./context/MobileNavigationContext.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ThemeProvider>
			<MobileNavigationProvider>
				<App />
			</MobileNavigationProvider>
		</ThemeProvider>
	</React.StrictMode>
);
