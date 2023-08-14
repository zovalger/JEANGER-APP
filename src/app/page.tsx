"use client";

import { Box, Button } from "@mui/material";
import Link from "next/link";

export default function Home() {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
			}}
		>
			<Link href={"/dashboard"}>
				<Button variant="contained">Iniciar</Button>
			</Link>
		</Box>
	);
}
