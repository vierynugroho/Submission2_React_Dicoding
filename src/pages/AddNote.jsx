import NoteForm from '../components/NoteForm';
import { PropTypes } from 'prop-types';

const AddNote = ({ onAdd }) => {
	return (
		<>
			{/* Main */}
			<main>
				<section className='add-new-page'>
					<NoteForm onAdd={onAdd} />
				</section>
			</main>
			{/* Main */}
		</>
	);
};

AddNote.propTypes = {
	onAdd: PropTypes.func.isRequired,
};

export default AddNote;
