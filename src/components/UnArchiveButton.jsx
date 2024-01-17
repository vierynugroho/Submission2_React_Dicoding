import { PropTypes } from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { MdUnarchive } from 'react-icons/md';
import { unarchiveNote } from '../utils/network-data';

const UnArchiveButton = ({ noteId }) => {
	const navigate = useNavigate();
	return (
		<>
			<button
				className='action'
				type='button'
				title='Arsipkan'
				onClick={() => {
					unarchiveNote(noteId);
					navigate('/');
				}}
			>
				<MdUnarchive />
			</button>
		</>
	);
};

UnArchiveButton.proptypes = {
	onUnArchive: PropTypes.func.isRequired,
	noteId: PropTypes.string.isRequired,
};

export default UnArchiveButton;
