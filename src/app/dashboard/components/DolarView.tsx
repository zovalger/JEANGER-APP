"use client";

import { useGlobalContext } from "@/contexts/Global.context";
import { Box, IconButton, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import ReplayIcon from "@mui/icons-material/Replay";
import { useState } from "react";

export default function DolarView() {
	const { dolar, refreshDolar } = useGlobalContext();

	const [copy, setCopy] = useState(false);

	const copyDolarValueToClipboard = () => {
		if (!dolar) return;

		const textToCopy = dolar.value.toString().replace(".", ",");
		navigator.clipboard.writeText(textToCopy);
		setCopy(true);

		setTimeout(() => setCopy(false), 1000);
	};

	return (
		<Box
			boxShadow={2}
			sx={{
				p: 1,
				borderRadius: "8px",
				mb: 2,
			}}
		>
			<Typography sx={{ fontSize: "1rem" }} component="span">
				<strong>Dolar: </strong>
				{dolar && dolar.value.toFixed(2)}
			</Typography>
			<IconButton onClick={copyDolarValueToClipboard}>
				{copy ? <LibraryAddCheckIcon /> : <ContentCopyIcon />}
			</IconButton>
			<IconButton onClick={refreshDolar}>
				<ReplayIcon />
			</IconButton>
		</Box>
	);
}
