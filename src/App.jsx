import { Route, Routes, useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { getAllNotes } from './utils/local-data';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NoteHeader from './components/NoteHeader';

import ActiveNotes from './pages/ActiveNotes';
import ArchiveNotes from './pages/ArchiveNotes';
import DetailNote from './pages/DetailNote';
import AddNote from './pages/AddNote';
import Custom404 from './pages/Custom404';

const App = () => {
	const navigate = useNavigate();
	const [notes, setNotes] = useState(getAllNotes);
	const [searchParams, setSearchParams] = useSearchParams();
	const title = searchParams.get('title');

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
			<div className='app-container'>
				<ToastContainer autoClose={300} />
				<NoteHeader />

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
		</>
	);
};

export default App;
