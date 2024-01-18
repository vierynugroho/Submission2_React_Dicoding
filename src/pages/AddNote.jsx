import { useNavigate } from 'react-router-dom';
import NoteForm from '../components/NoteForm';
import { addNote } from '../utils/network-data';

const AddNote = () => {
	const navigate = useNavigate();
	async function onAddNoteHandler(note) {
		await addNote(note);
		navigate('/');
	}

	return (
		<>
			{/* Main */}
			<main>
				<section className='add-new-page'>
					<NoteForm onAdd={onAddNoteHandler} />
				</section>
			</main>
			{/* Main */}
		</>
	);
};

export default AddNote;
