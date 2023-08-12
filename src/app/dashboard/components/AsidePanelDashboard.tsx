import { Box, Drawer } from "@mui/material";
import { asidePanelDashboardWidth } from "@/config";
import AsidePanelLinks from "./AsidePanelLinks";
import { useGlobalContext } from "@/contexts/Global.context";

const AsidePanelDashboard = () => {
	const { asidePanelMobileOpen, handleAsidePanelToggle } = useGlobalContext();

	return (
		<Box
			component="nav"
			sx={{ width: { sm: asidePanelDashboardWidth }, flexShrink: { sm: 0 } }}
			aria-label="mailbox folders"
		>
			{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
			<Drawer
				// container={container}
				variant="temporary"
				open={asidePanelMobileOpen}
				onClose={handleAsidePanelToggle}
				ModalProps={{
					keepMounted: true, // Better open performance on mobile.
				}}
				sx={{
					display: { xs: "block", sm: "none" },
					"& .MuiDrawer-paper": {
						boxSizing: "border-box",
						width: asidePanelDashboardWidth,
					},
				}}
			>
				<AsidePanelLinks />{" "}
			</Drawer>
			<Drawer
				variant="permanent"
				sx={{
					display: { xs: "none", sm: "block" },
					"& .MuiDrawer-paper": {
						boxSizing: "border-box",
						width: asidePanelDashboardWidth,
					},
				}}
				open
			>
				<AsidePanelLinks />
			</Drawer>
		</Box>
	);
};

export default AsidePanelDashboard;
