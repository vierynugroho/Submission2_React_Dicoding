import { PropTypes } from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { MdUnarchive } from 'react-icons/md';
import { unarchiveNote } from '../utils/network-data';

import LocaleContext from '../contexts/LocaleContext';
import { useContext } from 'react';

const UnArchiveButton = ({ noteId }) => {
	const { locale, toggleLocale } = useContext(LocaleContext);
	const navigate = useNavigate();
	return (
		<>
			<button
				className='action'
				type='button'
				title={locale === 'id' ? 'Aktif' : 'Active'}
				onClick={() => {
					unarchiveNote(noteId, locale);
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
