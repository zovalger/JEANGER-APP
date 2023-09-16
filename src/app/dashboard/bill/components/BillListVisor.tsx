import { Box, IconButton } from "@mui/material";
import { v4 as uuid } from "uuid";
import RefreshIcon from "@mui/icons-material/Refresh";

import { useBillContext } from "../context/Bill.context";
import BillListVisorItem from "./BillListVisorItem";
import { getAllBillsRequest } from "@/api/Bill.api";

export default function BillListVisor() {
	const { bills, setBills } = useBillContext();

	const refreshBills = () => {
		getAllBillsRequest()
			.then(setBills)
			.catch((err) => console.log(err));
	};

	return (
		<>
			<Box sx={{ display: "flex", overflowX: "auto" }}>
				{/* //todo: boton actualizar */}

				<Box sx={{ display: "flex", alignItems: "center", px: 3 }}>
					<IconButton size="large" color="info" onClick={refreshBills}>
						<RefreshIcon />
					</IconButton>
				</Box>

				{bills.map((bill) => (
					<BillListVisorItem key={uuid()} data={bill} />
				))}
			</Box>
		</>
	);
}
