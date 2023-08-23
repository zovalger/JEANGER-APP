import { CalculatorState, CurrencyType } from "@/types";
import Box from "@mui/material/Box";

export default function CalculatorSwitchHistory({
	data,
}: {
	data: CalculatorState[];
}) {
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
				// display: "flex",
				// flexDirection: "column-reverse",
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
						bgcolor: item.currencyType == CurrencyType.USD ? "#0301" : "",
						borderRadius: "8px",
						":hover": {
							bgcolor: "#0a34"
						},
					}}
				>
					<Box>{item.currencyType}</Box>
					<Box>
						<Box component={"span"}>{`${item.a.toFixed(0)} ${
							item.mathOperation
						} ${item.b?.toFixed(2)}`}</Box>
						<Box component={"span"}>
							={`${item.result?.toFixed(2) || "xx"}`}
						</Box>
					</Box>
				</Box>
			))}
		</Box>
	);
}
