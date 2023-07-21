import axios from "axios";

const url = "/api/patient";

// ***************** consultas	*****************

export const getAllPatientsRequest = async () => await axios.get(`${url}`);

export const getPatientsBySearchRequest = async (query) =>
	await axios.get(`${url}/search`, { params: query });

export const getPatientsBySearchSimpleRequest = async (query) =>
	await axios.get(`${url}/search/simple`, { params: query });

export const getPatientSearchLimitsRequest = async () =>
	await axios.get(`${url}/search-limits`);

export const getPatientRequest = async (id) => await axios.get(`${url}/${id}`);

// ***************** modificaciones	*****************

export const createPatientRequest = async (data) => await axios.post(url, data);

export const deletePatientRequest = async (id) =>
	await axios.delete(`${url}/${id}`);

export const updatePatientRequest = async (id, data) =>
	await axios.put(`${url}/${id}`, data);

// ***************** utilidades	*****************

export const consultPatientHistoryNumberRequest = async (historyNumber) =>
	await axios.get(`${url}/historyNumber`, { params: { historyNumber } });

export const getAllHistoryNumbersRegistedRequest = async () =>
	await axios.get(`${url}/historyNumber/all`);

// ***************** antecedentes	*****************

// familiares
export const getAntFamiliarList = async () =>
	await axios.get(`${url}/antFamiliar`);

export const getAntFamiliarOfPatient = async (id) =>
	await axios.get(`${url}/${id}/antFamiliar`);

export const setAntFamiliarOfPatient = async (id, data) =>
	await axios.post(`${url}/${id}/antFamiliar`, data);

// prenatales
export const getAntPrenatalesList = async () =>
	await axios.get(`${url}/antPrenatal`);

export const getAntPrenatalesOfPatient = async (id) =>
	await axios.get(`${url}/${id}/antPrenatal`);

export const setAntPrenatalesOfPatient = async (id, data) =>
	await axios.post(`${url}/${id}/antPrenatal`, data);

// paranatales
export const getAntParanatalList = async () =>
	await axios.get(`${url}/antParanatal`);

export const getAntParanatalOfPatient = async (id) =>
	await axios.get(`${url}/${id}/antParanatal`);

export const setAntParanatalOfPatient = async (id, data) =>
	await axios.post(`${url}/${id}/antParanatal`, data);

// postnatales
export const getAntPostnatalList = async () =>
	await axios.get(`${url}/antPostnatal`);

export const getAntPostnatalOfPatient = async (id) =>
	await axios.get(`${url}/${id}/antPostnatal`);

export const setAntPostnatalOfPatient = async (id, data) =>
	await axios.post(`${url}/${id}/antPostnatal`, data);
