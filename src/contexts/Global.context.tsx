"use client";

import { io, Socket } from "socket.io-client";
import { getForeignExchangeRequest } from "@/api/ForeignExchange.api";
import { ForeignExchange, ProductSettings, propsWithChildren } from "@/types";
import {
	createContext,
	useState,
	useContext,
	useEffect,
	Dispatch,
	SetStateAction,
} from "react";
import { PROXY } from "@/config";
import { ForeignExchangeEvent } from "@/config/SocketEventsSystem";
import { useSnackbarContext } from "./Snackbar.context";
import { getProductSettingRequest } from "@/api/ProductSettings.api";

interface ContextProps {
	asidePanelMobileOpen: boolean;
	handleAsidePanelToggle(): void;

	asideMultiToolsOpen: boolean;
	handleAsideMultiToolsToggle(): void;

	foreignExchange: ForeignExchange | null;
	refreshForeignExchange(): Promise<void>;

	productSettings: ProductSettings | null;
	updateProductSettings(data: ProductSettings): void;
}

const GlobalContext = createContext<ContextProps>({
	asidePanelMobileOpen: false,
	handleAsidePanelToggle: (): void => {},

	asideMultiToolsOpen: false,
	handleAsideMultiToolsToggle: (): void => {},

	foreignExchange: null,
	refreshForeignExchange: (): Promise<void> => new Promise(() => {}),

	productSettings: null,
	updateProductSettings: (data: ProductSettings): void => {},
});

export const GlobalContextProvider = ({ children }: propsWithChildren) => {
	const { createNotification } = useSnackbarContext();

	// ****************************************************************************
	// 										          divisas
	// ****************************************************************************

	const [foreignExchange, setForeignExchange] =
		useState<ForeignExchange | null>(null);

	useEffect(() => {
		refreshForeignExchange();
	}, []);

	const refreshForeignExchange = async () => {
		try {
			const d = await getForeignExchangeRequest();

			setForeignExchange(d);
		} catch (error) {
			console.log(error);
			// setDolarValue();
		}
	};
	// ****************************************************************************
	// 										          socket Funciones
	// ****************************************************************************
	const [socket, setSocket] = useState<Socket | null>(null);

	const updateForeignExchange = (foreignExchange: ForeignExchange) => {
		setForeignExchange(foreignExchange);

		createNotification({
			message: `Dolar actualizado: ${foreignExchange.dolar}`,
			autoHideDuration: 5000,
			action: <></>,
		});
	};

	const setListeners = async (socket: Socket) => {
		socket.on(ForeignExchangeEvent.update, updateForeignExchange);
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

	const [asidePanelMobileOpen, setAsidePanelMobilOpen] = useState(false);
	const handleAsidePanelToggle = () => setAsidePanelMobilOpen((prev) => !prev);

	const [asideMultiToolsOpen, setAsideMultiToolsOpen] = useState(true);
	const handleAsideMultiToolsToggle = () =>
		setAsideMultiToolsOpen((prev) => !prev);

	return (
		<GlobalContext.Provider
			value={{
				asidePanelMobileOpen,
				handleAsidePanelToggle,

				asideMultiToolsOpen,
				handleAsideMultiToolsToggle,

				foreignExchange,
				refreshForeignExchange,

				productSettings,
				updateProductSettings,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export const useGlobalContext = () => useContext(GlobalContext);
