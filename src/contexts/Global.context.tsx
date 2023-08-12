"use client";

import { getDolarRequest } from "@/api/Dolar.api";
import { DolarValue, propsWithChildren } from "@/types";
import { createContext, useState, useContext, useEffect } from "react";

interface ContextProps {
	asidePanelMobileOpen: boolean;
	handleAsidePanelToggle(): void;
	dolar: DolarValue | null;
	refreshDolar(): Promise<void>;

	loadViewClose(): void;
	loadViewOpen(): void;
}

const GlobalContext = createContext<ContextProps>({
	asidePanelMobileOpen: false,
	handleAsidePanelToggle: (): void => {},
	dolar: null,
	refreshDolar: (): Promise<void> => new Promise(() => {}),

	loadViewClose: (): void => {},
	loadViewOpen: (): void => {},
});

// ****************************************************************************
// 			este es un contexto que se utilizara para darles datos al mapa
// ****************************************************************************

export const GlobalContextProvider = ({ children }: propsWithChildren) => {
	const [asidePanelMobileOpen, setAsidePanelMobilOpen] = useState(false);
	const handleAsidePanelToggle = () =>
		setAsidePanelMobilOpen(!asidePanelMobileOpen);

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

	const [open, setOpen] = useState(false);
	const loadViewClose = () => setOpen(false);
	const loadViewOpen = () => setOpen(true);

	return (
		<GlobalContext.Provider
			value={{
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
