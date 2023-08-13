import { CalculatorState } from "@/types";
import Box from "@mui/material/Box";

export default function CalculatorSwitchHistory({
	data,
}: {
	data: CalculatorState[];
}) {
	return;
	if (!data.length) return;

	return (
		<Box
			sx={{
				maxHeight: "7rem",
				minHeight: "7rem",
				overflow: "hidden",
				overflowY: "scroll",
				boxShadow: "inset 0px 0px 5px #0002",
				border: "1px solid #0002",
				borderRadius: "8px",
			}}
		>
			{data.map((item) => (
				<Box
					key={item._id}
					sx={{
						display: "flex",
						justifyContent: "space-between",
						mb: 1,
						p: 0.2,
						px: 1,
						borderRadius: "8px",
						":hover": {
							bgcolor: "#0001",
						},
					}}
				>
					<Box>{item.currencyType}</Box>
					<Box>
						<Box
							component={"span"}
						>{`${item.a} ${item.mathOperation} ${item.b}`}</Box>
						<Box component={"span"}>={`${item.result || "xx"}`}</Box>
					</Box>
				</Box>
			))}
		</Box>
	);
}
