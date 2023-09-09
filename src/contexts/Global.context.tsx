"use client";

import { io, Socket } from "socket.io-client";
import { getDolarRequest } from "@/api/Dolar.api";
import { DolarValue, ProductSettings, propsWithChildren } from "@/types";
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
import { getProductSettingRequest } from "@/api/ProductSettings.api";

interface ContextProps {
	selectedPage: number;
	setSelectedPage: Dispatch<SetStateAction<number>>;

	asidePanelMobileOpen: boolean;
	handleAsidePanelToggle(): void;

	asideMultiToolsOpen: boolean;
	handleAsideMultiToolsToggle(): void;

	dolar: DolarValue | null;
	refreshDolar(): Promise<void>;

	productSettings: ProductSettings | null;
	updateProductSettings(data: ProductSettings): void;
}

const GlobalContext = createContext<ContextProps>({
	selectedPage: 0,
	setSelectedPage: () => {},

	asidePanelMobileOpen: false,
	handleAsidePanelToggle: (): void => {},

	asideMultiToolsOpen: false,
	handleAsideMultiToolsToggle: (): void => {},

	dolar: null,
	refreshDolar: (): Promise<void> => new Promise(() => {}),

	productSettings: null,
	updateProductSettings: (data: ProductSettings): void => {},
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
	// 										          ProductSettings
	// ****************************************************************************

	const [productSettings, setProductSettings] =
		useState<ProductSettings | null>(null);

	const updateProductSettings = (data: ProductSettings) =>
		setProductSettings(data);

	useEffect(() => {
		getProductSettingRequest().then((data) => updateProductSettings(data));
	}, []);

	// ****************************************************************************
	// 										          Panel lateral
	// ****************************************************************************

	const [selectedPage, setSelectedPage] = useState(0);
	const [asidePanelMobileOpen, setAsidePanelMobilOpen] = useState(false);
	const handleAsidePanelToggle = () => setAsidePanelMobilOpen((prev) => !prev);

	const [asideMultiToolsOpen, setAsideMultiToolsOpen] = useState(false);
	const handleAsideMultiToolsToggle = () =>
		setAsideMultiToolsOpen((prev) => !prev);

	return (
		<GlobalContext.Provider
			value={{
				selectedPage,
				setSelectedPage,

				asidePanelMobileOpen,
				handleAsidePanelToggle,

				asideMultiToolsOpen,
				handleAsideMultiToolsToggle,

				dolar,
				refreshDolar,

				productSettings,
				updateProductSettings,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export const useGlobalContext = () => useContext(GlobalContext);
