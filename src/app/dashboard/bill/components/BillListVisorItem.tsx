import { useState, useEffect } from "react";
import moment from "moment";

import ClearIcon from "@mui/icons-material/Clear";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import SwipeUpAltIcon from "@mui/icons-material/SwipeUpAlt";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";

import { Bill } from "@/types";
import { useProductContext } from "../../products/context/Product.context";
import { useBillContext } from "../context/Bill.context";
import {
	addBillToList,
	deleteOneBillFromList,
	getOneBillAndRemove,
} from "../helpers/BillList.helpers";
import { Box } from "@mui/material";

interface props {
	data: Bill;
}

export default function BillListVisorItem({ data }: props) {
	const {
		currentBill,
		setCurrentBill,
		bills,
		setBills,
		sendBillBroadcast,
		sendDeleteBillBroadcast,
	} = useBillContext();
	const { productsIndexed } = useProductContext();
	const { name, totals, items, date, _id } = data;

	// ****************************************************************************
	// 										          funciones
	// ****************************************************************************

	const handdleSelect = () => {
		const billListWithCurrentBillSaved = addBillToList(bills, currentBill);

		const [newBill, newBillList] = getOneBillAndRemove(
			billListWithCurrentBillSaved,
			_id
		);

		setBills(newBillList);
		setCurrentBill(newBill);
	};

	const handdleDelete = () => {
		const newBillList = deleteOneBillFromList(bills, _id);
		sendDeleteBillBroadcast(_id);
		setBills(newBillList);
	};

	// ****************************************************************************
	// 										          Comodidades
	// ****************************************************************************

	const [textTime, setTextTime] = useState("");

	useEffect(() => {
		const updaterTime = setInterval(() => {
			setTextTime(moment(date).fromNow());
		}, 20000);

		return () => {
			clearInterval(updaterTime);
		};
	}, []);

	// ****************************************************************************
	// 										          render
	// ****************************************************************************

	return (
		<Box
			onClick={handdleSelect}
			sx={{
				width: 200,
				flexShrink: 0,
				mr: 2,
				cursor: "pointer",
			}}
		>
			<Card sx={{ height: "100%", ":hover": { background: "#f5f5f5" } }}>
				<CardHeader
					action={
						<IconButton
							color="error"
							aria-label="settings"
							onClick={(e) => {
								e.stopPropagation();
								handdleDelete();
							}}
						>
							<ClearIcon />
						</IconButton>
					}
					title={name}
					subheader={
						<Box>
							<Typography fontSize={"1rem"}>
								<strong> {totals.BSF.toFixed(2) + " BSF"}</strong>
							</Typography>
							<Typography variant="overline">{textTime || ". . ."}</Typography>
						</Box>
					}
				/>

				<CardContent sx={{ pt: 0 }}>
					{items.map((item) => (
						<Typography
							key={item.productId}
							variant="body2"
							color="text.secondary"
						>
							{item.quantity}{" "}
							{productsIndexed[item.productId]
								? productsIndexed[item.productId].name
								: ". . ."}
						</Typography>
					))}
				</CardContent>

				{/* <CardActions sx={{ display: "flex" }}>
				<Box sx={{ mr: "auto" }}>
					<IconButton onClick={handdleSelect}>
						<SwipeUpAltIcon />
					</IconButton>
				</Box>
			</CardActions> */}
			</Card>
		</Box>
	);
}
