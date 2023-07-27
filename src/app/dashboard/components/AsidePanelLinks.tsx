import Link from "next/link";
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
import moduleOptionsList from "@/config/moduleOptionsList";

const AsidePanelLinks = (
	<div>
		<Toolbar />
		<Divider />
		<List>
			{moduleOptionsList.map((m) => (
				<Link href={m.link} key={uuid()} style={{textDecoration:"none",color:"black"}}>
					<ListItem disablePadding>
						<ListItemButton>
							<ListItemIcon>{<m.icon />}</ListItemIcon>
							<ListItemText primary={m.name} />
						</ListItemButton>
					</ListItem>
				</Link>
			))}

			{/* {["Productos", "Starred", "Send email", "Drafts"].map((text, index) => (

  ))} */}
		</List>
		<Divider />
	</div>
);

export default AsidePanelLinks;
