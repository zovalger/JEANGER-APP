"use client";
import Snackbar from "@mui/material/Snackbar";
import { propsWithChildren } from "@/types";
import { createContext, useState, useContext } from "react";

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
	const [notification, setNotification] = useState<NotificationObj | null>();
	const [open, setOpen] = useState(false);

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
	};

	const createNotification = (notificationObj: NotificationObj) => {
		setOpen(true);
		setNotification(notificationObj);
	};

	return (
		<SnackbarContext.Provider value={{ createNotification, closeNotification }}>
			{notification && (
				<Snackbar
					open={open}
					autoHideDuration={notification.autoHideDuration}
					onClose={handleClose}
					message={notification.message}
					action={notification.action}
				/>
			)}

			{children}
		</SnackbarContext.Provider>
	);
};

export const useSnackbarContext = () => useContext(SnackbarContext);
