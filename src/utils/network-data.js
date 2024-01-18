import { toast } from 'react-toastify';

const BASE_URL = 'https://notes-api.dicoding.dev/v1';
function getAccessToken() {
	return localStorage.getItem('accessToken');
}

function putAccessToken(accessToken) {
	return localStorage.setItem('accessToken', accessToken);
}

async function fetchWithToken(url, options = {}) {
	return fetch(url, {
		...options,
		headers: {
			...options.headers,
			Authorization: `Bearer ${getAccessToken()}`,
		},
	});
}

async function login({ email, password, locale }) {
	const response = await fetch(`${BASE_URL}/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	});

	const responseJson = await response.json();

	if (responseJson.status !== 'success') {
		toast.error(responseJson.message);
		return { error: true, data: null };
	}

	toast.success(locale === 'id' ? 'Selamat Datang!' : 'Welcome!');
	return { error: false, data: responseJson.data };
}

async function register({ name, email, password, locale }) {
	const response = await fetch(`${BASE_URL}/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ name, email, password }),
	});

	const responseJson = await response.json();

	if (responseJson.status !== 'success') {
		toast.error(responseJson.message);
		return { error: true };
	}
	toast.success(locale === 'id' ? 'Registrasi Sukses!' : 'Registration Success!');
	return { error: false };
}

async function getUserLogged() {
	const response = await fetchWithToken(`${BASE_URL}/users/me`);
	const responseJson = await response.json();

	if (responseJson.status !== 'success') {
		return { error: true, data: null };
	}

	return { error: false, data: responseJson.data };
}

async function addNote({ title, body, locale }) {
	const response = await fetchWithToken(`${BASE_URL}/notes`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ title, body }),
	});

	const responseJson = await response.json();

	if (responseJson.status !== 'success') {
		toast.error(locale === 'id' ? 'Note Gagal Ditambahkan!' : 'Failed Added Note!');
		return { error: true, data: null };
	}

	toast.success(locale === 'id' ? 'Note Ditambahkan!' : 'Note Added!');
	return { error: false, data: responseJson.data };
}

async function getActiveNotes({ locale }) {
	const response = await fetchWithToken(`${BASE_URL}/notes`);
	const responseJson = await response.json();

	if (responseJson.status !== 'success') {
		toast.error(locale === 'id' ? 'Gagal Mendapatkan Data!' : 'Failed Get Data!');
		return { error: true, data: null };
	}

	return { error: false, data: responseJson.data };
}

async function getArchivedNotes({ locale }) {
	const response = await fetchWithToken(`${BASE_URL}/notes/archived`);
	const responseJson = await response.json();

	if (responseJson.status !== 'success') {
		toast.error(locale === 'id' ? 'Gagal Mendapatkan Data!' : 'Failed Get Data!');
		return { error: true, data: null };
	}

	return { error: false, data: responseJson.data };
}

async function getNote(id, locale) {
	const response = await fetchWithToken(`${BASE_URL}/notes/${id}`);
	const responseJson = await response.json();

	if (responseJson.status !== 'success') {
		toast.error(locale === 'id' ? 'Gagal Mendapatkan Detail Data!' : 'Failed Get Detail Data!');
		return { error: true, data: null };
	}

	return { error: false, data: responseJson.data };
}

async function archiveNote(id, locale) {
	const response = await fetchWithToken(`${BASE_URL}/notes/${id}/archive`, {
		method: 'POST',
	});

	const responseJson = await response.json();

	if (responseJson.status !== 'success') {
		toast.error(locale === 'id' ? 'Gagal Mengarsipkan Note!' : 'Failed Archive Note!');
		return { error: true, data: null };
	}

	toast.success(locale === 'id' ? 'Note Diarsipkan!' : 'Note Archived!');
	return { error: false, data: responseJson.data };
}

async function unarchiveNote(id, locale) {
	const response = await fetchWithToken(`${BASE_URL}/notes/${id}/unarchive`, {
		method: 'POST',
	});

	const responseJson = await response.json();

	if (responseJson.status !== 'success') {
		toast.error(locale === 'id' ? 'Gagal Mengaktifkan Note!' : 'Failed Actived Note!');
		return { error: true, data: null };
	}

	toast.success(locale === 'id' ? 'Note Diaktifkan!' : 'Note Actived!');
	return { error: false, data: responseJson.data };
}

async function deleteNote(id, locale) {
	const response = await fetchWithToken(`${BASE_URL}/notes/${id}`, {
		method: 'DELETE',
	});

	const responseJson = await response.json();

	if (responseJson.status !== 'success') {
		toast.error(locale === 'id' ? 'Gagal Menghapus Data!' : 'Failed Deleted Note!');
		return { error: true, data: null };
	}

	toast.success(locale === 'id' ? 'Note Dihapus!' : 'Note Deleted!');
	return { error: false, data: responseJson.data };
}

export { getAccessToken, putAccessToken, login, register, getUserLogged, addNote, getActiveNotes, getArchivedNotes, getNote, archiveNote, unarchiveNote, deleteNote };
