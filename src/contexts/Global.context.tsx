"use client";

import { io, Socket } from "socket.io-client";

import { getDolarRequest } from "@/api/Dolar.api";
import { DolarValue, propsWithChildren } from "@/types";
import {
	createContext,
	useState,
	useContext,
	useEffect,
	Dispatch,
	SetStateAction,
} from "react";
import { PROXY } from "@/config";
import { DolarEvent } from "@/config/SocketEventsSystem";
import { useSnackbarContext } from "./Snackbar.context";
import { number } from "yup";

interface ContextProps {
	selectedPage: number;
	setSelectedPage: Dispatch<SetStateAction<number>>;
	asidePanelMobileOpen: boolean;
	handleAsidePanelToggle(): void;
	dolar: DolarValue | null;
	refreshDolar(): Promise<void>;

	loadViewClose(): void;
	loadViewOpen(): void;
}

const GlobalContext = createContext<ContextProps>({
	selectedPage: 0,
	setSelectedPage: () => {},
	asidePanelMobileOpen: false,
	handleAsidePanelToggle: (): void => {},
	dolar: null,
	refreshDolar: (): Promise<void> => new Promise(() => {}),

	loadViewClose: (): void => {},
	loadViewOpen: (): void => {},
});

export const GlobalContextProvider = ({ children }: propsWithChildren) => {
	const { createNotification } = useSnackbarContext();
	// ****************************************************************************
	// 										          Dolar
	// ****************************************************************************

	const [dolar, setDolarValue] = useState<DolarValue | null>(null);

	useEffect(() => {
		refreshDolar();
	}, []);

	const refreshDolar = async () => {
		try {
			const d = await getDolarRequest();

			setDolarValue(d);
		} catch (error) {
			console.log(error);
			// setDolarValue();
		}
	};
	// ****************************************************************************
	// 										          socket Funciones
	// ****************************************************************************
	const [socket, setSocket] = useState<Socket | null>(null);

	const updateDolar = (dolar: DolarValue) => {
		setDolarValue(dolar);

		createNotification({
			message: `Dolar actualizado: ${dolar.value}`,
			autoHideDuration: 5000,
			action: <></>,
		});
	};

	const setListeners = async (socket: Socket) => {
		socket.on(DolarEvent.update, updateDolar);
	};

	useEffect(() => {
		if (socket) return;

		try {
			const soc = io(`${PROXY}`);

			setSocket(soc);
			setListeners(soc);
		} catch (error) {
			console.log(error);
		}
	}, [socket]);

	// ****************************************************************************
	// 										          Panel lateral
	// ****************************************************************************

	const [selectedPage, setSelectedPage] = useState(0);
	const [asidePanelMobileOpen, setAsidePanelMobilOpen] = useState(false);
	const handleAsidePanelToggle = () =>
		setAsidePanelMobilOpen(!asidePanelMobileOpen);

	const [open, setOpen] = useState(false);
	const loadViewClose = () => setOpen(false);
	const loadViewOpen = () => setOpen(true);

	return (
		<GlobalContext.Provider
			value={{
				selectedPage,
				setSelectedPage,

				asidePanelMobileOpen,
				handleAsidePanelToggle,
				
				dolar,
				refreshDolar,

				loadViewClose,
				loadViewOpen,
			}}
		>
			{children}
			{/* <Backdrop
				sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={open}
				onClick={loadViewClose}
			>
				<CircularProgress color="inherit" />
			</Backdrop> */}
		</GlobalContext.Provider>
	);
};

export const useGlobalContext = () => useContext(GlobalContext);
