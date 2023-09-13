"use client";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import { asideMultiToolsWidth, asidePanelDashboardWidth } from "@/config";
import AppBarModule from "@/app/components/AppBarModule";
import { useGlobalContext } from "@/contexts/Global.context";

import { JsxElement } from "typescript";

interface props {
	nameNavBar: string;
	rightIcons?: React.ReactNode;
	children: React.ReactNode;
}

export default function PageTemplate({
	nameNavBar,
	rightIcons,
	children,
}: props) {
	const { asideMultiToolsOpen } = useGlobalContext();

	return (
		<>
			<AppBarModule name={nameNavBar} right={rightIcons} />

			<Box
				component="main"
				sx={{
					flexGrow: 1,
					p: 3,
					width: {
						sm: `calc(100% - ${asidePanelDashboardWidth}px)`,
					},
					mr: { sm: asideMultiToolsOpen ? `${asideMultiToolsWidth}px` : 0 },
					height: "100vh",
					overflow: "hidden",
					overflowY: "scroll",
				}}
			>
				<Toolbar />
				{children}
			</Box>
		</>
	);
}
