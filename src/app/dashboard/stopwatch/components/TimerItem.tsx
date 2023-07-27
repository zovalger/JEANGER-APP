import { useStopwatchContext } from "@/contexts/Stopwatch.context";
import { Stopwatch } from "@/types";
import { milisecondsToTime } from "@/utils/milisecondsToTime";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";

interface props {
	data: Stopwatch;
}
// _id, name, accumulatedTime, timeSeted, timeDate

export default function TimerItem({ data }: props) {
	const [timer, setTimer] = useState<Stopwatch>(data);

	const { sendUpdateStopwatch, sendDeleteStopwatch } = useStopwatchContext();

	const [referenceTime, setReferenceTime] = useState(Date.now());

	useEffect(() => {
		setInterval(() => {
			setReferenceTime(Date.now());
		}, 800);
	}, []);

	useEffect(() => {
		if (!data) return;

		setTimer(data);
	}, [data]);

	const onStart = () => {
		const { accumulatedTime, timeDate } = timer;

		const newTimeDate = timeDate
			? timeDate
			: accumulatedTime
			? new Date(Date.now() - accumulatedTime)
			: new Date(Date.now());

		const newTimer = { ...timer, timeDate: newTimeDate, accumulatedTime: 0 };
		setTimer(newTimer);
		sendUpdateStopwatch(newTimer);
	};

	const onPause = () => {
		const { timeDate, accumulatedTime } = timer;

		if (!timeDate) return;

		const newAccumulatedTime = timeDate
			? Date.now() - new Date(timeDate).getTime()
			: accumulatedTime;

		const newTimer = {
			...timer,
			accumulatedTime: newAccumulatedTime,
			timeDate: null,
		};
		setTimer(newTimer);
		sendUpdateStopwatch(newTimer);
	};

	const onRestart = () => {
		const newTimer = {
			...timer,
			accumulatedTime: 0,
			timeSeted: 0,
			timeDate: null,
		};
		setTimer(newTimer);
		sendUpdateStopwatch(newTimer);
	};

	const getTime = (): {
		format: { time: string; ms: string };
		time: number;
	} => {
		const { timeDate, accumulatedTime } = timer;

		const time = timeDate
			? referenceTime - new Date(timeDate).getTime()
			: accumulatedTime;

		const format = milisecondsToTime(time);

		return { format, time };
	};

	return (
		<Box
			sx={{
				borderRadius: "8px",
				boxShadow: "2px 2px 5px #0003",
				display: "inline-block",
			}}
		>
			{/* <Box>
				<Button>cambiar</Button>
			</Box> */}
			<Box>
				<Box sx={{m:".5rem"}}>{timer.name}</Box>
				<Box sx={{ display: "flex",alignItems:"flex-end" ,justifyContent:"center",}}>
					<Box sx={{ fontSize: "2rem" }}>{getTime().format.time}</Box>
					<Box sx={{ fontSize: "1rem" }}>{getTime().format.ms}</Box>
				</Box>
				{/* <Box>{timer.accumulatedTime}</Box> */}
				{/* <Box>{timer.timeSeted}</Box> */}
			</Box>
			<Box sx={{ display: "flex" }}>
				<Button
					disabled={!!timer.timeDate}
					onClick={onRestart}
					sx={{ flexGrow: 1 }}
				>
					Restart
				</Button>

				{!!timer.timeDate ? (
					<Button onClick={onPause} sx={{ flexGrow: 1 }}>
						Pause
					</Button>
				) : (
					<Button onClick={onStart} sx={{ flexGrow: 1 }}>
						Start
					</Button>
				)}
			</Box>
		</Box>
	);
}
