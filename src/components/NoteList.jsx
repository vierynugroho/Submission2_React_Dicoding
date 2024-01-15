import NoteItem from '../components/NoteItem';
import { PropTypes } from 'prop-types';

const NoteList = ({ notes }) => {
	return (
		<>
			<section className='notes-list'>
				{notes.map((note) => (
					<NoteItem
						key={note.id}
						{...note}
					/>
				))}
			</section>
		</>
	);
};

NoteList.propTypes = {
	notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NoteList;
