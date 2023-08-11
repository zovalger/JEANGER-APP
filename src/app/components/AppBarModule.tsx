import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { asidePanelDashboardWidth } from "@/config";
import { useGlobalContext } from "@/contexts/Global.context";

interface AppBarModule {
	name: string;
	right?: any;
}

export default function AppBarModule({ name, right }: AppBarModule) {
	const { handleAsidePanelToggle } = useGlobalContext();

	return (
		<AppBar
			position="fixed"
			sx={{
				width: { sm: `calc(100% - ${asidePanelDashboardWidth}px)` },
				ml: { sm: `${asidePanelDashboardWidth}px` },
			}}
		>
			<Toolbar>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					edge="start"
					onClick={handleAsidePanelToggle}
					sx={{ mr: 2, display: { sm: "none" } }}
				>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" noWrap component="div">
					{name}
				</Typography>

				<Box sx={{ ml: "auto" }}> {right}</Box>
			</Toolbar>
		</AppBar>
	);
}
