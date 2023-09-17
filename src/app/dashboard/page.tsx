"use client";

import PageTemplate from "../components/PageTemplate";
import { Typography, Divider } from "@mui/material";
import CNEConsultCI from "./components/CNEConsultCI";
import ConsultMovilnet from "./components/ConsultMovilnet";

export default function Dashboard() {
	return (
		<PageTemplate nameNavBar="Dashboard">
			{/* <Typography>
				La calculadora esta en el boton abajo a la derecha
			</Typography>

			<Typography>Abrir o cerrar panel: Ctrl + b</Typography> */}

			<Divider sx={{ my: 2 }} />

			<CNEConsultCI />

			<Divider sx={{ my: 2 }} />

			<ConsultMovilnet />
		</PageTemplate>
	);
}
