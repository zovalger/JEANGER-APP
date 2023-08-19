"use client";
import Snackbar from "@mui/material/Snackbar";
import { propsWithChildren } from "@/types";
import { createContext, useState, useContext, useEffect } from "react";

interface NotificationObj {
	action: any;
	message: string;
	autoHideDuration?: number | null;
	onClose?(): void;
	onOpen?(): void;
}

interface ContextProps {
	createNotification(notificationObj: NotificationObj): void;
	closeNotification(): void;
}

const SnackbarContext = createContext<ContextProps>({
	createNotification: (notificationObj: NotificationObj): void => {},
	closeNotification: (): void => {},
});

export const SnackbarContextProvider = ({ children }: propsWithChildren) => {
	const [queueNotification, setQueueNotification] = useState<NotificationObj[]>(
		[]
	);

	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (queueNotification.length) {
			setOpen(true);
		}
	}, [queueNotification]);

	const handleClose = (
		event: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === "clickaway") {
			return;
		}
		closeNotification();
	};

	const closeNotification = () => {
		setOpen(false);

		setQueueNotification((prev) => prev.slice(1));
	};

	const createNotification = (notificationObj: NotificationObj) => {
		setQueueNotification((prev) => [...prev, notificationObj]);
	};

	return (
		<SnackbarContext.Provider value={{ createNotification, closeNotification }}>
			{open && (
				<Snackbar
					open={open}
					autoHideDuration={queueNotification[0].autoHideDuration}
					onClose={handleClose}
					message={queueNotification[0].message}
					action={queueNotification[0].action}
				/>
			)}

			{children}
		</SnackbarContext.Provider>
	);
};

export const useSnackbarContext = () => useContext(SnackbarContext);
