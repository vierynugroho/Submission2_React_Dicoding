import NoteItem, { noteItemPropTypes } from '../components/NoteItem';
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
	ﾠnotes: PropTypes.arrayOf(PropTypes.shape(noteItemPropTypes)).isRequired,
};
export default NoteList;
