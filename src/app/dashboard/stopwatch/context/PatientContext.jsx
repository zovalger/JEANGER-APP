const { createContext, useState, useEffect } = require("react");

const PatientContext = createContext();

// ****************************************************************************
// 			este es un contexto que se utilizara para darles datos al mapa
// ****************************************************************************

export const PatientProvider = ({ children }) => {
	// listas de datos
	const [patientList, setPatientList] = useState([]);
	const [patientList_By_Query, setPatientList_By_Query] = useState([]);

	// objeto para hacer la consulta
	const [queryObj, setQueryObj] = useState(null);

	// para saber si hemos hecho una consulta y decidir cual lista mostrar
	const [inQuery, setInQuery] = useState(false);

	// estado del componente para rellenar la consulta
	const [settings, setSettings] = useState({
		querySimple: true,

		ageRange: false,
		heightRange: false,
		weightRange:false,
		historyNumberRange: false,
		byHistoryNumber: false,
	});

	return (
		<PatientContext.Provider
			value={{
				patientList,
				setPatientList,
				patientList_By_Query,
				setPatientList_By_Query,
				queryObj,
				setQueryObj,
				inQuery,
				setInQuery,
				settings,
				setSettings,
			}}
		>
			{children}
		</PatientContext.Provider>
	);
};

export default PatientContext;
