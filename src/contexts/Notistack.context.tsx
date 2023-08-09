"use client";

import { getDolarRequest } from "@/api/Dolar.api";
import { DolarValue, propsWithChildren } from "@/types";
import { createContext, useState, useContext, useEffect } from "react";
import { SnackbarProvider, VariantType, useSnackbar } from "notistack";

interface ContextProps {
	Notification(variant: VariantType, message: string): void;
}

const NotistackContext = createContext<ContextProps>({
	Notification: (variant: VariantType, message: string): void => {},
});

// ****************************************************************************
// 			este es un contexto que se utilizara para darles datos al mapa
// ****************************************************************************

export const NotistackContextProvider = ({ children }: propsWithChildren) => {
	const { enqueueSnackbar } = useSnackbar();

	const Notification = (variant: VariantType, message: string) => {
		enqueueSnackbar(message, { variant });
	};

	return (
		<SnackbarProvider maxSnack={3}>
			<NotistackContext.Provider value={{ Notification }}>
				{children}
			</NotistackContext.Provider>
		</SnackbarProvider>
	);
};

export const useNotistackContext = () => useContext(NotistackContext);
