import "./globals.css";
import type { Metadata } from "next";
//import { Inter } from "next/font/google";
import CssBaseline from "@mui/material/CssBaseline";
import "animate.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { GlobalContextProvider } from "@/contexts/Global.context";
import { ProductContextProvider } from "@/app/dashboard/products/context/Product.context";
import { StopwatchContextProvider } from "@/app/dashboard/stopwatch/context/Stopwatch.context";
import { SnackbarContextProvider } from "@/contexts/Snackbar.context";
import { BillContextProvider } from "./dashboard/bill/context/Bill.context";

//const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Jeanger App",
	description: "Inversiones jeanger C.A.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</head>

			<SnackbarContextProvider>
				<GlobalContextProvider>
					<ProductContextProvider>
						<BillContextProvider>
							<StopwatchContextProvider>
								<CssBaseline />
								<body>{children}</body>
							</StopwatchContextProvider>
						</BillContextProvider>
					</ProductContextProvider>
				</GlobalContextProvider>
			</SnackbarContextProvider>
		</html>
	);
}
