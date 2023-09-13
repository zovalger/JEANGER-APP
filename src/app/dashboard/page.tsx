"use client";

import PageTemplate from "../components/PageTemplate";
import { Typography } from "@mui/material";

export default function Dashboard() {
	return (
		<PageTemplate nameNavBar="Dashboard">
			<Typography>
				La calculadora esta en el boton abajo a la derecha
			</Typography>

			<Typography>Abrir o cerrar panel: Ctrl + b</Typography>
		</PageTemplate>
	);
}
