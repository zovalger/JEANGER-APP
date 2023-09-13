"use client";

import { Box, IconButton, Button, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import ReplayIcon from "@mui/icons-material/Replay";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { useGlobalContext } from "@/contexts/Global.context";

export default function ForeignExchangeView() {
	const { foreignExchange, refreshForeignExchange } = useGlobalContext();

	const [copy, setCopy] = useState(false);
	const [copy2, setCopy2] = useState(false);

	return (
		<Box
			boxShadow={2}
			sx={{
				display: "flex",
				justifyContent: "space-between",
				p: 2,
				borderRadius: "8px",
				mb: 2,
			}}
		>
			<Box>
				<Box>
					<Typography sx={{ fontSize: "1rem" }} component="span">
						<strong>Dolar: </strong>
						{foreignExchange && foreignExchange.dolar.toFixed(2)}
					</Typography>

					{foreignExchange && (
						<CopyToClipboard
							text={foreignExchange.dolar.toString().replace(".", ",")}
							onCopy={() => {
								setCopy(true);

								setTimeout(() => setCopy(false), 1000);
							}}
						>
							<IconButton>
								{copy ? <LibraryAddCheckIcon /> : <ContentCopyIcon />}
							</IconButton>
						</CopyToClipboard>
					)}
				</Box>

				<Box>
					<Typography sx={{ fontSize: "1rem" }} component="span">
						<strong>Euro: </strong>
						{foreignExchange && foreignExchange.euro.toFixed(2)}
					</Typography>

					{foreignExchange && (
						<CopyToClipboard
							text={foreignExchange.euro.toString().replace(".", ",")}
							onCopy={() => {
								setCopy2(true);

								setTimeout(() => setCopy2(false), 1000);
							}}
						>
							<IconButton>
								{copy2 ? <LibraryAddCheckIcon /> : <ContentCopyIcon />}
							</IconButton>
						</CopyToClipboard>
					)}
				</Box>
			</Box>

			<Button onClick={refreshForeignExchange}>
				<ReplayIcon />
			</Button>
		</Box>
	);
}
