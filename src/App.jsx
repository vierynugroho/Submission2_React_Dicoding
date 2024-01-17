import { Route, Routes, useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';
import { getAllNotes } from './utils/local-data';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NoteHeader from './components/NoteHeader';

import LocaleContext from './contexts/LocaleContext';

import ActiveNotes from './pages/ActiveNotes';
import ArchiveNotes from './pages/ArchiveNotes';
import DetailNote from './pages/DetailNote';
import AddNote from './pages/AddNote';
import Custom404 from './pages/Custom404';
import ThemeContext from './contexts/ThemeContext';
import RegisterPage from './pages/Auth/RegisterPage';
import LoginPage from './pages/Auth/LoginPage';

import { getUserLogged, putAccessToken } from './utils/network-data';

const App = () => {
	const navigate = useNavigate();

	// state
	const [notes, setNotes] = useState(getAllNotes);
	const [initializing, setInitializing] = useState(true);
	const [authedUser, setAuthedUser] = useState(null);

	// from context
	const [locale, setLocale] = useState('id');
	const [theme, setTheme] = useState('dark');

	// params
	const [searchParams, setSearchParams] = useSearchParams();
	const title = searchParams.get('title') || '';

	// toggle lang
	const toggleLocale = () => {
		setLocale((prevLocale) => {
			return prevLocale === 'id' ? 'en' : 'id';
		});
	};

	const localeContextValue = useMemo(() => {
		return {
			locale,
			toggleLocale,
		};
	}, [locale]);

	// toggle theme
	const toggleTheme = () => {
		setTheme((prevTheme) => {
			return prevTheme === 'dark' ? 'light' : 'dark';
		});
	};

	const ThemeContextValue = useMemo(() => {
		return {
			theme,
			toggleTheme,
		};
	}, [theme]);

	// Delete Note
	const deleteNote = (id) => {
		const updatedNotes = notes.filter((note) => note.id !== id);
		setNotes(updatedNotes);
		toast.success('Note Dihapus!');
	};

	const archiveNote = (id) => {
		const updatedNotes = notes.map((note) => (note.id === id ? { ...note, archived: true } : note));
		setNotes(updatedNotes);
		toast.success('Note Diarsipkan!');
	};

	const unarchiveNote = (id) => {
		const updatedNotes = notes.map((note) => (note.id === id ? { ...note, archived: false } : note));
		setNotes(updatedNotes);
		toast.success('Note Diaktifkan!');
	};

	const changeSearchParams = (keyword) => {
		setSearchParams({ title: keyword });
	};

	// Archive & UnArchive
	const searchNote = !title ? notes : notes.filter((note) => note.title.toLowerCase().match(title));

	// Login Function
	const onLoginSuccess = async ({ accessToken }) => {
		putAccessToken(accessToken);
		const { data } = await getUserLogged();
		setAuthedUser(data);
	};

	// render awal dan render selanjutnya
	useEffect(() => {
		const fetchUser = async () => {
			const { data } = await getUserLogged();
			setAuthedUser(data);
			setInitializing(false);
		};
		fetchUser();
	}, []);

	// logout function
	const onLogout = () => {
		setAuthedUser(null);
		putAccessToken('');
	};

	if (initializing) {
		return null;
	}

	return (
		<>
			<LocaleContext.Provider value={localeContextValue}>
				<ThemeContext.Provider value={ThemeContextValue}>
					<div className='app-container'>
						<ToastContainer autoClose={300} />
						<NoteHeader
							authedUser={authedUser}
							onLogout={onLogout}
						/>
						<Routes>
							{authedUser === null ? (
								<>
									<Route
										path='/*'
										element={<LoginPage loginSuccess={onLoginSuccess} />}
									/>
									<Route
										path='/register'
										element={<RegisterPage />}
									/>
								</>
							) : (
								<>
									<Route
										path='/'
										element={
											<ActiveNotes
												onSearch={changeSearchParams}
												title={title}
											/>
										}
									/>
									<Route
										path='/archives'
										element={
											<ArchiveNotes
												onSearch={changeSearchParams}
												title={title}
											/>
										}
									/>
									<Route
										path='/notes/:id'
										element={
											<DetailNote
												notes={notes}
												onDelete={deleteNote}
												onArchive={archiveNote}
												onUnArchive={unarchiveNote}
											/>
										}
									/>
									<Route
										path='/notes/new'
										element={<AddNote />}
									/>
								</>
							)}

							{/* 404 NotFound Page */}
							<Route
								path='*'
								element={<Custom404 />}
							/>
						</Routes>
						{theme === 'light' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
					</div>
				</ThemeContext.Provider>
			</LocaleContext.Provider>
		</>
	);
};

export default App;
