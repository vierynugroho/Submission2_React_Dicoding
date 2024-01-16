import { Route, Routes, useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useMemo } from 'react';
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

const App = () => {
	const navigate = useNavigate();

	// state
	const [notes, setNotes] = useState(getAllNotes);

	// context
	const [authedUser, setAuthedUser] = useState(null);
	const [locale, setLocale] = useState('id');
	const [theme, setTheme] = useState('dark');

	// params
	const [searchParams, setSearchParams] = useSearchParams();
	const title = searchParams.get('title');

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

	// Add Note
	function addNote({ title, body }) {
		const newNotes = [
			...notes,
			{
				id: `notes-${+new Date()}`,
				title: title || '(untitled)',
				body: body,
				createdAt: new Date().toISOString(),
				archived: false,
			},
		];
		setNotes(newNotes);
		navigate('/');
	}

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
	const getActiveNotesData = searchNote.filter((note) => !note.archived);
	const getArchiveNotesData = searchNote.filter((note) => note.archived);

	return (
		<>
			<LocaleContext.Provider value={localeContextValue}>
				<ThemeContext.Provider value={ThemeContextValue}>
					{authedUser !== null ? (
						<div className='app-container'>
							<ToastContainer autoClose={300} />
							<NoteHeader authedUser={authedUser} />
							<Routes>
								<Route
									path='/'
									element={
										<ActiveNotes
											notes={getActiveNotesData}
											onSearch={changeSearchParams}
											title={title}
										/>
									}
								/>
								<Route
									path='/archives'
									element={
										<ArchiveNotes
											notes={getArchiveNotesData}
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
									element={<AddNote onAdd={addNote} />}
								/>
								{/* 404 NotFound Page */}
								<Route
									path='*'
									element={<Custom404 />}
								/>
							</Routes>
						</div>
					) : (
						<div className='app-container'>
							<ToastContainer autoClose={300} />
							<NoteHeader authedUser={authedUser} />
							<Routes>
								<Route
									path='/*'
									element={<p>Halaman Login</p>}
								/>
								<Route
									path='/register'
									element={<RegisterPage />}
								/>
							</Routes>
							{theme === 'light' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
						</div>
					)}
				</ThemeContext.Provider>
			</LocaleContext.Provider>
		</>
	);
};

export default App;
