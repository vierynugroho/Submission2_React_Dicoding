import { PropTypes } from 'prop-types';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { deleteNote } from '../utils/network-data';
import { useContext } from 'react';

import LocaleContext from '../contexts/LocaleContext';

const DeleteButton = ({ noteId }) => {
	const { locale, toggleLocale } = useContext(LocaleContext);
	const navigate = useNavigate();
	return (
		<>
			<button
				type='button'
				className='action'
				title={locale === 'id' ? 'Hapus' : 'Delete'}
				onClick={() => {
					deleteNote(noteId, locale);
					navigate('/');
				}}
			>
				<FaTrash />
			</button>
		</>
	);
};

DeleteButton.proptypes = {
	noteId: PropTypes.string.isRequired,
};

export default DeleteButton;
