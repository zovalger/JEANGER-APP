"use client";

import { propsWithChildren } from "@/types";
import { createContext, useState, useContext } from "react";

// const { createContext, useState, useEffect } = require("react");

const GlobalContext = createContext({
	asidePanelMobileOpen: false,
	handleAsidePanelToggle: (): void => {},
});

// ****************************************************************************
// 			este es un contexto que se utilizara para darles datos al mapa
// ****************************************************************************

export const GlobalContextProvider = ({ children }: propsWithChildren) => {
	const [asidePanelMobileOpen, setAsidePanelMobilOpen] = useState(false);

	const handleAsidePanelToggle = () => {
		setAsidePanelMobilOpen(!asidePanelMobileOpen);
	};

	return (
		<GlobalContext.Provider
			value={{ asidePanelMobileOpen, handleAsidePanelToggle }}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export const useGlobalContext = () => useContext(GlobalContext);
