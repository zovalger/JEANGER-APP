import { Box, Button, Divider, Drawer } from "@mui/material";
import { asideMultiToolsWidth } from "@/config";
import AsidePanelLinks from "./AsidePanelLinks";
import { useGlobalContext } from "@/contexts/Global.context";
import ForeignExchangeView from "./ForeignExchangeView";
import CalculatorSwitch from "./CalculatorSwitch";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import { useEffect } from "react";
import CNEConsultCI from "./CNEConsultCI";
import ConsultMovilnet from "./ConsultMovilnet";
import BillListVisor from "../bill/components/BillListVisor";

const AsideMultiTools = () => {
	const { asideMultiToolsOpen, handleAsideMultiToolsToggle } =
		useGlobalContext();

	const toolsDisplay = () => (
		<>
			<ForeignExchangeView />
			<CalculatorSwitch />

			<BillListVisor />
			<CNEConsultCI />

			<ConsultMovilnet />
		</>
	);

	const shorcut = (event: KeyboardEvent) => {
		if (event.key === "b" && event.ctrlKey) handleAsideMultiToolsToggle();
	};

	useEffect(() => {
		document.addEventListener("keydown", shorcut);
		return () => {
			document.removeEventListener("keydown", shorcut);
		};
	}, []);

	return (
		<>
			<Box
				component="nav"
				sx={{
					position: "absolute",
					width: { sm: asideMultiToolsWidth },
					flexShrink: { sm: 0 },
				}}
				aria-label="mailbox folders"
			>
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Drawer
					// container={container}
					variant="temporary"
					open={asideMultiToolsOpen}
					onClose={handleAsideMultiToolsToggle}
					anchor="right"
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: asideMultiToolsWidth,
						},
					}}
				>
					{toolsDisplay()}
				</Drawer>

				<Drawer
					variant="persistent"
					sx={{
						display: { xs: "none", sm: "block" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: asideMultiToolsWidth,
						},
					}}
					open={asideMultiToolsOpen}
					anchor="right"
				>
					{toolsDisplay()}
				</Drawer>
			</Box>

			<Box
				sx={{
					position: "absolute",
					right: asideMultiToolsOpen ? asideMultiToolsWidth + 16 : "1rem",
					bottom: "1rem",
					display: { xs: asideMultiToolsOpen ? "none" : "block", sm: "block" },
				}}
			>
				<Button
					variant="contained"
					onClick={() => handleAsideMultiToolsToggle()}
				>
					<HomeRepairServiceIcon />
				</Button>
			</Box>
		</>
	);
};

export default AsideMultiTools;
