import Link from "next/link";
import { usePathname } from "next/navigation";
import { v4 as uuid } from "uuid";
import {
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Toolbar,
} from "@mui/material";

import { useGlobalContext } from "@/contexts/Global.context";
import moduleOptionsList from "@/config/moduleOptionsList";

export default function AsidePanelLinks() {
	const pathname = usePathname();

	const { handleAsidePanelToggle } = useGlobalContext();

	return (
		<div>
			<Toolbar />
			<Divider />
			<List>
				{moduleOptionsList.map((m) => (
					<Link
						href={m.link}
						key={uuid()}
						style={{ textDecoration: "none", color: "black" }}
						onClick={() => {
							handleAsidePanelToggle();
						}}
					>
						<ListItem disablePadding>
							<ListItemButton selected={pathname === m.link}>
								<ListItemIcon>{<m.icon />}</ListItemIcon>
								<ListItemText primary={m.name} />
							</ListItemButton>
						</ListItem>
					</Link>
				))}
			</List>
			<Divider />
		</div>
	);
}
