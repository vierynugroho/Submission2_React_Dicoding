import { PropTypes } from 'prop-types';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { deleteNote } from '../utils/network-data';

const DeleteButton = ({ noteId }) => {
	const navigate = useNavigate();
	return (
		<>
			<button
				type='button'
				className='action'
				title='Hapus'
				onClick={() => {
					deleteNote(noteId);
					navigate('/');
				}}
			>
				<FaTrash />
			</button>
		</>
	);
};

DeleteButton.proptypes = {
	onDelete: PropTypes.func.isRequired,
	noteId: PropTypes.string.isRequired,
};

export default DeleteButton;
