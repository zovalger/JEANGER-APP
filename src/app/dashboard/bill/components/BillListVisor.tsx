import { Box, IconButton } from "@mui/material";
import { v4 as uuid } from "uuid";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import RefreshIcon from "@mui/icons-material/Refresh";

import { useBillContext } from "../context/Bill.context";
import { getAllBillsRequest } from "@/api/Bill.api";
import BillListVisorItem from "./BillListVisorItem";

export default function BillListVisor() {
	const { bills, setBills } = useBillContext();

	const refreshBills = () => {
		getAllBillsRequest()
			.then(setBills)
			.catch((err) => console.log(err));
	};

	return (
		<>
			{/* <Divider sx={{ my: 3 }} /> */}

			<Box
				sx={{
					boxShadow: 2,
					p: 2,
					borderRadius: "8px",
					mb: 2,
				}}
			>
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<Typography
						sx={{
							// mb: 1,
							fontWeight: 600,
						}}
					>
						Facturas guardadas
					</Typography>

					<IconButton
						sx={{ ml: 2 }}
						size="small"
						color="info"
						onClick={refreshBills}
					>
						<RefreshIcon />
					</IconButton>
				</Box>

				<Box sx={{ display: "flex", overflowX: "auto" }}>
					{bills.map((bill) => (
						<BillListVisorItem key={uuid()} data={bill} />
					))}
				</Box>
			</Box>
		</>
	);
}
