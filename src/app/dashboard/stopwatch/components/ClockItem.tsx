import { useEffect, useState } from "react";
import {
	Box,
	Button,
	useTheme,
	Typography,
	IconButton,
	TextField,
} from "@mui/material";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import EditIcon from "@mui/icons-material/Edit";
import PauseOutlinedIcon from "@mui/icons-material/PauseOutlined";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";

import { Stopwatch } from "@/types";
import { useStopwatchContext } from "@/app/dashboard/stopwatch/context/Stopwatch.context";
import { milisecondsToTime } from "@/utils/milisecondsToTime";
import {
	getTimeStopwatch,
	pauseStopwatch,
	startStopwatch,
} from "../helpers/Stopwatch.helper";
import { getTimeTimer, pauseTimer, startTimer } from "../helpers/Timer.helper";
import ClockTimeContainer from "./ClockTimeContainer";

interface props {
	data: Stopwatch;
	onEdit(): void;
	editing: boolean;
}
export default function ClockItem({ data, onEdit, editing }: props) {
	const { sendUpdateStopwatch, referenceTime } = useStopwatchContext();
	const [clock, setClock] = useState<Stopwatch>(data);

	const theme = useTheme();

	useEffect(() => {
		if (!data) return;

		setClock(data);
	}, [data]);

	const onChangeMinuteInput = (minutes: string) => {
		const newTimeSeted = minutes ? parseInt(minutes) * 60000 : 0;
		setClock({ ...clock, timeSeted: newTimeSeted });
	};

	const onStart = () => {
		const { timeSeted } = clock;

		const newTimer =
			timeSeted !== null ? startTimer(clock) : startStopwatch(clock);

		setClock(newTimer);
		sendUpdateStopwatch(newTimer);
	};

	const onPause = () => {
		const { timeSeted, timeDate } = clock;

		if (!timeDate) return;

		const newTimer =
			timeSeted !== null ? pauseTimer(clock) : pauseStopwatch(clock);

		setClock(newTimer);
		sendUpdateStopwatch(newTimer);
	};

	const switchClock = () => {
		const { timeSeted, timeDate } = clock;

		if (timeDate) return;

		const newSeted = timeSeted !== null ? null : 600000;

		const newClock = {
			...clock,
			timeSeted: newSeted,
			accumulatedTime: 0,
			// timeSeted: 0,
			timeDate: null,
		};

		setClock(newClock);
		sendUpdateStopwatch(newClock);
	};

	const onRestart = () => {
		const newTimer = {
			...clock,
			accumulatedTime: 0,
			// timeSeted: 0,
			timeDate: null,
		};

		setClock(newTimer);

		sendUpdateStopwatch(newTimer);
	};

	const getTime = (): {
		format: { time: string; ms: string };
		time: number;
	} => {
		const { timeSeted } = clock;

		const time =
			timeSeted !== null
				? getTimeTimer(clock, referenceTime)
				: getTimeStopwatch(clock, referenceTime);

		const format = milisecondsToTime(time);

		return { format, time };
	};

	return (
		<Box
			sx={{
				borderRadius: "8px",
				boxShadow: "1px 1px 5px #0003",
				display: "inline-block",
				overflow: "hidden",
				width: "100%",
				bgcolor: clock.timeSeted !== null ? "#ff07" : "#0cf7",
			}}
			className={
				clock.timeSeted !== null &&
				clock.timeDate &&
				clock.timeDate < referenceTime
					? "animate__animated animate__headShake animate__infinite"
					: ""
			}
		>
			<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
				<Typography
					fontWeight={600}
					sx={{ m: ".5rem", ml: ".7rem", mr: "auto" }}
				>
					{clock.name}
				</Typography>

				{editing ? (
					<IconButton onClick={onEdit} color="inherit">
						<EditIcon />
					</IconButton>
				) : (
					<IconButton
						onClick={switchClock}
						color="inherit"
						aria-label="open drawer"
						disabled={!!clock.timeDate}
					>
						{clock.timeSeted !== null ? (
							<AccessAlarmOutlinedIcon />
						) : (
							<TimerOutlinedIcon />
						)}
					</IconButton>
				)}
			</Box>

			<ClockTimeContainer
				data={clock}
				time={getTime().format.time}
				onChangeMinuteInput={onChangeMinuteInput}
				onStart={onStart}
			/>

			<Box sx={{ display: "flex" }}>
				<Button
					disabled={!!clock.timeDate}
					onClick={onRestart}
					sx={{ flexGrow: 1 }}
				>
					<ReplayOutlinedIcon />
				</Button>

				{!!clock.timeDate ? (
					<Button onClick={onPause} sx={{ flexGrow: 1 }}>
						<PauseOutlinedIcon />
					</Button>
				) : (
					<Button onClick={onStart} sx={{ flexGrow: 1 }}>
						<PlayArrowOutlinedIcon />
					</Button>
				)}
			</Box>
		</Box>
	);
}
