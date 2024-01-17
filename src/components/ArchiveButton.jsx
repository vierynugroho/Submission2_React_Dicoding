import { PropTypes } from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { MdArchive } from 'react-icons/md';
import { archiveNote } from '../utils/network-data';

const ArchiveButton = ({ noteId }) => {
	const navigate = useNavigate();
	return (
		<>
			<button
				className='action'
				type='button'
				title='Arsipkan'
				onClick={() => {
					archiveNote(noteId);
					navigate('/archives');
				}}
			>
				<MdArchive />
			</button>
		</>
	);
};

ArchiveButton.proptypes = {
	noteId: PropTypes.string.isRequired,
};

export default ArchiveButton;
