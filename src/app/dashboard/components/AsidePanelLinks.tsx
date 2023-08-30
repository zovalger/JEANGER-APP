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
import { useGlobalContext } from "@/contexts/Global.context";
import { useEffect } from "react";

export default function AsidePanelLinks() {
	const { handleAsidePanelToggle, selectedPage, setSelectedPage } =
		useGlobalContext();

		useEffect(() => {
			// todo: tomar url de pagina y colocar id
		
	
		}, [])
		

	return (
		<div>
			<Toolbar />
			<Divider />
			<List>
				{moduleOptionsList.map((m, index) => (
					<Link
						href={m.link}
						key={uuid()}
						style={{ textDecoration: "none", color: "black" }}
						onClick={() => {
							handleAsidePanelToggle();
							setSelectedPage(index);
						}}
					>
						<ListItem disablePadding>
							<ListItemButton selected={selectedPage === index}>
								<ListItemIcon>
									{/* <Badge color="secondary" badgeContent={2}> */}
									{<m.icon />}
									{/* </Badge> */}
								</ListItemIcon>
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
}
