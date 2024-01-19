import { showFormattedDate } from '../utils';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

const NoteItem = ({ id, title, body, createdAt }) => {
	return (
		<>
			<article className='note-item'>
				<h3 className='note-item__title'>
					<Link to={`/notes/${id}`}>{title}</Link>
				</h3>
				<p className='note-item__createdAt'>{showFormattedDate(createdAt)}</p>
				<p className='note-item__body'>{body}</p>
			</article>
		</>
	);
};

export const noteItemPropTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	body: PropTypes.string.isRequired,
	createdAt: PropTypes.string.isRequired,
};

NoteItem.propTypes = noteItemPropTypes;

export default NoteItem;
