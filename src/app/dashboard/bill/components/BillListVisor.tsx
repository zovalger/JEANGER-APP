import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useBillContext } from "../context/Bill.context";
import BillListVisorItem from "./BillListVisorItem";

export default function BillListVisor() {
	const { bills, setBills, setCurrentBill } = useBillContext();

	return (
		<>
			<Box sx={{ display: "flex", overflowX: "auto" }}>
				{bills.map((bill) => (
					<BillListVisorItem key={bill._id} data={bill} />
				))}
			</Box>
		</>
	);
}
