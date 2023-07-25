"use client";

import { getDolarRequest } from "@/api/Dolar.api";
import { DolarValue, propsWithChildren } from "@/types";
import { createContext, useState, useContext ,useEffect} from "react";


interface ContextProps {
	asidePanelMobileOpen: boolean;
	handleAsidePanelToggle(): void;
	dolar: DolarValue | null;
}

const GlobalContext = createContext<ContextProps>({
	asidePanelMobileOpen: false,
	handleAsidePanelToggle: (): void => {},
	dolar: null,
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
		getDolarRequest()
			.then((v) => setDolarValue(v))
			.catch((error) => console.log(error));
	}, []);

	return (
		<GlobalContext.Provider
			value={{ asidePanelMobileOpen, handleAsidePanelToggle, dolar }}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export const useGlobalContext = () => useContext(GlobalContext);
